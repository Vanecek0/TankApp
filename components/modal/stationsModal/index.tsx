import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, VirtualizedList, RefreshControl, TextInput, ScrollView } from 'react-native';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';
import { Station, StationModel } from '@/models/Station';
import { Fuel, FuelModel } from '@/models/Fuel';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { DTO } from '@/DTO/mapper';
import CustomButton from '@/components/other/customButton';
import { useController, useForm, useWatch } from 'react-hook-form';
import FormTextInput from '@/components/other/form/formTextInput';
import FormTimeInput from '@/components/other/form/formTextInput';
import FormDateTimeInput from '@/components/other/form/formDateTimeInput';
import FormTextAreaInput from '@/components/other/form/formTextAreaInput';
import FormCheckboxItem from '@/components/other/form/formCheckBoxItem';
import Dropdown from '@/components/other/dropdown';
import { StationFuelModel } from '@/models/StationFuel';
import { TankingModel } from '@/models/Tanking';

type StationWithFuels = Station & {
    fuels: (Fuel & { last_price_per_unit: number | null })[];
};

const StationItem = React.memo(({ item, isDark, onPress }: { item: StationWithFuels; isDark: boolean, onPress: (station: StationWithFuels) => void }) => (
    <View
        style={{
            ...spacing.borderRadius(6),
            ...spacing.gap(8),
            ...spacing.p(12),
            ...spacing.px(17),
            backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
        }}
        onTouchEnd={() => onPress(item)}
    >
        <View className="flex-row justify-between" style={{ ...spacing.gap(32) }}>
            <View className="flex-1" style={{ ...spacing.gap(4) }}>
                <View className="flex-row items-center" style={{ ...spacing.gap(8) }}>
                    <ScaledText size="lg" className="flex-initial font-bold text-ellipsis overflow-visible" numberOfLines={1} ellipsizeMode="tail" isThemed>
                        {item.name}
                    </ScaledText>
                </View>
                {item.address && (
                    <View style={{ ...spacing.gap(4) }} className="flex-row items-center">
                        <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                        <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                            {item.address}
                        </ScaledText>
                    </View>
                )}
            </View>
            <View className="flex-row" style={{ ...spacing.gap(12) }}>
                <Icon name="edit" color={Colors.hidden_text} size={getScaleFactor() * 20} />
            </View>
        </View>

        {item.phone && (
            <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
                <Icon name="phone" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                    {item.phone}
                </ScaledText>
            </View>
        )}

        {item.opening_hrs && item.closing_hrs && (
            <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
                <Icon name="clock" color={Colors.hidden_text} size={getScaleFactor() * 15} />
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
                            className="uppercase border-[1px]"
                            isThemed
                            style={{
                                ...spacing.borderRadius(12),
                                borderColor: Colors.hidden_text,
                            }}
                            badgeColor=""
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
));

export default function StationsModal() {
    const { hideModal, showModal } = useModal();
    const { isDark } = useTheme();
    const [stations, setStations] = useState<StationWithFuels[]>([]);

    const loadStations = async () => {
        const data = await StationModel.getAllStationsWithFuels();
        setStations(data);
    };

    useEffect(() => {
        loadStations();
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: StationWithFuels }) => <StationItem item={item} isDark={isDark} onPress={() => showModal(AddStationRecordModal, { station: item })} />,
        [isDark]
    );

    return (
        <View className="max-h-full h-full" style={{ ...spacing.borderRadius(12) }}>
            <View
                className="border-b-[1px] sticky flex-row justify-between items-center"
                style={{
                    ...spacing.borderTopRadius(12),
                    borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    ...spacing.p(24),
                }}
            >
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View
                        style={{
                            ...spacing.borderRadius(8),
                            ...spacing.width(48),
                            ...spacing.height(48),
                            backgroundColor: Colors.primary,
                        }}
                        className="flex items-center justify-center"
                    >
                        <Icon name="map_pin" color={Colors.dark.text} size={getScaleFactor() * 20} />
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
                    <Icon name="cross" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>

            <View className="flex-1">
                <VirtualizedList
                    initialNumToRender={1}
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
                            color={Colors.inactive_icon}
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

export function AddStationRecordModal({ station }: { station: StationWithFuels }) {
    const { hideModal, showModal } = useModal();
    const { isDark } = useTheme();
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [fuels, setFuels] = useState<Fuel[]>([]);
    //const [selectedFuels, setSelectedFuels] = useState<number[]>([]);
    const selectedFuels = useWatch({ control, name: 'fuels' }) ?? [];

    const loadAllFuels = async () => {
        const allFuels = await FuelModel.all();
        setFuels(allFuels);
        //setSelectedFuels(station.fuels.map(fuel => fuel.id!));
    };

    useEffect(() => {
        loadAllFuels();
    }, []);

    const onFormSubmit = async (data: any) => {
        try {
            const result = await StationModel.updateStation(station.id!, {
                name: data.name,
                address: data.address,
                phone: data.phone,
                opening_hrs: data.opening,
                closing_hrs: data.closing,
                note: data.note,
            });

            const existingFuels = await StationFuelModel.all();
            const existingFuelIds = existingFuels.map(sf => sf.id_fuel);

            for (const fuelId of existingFuelIds) {
                await StationFuelModel.deleteByFuelAndStation(station.id!, fuelId);
            }

            for (const fuelId of selectedFuels) {

                await StationFuelModel.create({
                    id_station: station.id!,
                    id_fuel: fuelId,
                    last_price_per_unit: 0,
                });
            }
            return result;
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
                    borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    ...spacing.p(24),
                }}
            >
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View
                        style={{
                            ...spacing.borderRadius(8),
                            ...spacing.width(48),
                            ...spacing.height(48),
                            backgroundColor: Colors.primary,
                        }}
                        className="flex items-center justify-center"
                    >
                        <Icon name="edit" color={Colors.dark.text} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size="xl" isThemed className="text-xl font-semibold">
                            Úprava stanice
                        </ScaledText>
                        <ScaledText size="sm" isThemed>
                            Níže upravte vybranou stanici
                        </ScaledText>
                    </View>
                </View>
                <View
                    onTouchEnd={() => hideModal()}
                    style={{ ...spacing.p(36), ...spacing.me(-12) }}
                    className="justify-center items-center absolute right-0"
                >
                    <Icon name="cross" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.p(24) }} className="">
                <View style={{ ...spacing.gap(12), ...spacing.pb(52) }}>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Název stanice</ScaledText>
                        </View>

                        <FormTextInput name="name" defaultValue={station.name} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Adresa</ScaledText>
                        </View>

                        <FormTextInput name="address" defaultValue={station.address} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Telefonní číslo</ScaledText>
                        </View>

                        <FormTextInput name="phone" defaultValue={station.phone} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Otevírací doba</ScaledText>
                        </View>
                        <View style={{ ...spacing.gap(8) }} className='flex-row justify-between'>
                            <View style={{ ...spacing.gap(8) }} className='flex-row flex-1 items-center'>
                                <ScaledText size='base' isThemed>od</ScaledText>
                                <FormDateTimeInput name="opening" defaultValue={station.opening_hrs} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormDateTimeInput>
                            </View>
                            <View style={{ ...spacing.gap(8) }} className='flex-row flex-1 items-center'>
                                <ScaledText size='base' isThemed>do</ScaledText><FormDateTimeInput name="closing" defaultValue={station.closing_hrs} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormDateTimeInput>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Typy paliv</ScaledText>
                        </View>

                        <View className="flex-row flex-wrap" style={{}}>
                            {
                                fuels.map((fuel, index) => (
                                    <FormCheckboxItem
                                        name="fuels"
                                        key={index}
                                        control={control}
                                        value={fuel.id!}
                                        defaultValue={station.fuels.map(f => f.id!)}
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
                                                    borderColor: selectedFuels.includes(fuel.id!) ? Colors.transparent : Colors.hidden_text,
                                                }}
                                                badgeColor={selectedFuels.includes(fuel.id!) ? Colors.primary : Colors.transparent}
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
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Poznámka</ScaledText>
                        </View>

                        <FormTextAreaInput name="note" defaultValue={station.note} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextAreaInput>
                    </View>
                </View>
            </ScrollView>


            <View style={{ ...spacing.p(20), ...spacing.gap(8), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }} className='flex-row justify-between'>
                <CustomButton className='flex-1' onPress={() => showModal(StationsModal)} label="Zpět" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderWidth(1), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.hidden_text, ...spacing.borderRadius(12) }} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
                <CustomButton className='flex-1' onPress={handleSubmit(async (data) => {
                    await onFormSubmit(data);
                    hideModal();
                    showModal(StationsModal);
                })} label="Uložit změny" labelSize='base' labelClassName='text-center' labelColor={Colors.white} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.primary }} backgroundColor={Colors.primary} />
            </View>
        </View>
    );
}