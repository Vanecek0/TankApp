import React, { useCallback, useEffect, useState } from 'react';
import { View, VirtualizedList, RefreshControl, ScrollView } from 'react-native';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import Badge from '@/components/Badge';
import { ThemeColors as Colors } from '@/constants/Colors';
import { useModal } from '@/hooks/useModal';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { DTO } from '@/DTO/mapper';
import CustomButton from '@/components/common/Buttons';
import { useForm, useWatch } from 'react-hook-form';
import FormTextInput from '@/components/forms/FormTextInput';
import FormDateTimeInput from '@/components/forms/FormDateTimeInput';
import FormTextAreaInput from '@/components/forms/FormTextArea';
import FormCheckboxItem from '@/components/forms/FormCheckboxItem';
import DeleteConfirmationModal from '../superModals/deleteConfirmationModal';
import { stationFuelRepository } from '@/repositories/stationFuelRepository';
import { stationRepository } from '@/repositories/stationRepository';
import { Station } from '@/models/Station';
import { Fuel } from '@/models/Fuel';
import { fuelRepository } from '@/repositories/fuelRepository';


let onRefresh: null | (() => void | Promise<void>) = null;

export const setOnRefresh = (fn: () => void | Promise<void>) => {
    onRefresh = fn;
};

export const callOnRefresh = async () => {
    if (onRefresh) {
        await onRefresh();
    }
};

type StationWithFuels = Station & {
    fuels: (Fuel & { last_price_per_unit: number | null })[];
};

const StationItem = React.memo(({ item, isDark, onPress, showDeleteConfirm }: { item: StationWithFuels; isDark: boolean, onPress: (station: StationWithFuels) => void, showDeleteConfirm: (station: StationWithFuels) => void }) => (
    <View
        style={{
            ...spacing.borderRadius(6),
            ...spacing.p(12),
            ...spacing.px(17),
            backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
        }}
    >
        <View className="flex-row justify-between items-start" style={{ ...spacing.gap(32) }}>
            <View className="flex-1" style={{ ...spacing.gap(4) }} onTouchEnd={() => onPress(item)}>
                <View className="flex-row items-center" style={{ ...spacing.gap(8) }}>
                    <ScaledText size="lg" className="flex-initial font-bold text-ellipsis overflow-visible" numberOfLines={1} ellipsizeMode="tail" isThemed>
                        {item.name}
                    </ScaledText>
                </View>
                {item.address && (
                    <View style={{ ...spacing.gap(4) }} className="flex-row items-center">
                        <Icon name="map_pin" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
                        <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                            {item.address}
                        </ScaledText>
                    </View>
                )}
            </View>
            <View className='flex-row items-center' style={{ ...spacing.gap(4) }}>
                <View className="flex-row" style={{ ...spacing.gap(12), ...spacing.py(5), ...spacing.px(5) }} onTouchEnd={() => onPress(item)}>
                    <Icon name="edit" color={Colors.icon.disabled} size={getScaleFactor() * 20} />
                </View>
                <View className="flex-row" style={{ ...spacing.gap(12), ...spacing.py(5), ...spacing.px(5), ...spacing.me(-5) }} onTouchEnd={() => showDeleteConfirm(item)}>
                    <Icon name="bin" color={Colors.icon.disabled} size={getScaleFactor() * 20} />
                </View>
            </View>
        </View>
        <View style={{ ...spacing.pt(8), ...spacing.gap(8) }} onTouchEnd={() => onPress(item)}>
            {item.phone && (
                <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
                    <Icon name="phone" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
                    <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                        {item.phone}
                    </ScaledText>
                </View>
            )}

            {item.opening_hrs && item.closing_hrs && (
                <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
                    <Icon name="clock" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
                    <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                        {new Date(item.opening_hrs).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {new Date(item.closing_hrs).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                    </ScaledText>
                </View>
            )}

            {item.fuels.length > 0 && (
                <View style={{ ...spacing.gap(8) }}>
                    <ScaledText size="base" className="font-bold" isThemed>
                        Typy paliv
                    </ScaledText>
                    <View className="flex-row flex-wrap" style={{ ...spacing.gap(8) }}>
                        {item.fuels.map((fuel) => (
                            <Badge
                                key={fuel.id}
                                size="sm"
                                value={fuel.trademark}
                                className="uppercase"
                                isThemed
                                style={{
                                    ...spacing.borderRadius(12),
                                    ...spacing.borderWidth(1),
                                    borderColor: Colors.base.transparent,
                                }}
                                badgeColor={Colors.base.primary}
                            />
                        ))}
                    </View>
                </View>
            )}

            {item.note?.trim() && (
                <View>
                    <ScaledText size="base" className="font-bold" isThemed>Poznámka</ScaledText>
                    <ScaledText size="sm" isThemed>{item.note}</ScaledText>
                </View>
            )}
        </View>
    </View>
));

export default function StationsModal() {
    const { hideModal, showModal, showSuperModal } = useModal();
    const { isDark } = useTheme();
    const [stations, setStations] = useState<StationWithFuels[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadStations = async () => {
        setIsLoading(true);
        try {
            const result = await stationFuelRepository.getAllStationsWithFuels();
            if (result) {
                setStations(result);
            }
        }
        catch (error) {
            console.error('Chyba při načítání stations:', error);
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        loadStations();
    }, []);

    const onRefresh = useCallback(async () => {
        await loadStations();
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: StationWithFuels }) =>
            <>
                <StationItem
                    item={item}
                    isDark={isDark}
                    showDeleteConfirm={() => showSuperModal(DeleteConfirmationModal, {
                        message: "Opravdu chcete smazat tuto stanici?",
                        deleteIcon: <Icon name="bin" color={Colors.base.primary} size={getScaleFactor() * 45} />,
                        onConfirm: async () => {
                            await stationRepository.delete({ id: item.id! });
                            onRefresh();
                        },
                    })}
                    onPress={() => showModal(AddStationRecordModal, { station: item, previousModal: StationsModal })}
                />
            </>,

        [isDark]
    );

    return (
        <View className="max-h-full h-full" style={{ ...spacing.borderRadius(12) }}>
            <View
                className="border-b-[1px] sticky flex-row justify-between items-center"
                style={{
                    ...spacing.borderTopRadius(12),
                    borderColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    ...spacing.p(24),
                }}
            >
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View
                        style={{
                            ...spacing.borderRadius(8),
                            ...spacing.width(48),
                            ...spacing.height(48),
                            backgroundColor: Colors.base.primary,
                        }}
                        className="flex items-center justify-center"
                    >
                        <Icon name="map_pin" color={Colors.base.white} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size="xl" isThemed className="text-xl font-semibold">
                            Čerpací a dobíjecí stanice
                        </ScaledText>
                        <ScaledText size="sm" isThemed>
                            Spravujte své přidané stanice
                        </ScaledText>
                    </View>
                </View>
                <View
                    onTouchEnd={() => hideModal()}
                    style={{ ...spacing.p(36), ...spacing.me(-12) }}
                    className="justify-center items-center absolute right-0"
                >
                    <Icon name="cross" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 20} />
                </View>
            </View>

            <View className="flex-1">
                <VirtualizedList
                    initialNumToRender={1}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    maxToRenderPerBatch={1}
                    windowSize={2}
                    renderItem={renderItem}
                    getItemCount={() => stations.length}
                    getItem={(_, index) => stations[index]}
                    ListHeaderComponentStyle={{ zIndex: 50 }}
                    contentContainerStyle={{ ...spacing.gap(24), ...spacing.p(24) }}
                    horizontal={false}
                    ListEmptyComponent={
                        <ScaledText
                            style={{ ...spacing.p(28) }}
                            className="text-center font-bold"
                            color={Colors.text.muted}
                            size="base"
                        >
                            Žádné záznamy nenalezeny
                        </ScaledText>
                    }
                />
            </View>
        </View>
    );
}

export function AddStationRecordModal({ station, previousModal }: { station: StationWithFuels, previousModal?: React.FC<any> }) {
    const { hideModal, showModal } = useModal();
    const { isDark } = useTheme();
    const { control, handleSubmit, formState } = useForm();
    const [fuels, setFuels] = useState<Fuel[]>([]);
    const selectedFuels = useWatch({ control, name: 'fuels' }) ?? [];

    const loadAllFuels = async () => {
        const allFuels = await fuelRepository.getAll();
        setFuels(allFuels);
    };

    useEffect(() => {
        loadAllFuels();
    }, []);

    const onFormSubmit = async (data: any) => {
        try {
            const stationDTO = DTO<Station, typeof data>(data);
            if (station) {
                const result = await stationRepository.update(stationDTO, { id: station.id! });

                const existingFuels = await stationFuelRepository.getAll();
                const existingFuelIds = existingFuels.map(sf => sf.id_fuel);

                for (const fuelId of existingFuelIds) {
                    await stationFuelRepository.deleteByFuelAndStation(station.id!, fuelId);
                }

                for (const fuelId of selectedFuels) {

                    await stationFuelRepository.create({
                        id_station: station.id!,
                        id_fuel: fuelId,
                        last_price_per_unit: 0,
                    });
                }
                return result;
            } else {

                const stationDTO = DTO<Station, typeof data>(data);
                const station = await stationRepository.insert(stationDTO);

                for (const fuelId of selectedFuels) {

                    await stationFuelRepository.create({
                        id_station: station.lastInsertRowId,
                        id_fuel: fuelId,
                        last_price_per_unit: 0,
                    });
                }

                return true;
            }

        } catch (error) {
            console.error('Chyba při ukládání záznamu:', error);
            throw error;
        }
    };

    return (
        <View className="max-h-full h-full" style={{ ...spacing.borderRadius(12) }}>
            <View
                className="border-b-[1px] sticky flex-row justify-between items-center"
                style={{
                    ...spacing.borderTopRadius(12),
                    borderColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    ...spacing.p(24),
                }}
            >
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View
                        style={{
                            ...spacing.borderRadius(8),
                            ...spacing.width(48),
                            ...spacing.height(48),
                            backgroundColor: Colors.base.primary,
                        }}
                        className="flex items-center justify-center"
                    >
                        <Icon name="edit" color={Colors.base.white} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size="xl" isThemed className="text-xl font-semibold">
                            {station ? 'Úprava stanice' : 'Přidat stanici'}
                        </ScaledText>
                        <ScaledText size="sm" isThemed>
                            {station ? 'Níže upravte vybranou stanici' : 'Vyplňte údaje o stanici'}
                        </ScaledText>
                    </View>
                </View>
                <View
                    onTouchEnd={() => hideModal()}
                    style={{ ...spacing.p(36), ...spacing.me(-12) }}
                    className="justify-center items-center absolute right-0"
                >
                    <Icon name="cross" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.p(24) }} className="">
                <View style={{ ...spacing.gap(12), ...spacing.pb(52) }}>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Název stanice</ScaledText>
                        </View>

                        <FormTextInput name="name" defaultValue={station?.name ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                            <Icon name='map_pin' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Adresa</ScaledText>
                        </View>

                        <FormTextInput name="address" defaultValue={station?.address ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                            <Icon name='phone' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Telefonní číslo</ScaledText>
                        </View>

                        <FormTextInput name="phone" defaultValue={station?.phone ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                            <Icon name='clock' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Otevírací doba</ScaledText>
                        </View>
                        <View style={{ ...spacing.gap(8) }} className='flex-row justify-between'>
                            <View style={{ ...spacing.gap(8) }} className='flex-row flex-1 items-center'>
                                <ScaledText size='base' isThemed>od</ScaledText>
                                <FormDateTimeInput name="opening" defaultValue={station?.opening_hrs ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormDateTimeInput>
                            </View>
                            <View style={{ ...spacing.gap(8) }} className='flex-row flex-1 items-center'>
                                <ScaledText size='base' isThemed>do</ScaledText><FormDateTimeInput name="closing" defaultValue={station?.closing_hrs ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormDateTimeInput>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                            <Icon name='tank' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Typy paliv</ScaledText>
                        </View>


                        <View className="flex-row flex-wrap" style={{}}>
                            {
                                fuels.map((fuel, index) => (
                                    <FormCheckboxItem
                                        name="fuels"
                                        key={index}
                                        control={control}
                                        value={fuel.id!}
                                        defaultValue={station?.fuels.map(f => f.id!) ?? []}
                                        render={() => (
                                            <Badge
                                                value={fuel.trademark}
                                                className="uppercase"
                                                style={{
                                                    ...spacing.borderRadius(12),
                                                    ...spacing.borderWidth(1),
                                                    ...spacing.m(4),
                                                    ...spacing.ms(-4),
                                                    ...spacing.me(12),
                                                    borderColor: selectedFuels.includes(fuel.id!) ? Colors.base.transparent : Colors.text.muted,
                                                }}
                                                badgeColor={selectedFuels.includes(fuel.id!) ? Colors.base.primary : Colors.base.transparent}
                                                isCheckable
                                                isChecked={selectedFuels.includes(fuel.id!)}
                                                isThemed
                                            />
                                        )}
                                    />
                                ))
                            }
                        </View>


                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Poznámka</ScaledText>
                        </View>
                        <FormTextAreaInput name="note" defaultValue={station?.note ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextAreaInput>
                    </View>
                </View>
            </ScrollView>

            <View style={{ ...spacing.p(20), ...spacing.gap(8), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }} className='flex-row justify-between'>
                <CustomButton className='flex-1'
                    onPress={() => showModal(previousModal!)}
                    label="Zrušit"
                    labelSize='base'
                    labelClassName='text-center'
                    labelStyle={{ color: isDark ? Colors.base.white : '' }}
                    style={{
                        ...spacing.p(12),
                        ...spacing.borderWidth(1),
                        borderColor: isDark ? Colors.text.secondary_dark : Colors.text.muted,
                        ...spacing.borderRadius(12)
                    }}
                    backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
                />
                <CustomButton className='flex-1' onPress={handleSubmit(async (data) => {
                    await onFormSubmit(data);
                    hideModal();
                    showModal(StationsModal);
                })} label={station ? "Uložit změny" : "Přidat stanici"} labelSize='base' labelClassName='text-center' labelStyle={{ color: isDark ? Colors.base.white : '' }} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.base.primary }} backgroundColor={Colors.base.primary} />
            </View>
        </View>
    );
}