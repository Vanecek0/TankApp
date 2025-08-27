import CustomButton from "@/components/common/Buttons";
import ScaledText from "@/components/common/ScaledText";
import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import { ThemeColors as Colors } from "@/constants/Colors";
import { Car, CarModel } from "@/models/Car";
import { useModal } from "@/providers/modalProvider";
import { carRepository } from "@/repositories/carRepository";
import { useTheme } from "@/theme/ThemeProvider";
import contrastHexColor from "@/utils/colorContrast";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, LayoutChangeEvent, ScrollView, useWindowDimensions, View, VirtualizedList } from "react-native";
import DeleteConfirmationModal from "../superModals/deleteConfirmationModal";
import { RefreshControl } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { Fuel, FuelModel } from "@/models/Fuel";
import { DTO } from "@/DTO/mapper";
import FormTextInput from "@/components/forms/FormTextInput";
import FormCheckboxItem from "@/components/forms/FormCheckboxItem";
import FormNumberInput from "@/components/forms/FormNumberInput";
import FormDateTimeInput from "@/components/forms/FormDateTimeInput";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loadCarFromStorage } from "@/store/slices/car.slice";

export default function ProfileModal() {
    const { hideModal, showModal, showSuperModal } = useModal();
    const { isDark } = useTheme();
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCars = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await carRepository.findAll();
            setCars(result);
        } catch (error) {
            console.error('Chyba při načítání cars:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCars();
    }, [])

    useEffect(() => {
        dispatch(loadCarFromStorage());
    }, [dispatch]);

    const onRefresh = useCallback(async () => {
        await loadCars();
    }, []);


    const CarItem = React.memo(({ item, isDark, onPress, showDeleteConfirm }: { item: Car, isDark: boolean, onPress: (car: Car) => void, showDeleteConfirm: (car: Car) => void }) => {

        return (
            <View>
                <View
                    className='relative'
                    onTouchEnd={() => onPress(item)}
                >
                    {item.id == car?.id ? (
                        <Badge className='absolute z-10 top-0 left-0' style={{ ...spacing.borderTopLeftRadius(8) }} value='Vybráno' textColor={contrastHexColor(Colors.badge.primary)} badgeColor={Colors.badge.primary}></Badge>
                    ) : undefined}

                    <ResponsiveImage
                        source={require('@/assets/images/car_default.png')}
                        style={{
                            ...spacing.borderTopRadius(8),
                        }}
                        ratio={9 / 16}
                    />


                </View>

                <View
                    className='flex-row justify-between items-center relative'
                    style={{
                        backgroundColor: isDark
                            ? Colors.background.surface.dark
                            : Colors.background.surface.light,
                        ...spacing.borderBottomRadius(8),
                    }}>
                    <View
                        className='w-full'
                        onTouchEnd={() => onPress(item)}
                    >
                        <View style={{ ...spacing.me(48), ...spacing.p(16) }}>
                            <ScaledText size='lg' className='font-bold' isThemed>
                                {item.car_nickname ?? `${item.manufacturer} ${item.model}`}
                            </ScaledText>
                            <ScaledText size='base' color={Colors.text.muted} >
                                {`${item.manufacturer} ${item.model}`}
                            </ScaledText>
                            <ScaledText size='base' color={Colors.text.muted} >
                                {`Rok výroby: ${item.manufacture_year}\nTachometr: ${item.odometer} km`}
                            </ScaledText>
                        </View>

                    </View>
                    <View className='absolute top-0 bottom-0 right-3 flex-row items-center' style={{ ...spacing.gap(4) }}>
                        <View className="flex-row" style={{ ...spacing.gap(12), ...spacing.py(5), ...spacing.px(5) }} onTouchEnd={() => onPress(item)}>
                            <Icon name="edit" color={Colors.icon.disabled} size={getScaleFactor() * 20} />
                        </View>
                        {item.id != car?.id ?
                            (<View className="flex-row" style={{ ...spacing.gap(12), ...spacing.py(5), ...spacing.px(5) }} onTouchEnd={() => showDeleteConfirm(item)}>
                                <Icon name="bin" color={Colors.icon.disabled} size={getScaleFactor() * 20} />
                            </View>) : undefined
                        }
                    </View>
                </View>
            </View>

        );
    });

    const renderItem = useCallback(
        ({ item }: { item: Car }) =>
            <CarItem
                item={item}
                isDark={isDark}
                showDeleteConfirm={() => showSuperModal(DeleteConfirmationModal, {
                    message: "Opravdu chcete smazat tento profil?",
                    deleteIcon: <Icon name="bin" color={Colors.base.primary} size={getScaleFactor() * 45} />,
                    onConfirm: async () => {
                        await carRepository.delete(item.id!);
                        onRefresh();
                    },
                })}
                onPress={() => showModal(ProfileActionModal, { car: item, previousModal: ProfileModal })}
            />,

        [isDark]
    );

    return (
        <View className="max-h-full h-full" style={{ ...spacing.borderRadius(12) }}>
            <View
                className="border-b-[1px] sticky flex-row justify-between items-center"
                style={{
                    ...spacing.borderTopRadius(12),
                    borderColor: isDark ? Colors.text.primary : Colors.text.primary_dark,
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
                        <Icon name="map_pin" color={Colors.text.primary} size={getScaleFactor() * 20} />
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
                    <Icon name="cross" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 20} />
                </View>
            </View>

            <View className="flex-1" style={{ ...spacing.mx(24) }}>
                <VirtualizedList
                    initialNumToRender={1}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    maxToRenderPerBatch={1}
                    windowSize={2}
                    renderItem={renderItem}
                    getItemCount={() => cars.length}
                    getItem={(_, index) => cars[index]}
                    keyExtractor={(item) => item.id!.toString()}
                    ListHeaderComponentStyle={{ zIndex: 50 }}
                    contentContainerStyle={{ ...spacing.gap(24), ...spacing.mt(24), ...spacing.pb(48) }}
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

export function ProfileActionModal({ car, previousModal }: { car: Car, previousModal?: React.FC<any> }) {
    const { hideModal, showModal } = useModal();
    const { isDark } = useTheme();
    const [fuels, setFuels] = useState<Fuel[]>([]);
    const { control, handleSubmit, formState } = useForm();

    const loadAllFuels = async () => {
        const allFuels = await FuelModel.all();
        setFuels(allFuels);
    };

    useEffect(() => {
        loadAllFuels();
    }, []);

    const onFormSubmit = async (data: any) => {
        try {
            const carDTO = DTO<Car, typeof data>(data);

            if (car) {
                const result = await carRepository.update(car.id!, carDTO);
                return result;
            } else {
                const result = await CarModel.create(carDTO);
                return result;
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
                    borderColor: isDark ? Colors.text.primary : Colors.text.primary_dark,
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
                        <Icon name="edit" color={Colors.icon.primary} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size="xl" isThemed className="text-xl font-semibold">
                            {car ? 'Úprava vozidla' : 'Přidat vozidlo'}
                        </ScaledText>
                        <ScaledText size="sm" isThemed>
                            {car ? 'Níže upravte vybrané vozidlo' : 'Vyplňte údaje o vozidle'}
                        </ScaledText>
                    </View>
                </View>
                <View
                    onTouchEnd={() => hideModal()}
                    style={{ ...spacing.p(36), ...spacing.me(-12) }}
                    className="justify-center items-center absolute right-0"
                >
                    <Icon name="cross" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.p(24) }} className="">
                <View style={{ ...spacing.gap(12), ...spacing.pb(52) }}>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Výrobce</ScaledText>
                        </View>

                        <FormTextInput name="manufacturer" defaultValue={car?.manufacturer ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Model</ScaledText>
                        </View>

                        <FormTextInput name="model" defaultValue={car?.model ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Rok výroby</ScaledText>
                        </View>

                        <FormNumberInput name="manufacture_year" defaultValue={car?.manufacture_year ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormNumberInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Datum registrace</ScaledText>
                        </View>
                        <FormDateTimeInput mode="date" name="registration_date" defaultValue={car?.registration_date ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormDateTimeInput>
                    </View>

                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
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
                                                    borderColor: car.fuel_id == fuel.id! ? Colors.base.transparent : Colors.text.muted,
                                                }}
                                                badgeColor={car.fuel_id == fuel.id! ? Colors.base.primary : Colors.base.transparent}
                                                isCheckable
                                                isChecked={car.fuel_id == fuel.id!}
                                                isThemed
                                            />
                                        )}
                                    />
                                ))
                            }
                        </View>


                    </View>

                </View>
            </ScrollView>

            <View style={{ ...spacing.p(20), ...spacing.gap(8), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }} className='flex-row justify-between'>
                <CustomButton className='flex-1'
                    onPress={() => showModal(previousModal!)}
                    label="Zrušit"
                    labelSize='base'
                    labelClassName='text-center'
                    labelColor={isDark ? Colors.base.white : ''}
                    style={{
                        ...spacing.p(12),
                        ...spacing.borderWidth(1),
                        borderColor: isDark ? Colors.text.primary_dark : Colors.text.muted,
                        ...spacing.borderRadius(12)
                    }}
                    backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light} />
                <CustomButton className='flex-1' onPress={handleSubmit(async (data) => {
                    await onFormSubmit(data);
                    hideModal();
                    showModal(ProfileModal);
                })} label={car ? "Uložit změny" : "Přidat stanici"} labelSize='base' labelClassName='text-center' labelColor={Colors.base.white} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.base.primary }} backgroundColor={Colors.base.primary} />
            </View>
        </View>
    )
}