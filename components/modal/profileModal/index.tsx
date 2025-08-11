import CustomButton from "@/components/other/customButton";
import ScaledText from "@/components/other/scaledText";
import Badge from "@/components/ui/badge";
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { useCar } from "@/context/carContext";
import { Car } from "@/models/Car";
import { useModal } from "@/providers/modalProvider";
import { carRepository } from "@/repositories/carRepository";
import { useTheme } from "@/theme/ThemeProvider";
import contrastHexColor from "@/utils/colorContrast";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, useWindowDimensions, View, VirtualizedList } from "react-native";
import DeleteConfirmationModal from "../superModals/deleteConfirmationModal";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

export default function ProfileModal() {
    const { hideModal, showModal, showSuperModal, showPlainModal } = useModal();
    const { isDark } = useTheme();
    const { car } = useCar();
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCars = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await carRepository.findAll();
            if (result.success && result.data) {
                setCars(result.data);
            }
        } catch (error) {
            console.error('Chyba při načítání cars:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        await loadCars();
    }, []);

    useEffect(() => {
        loadCars();
    }, [loadCars])

    const CarItem = React.memo(({ item }: { item: Car }) => {
        const { width: screenWidth } = useWindowDimensions();
        const horizontalMargin = 27 / (9 / 16);
        const imageWidth = screenWidth - horizontalMargin;
        const imageHeight = imageWidth * (9 / 16);

        return (
            <>
                <View style={{ ...spacing.mx(0) }}>
                    <View
                        className='relative'
                        onTouchEnd={() => item.id && router.push({ pathname: "/(tabs)/cars/edit/[carId]", params: { carId: item.id?.toString() } })}
                    >
                        {item.id == car?.id ? (
                            <Badge className='absolute z-10 top-0 left-0' style={{ ...spacing.borderTopLeftRadius(8) }} value='Vybráno' textColor={contrastHexColor(Colors.badge.primary)} badgeColor={Colors.badge.primary}></Badge>
                        ) : undefined}

                        <Image
                            style={{
                                width: imageWidth,
                                height: imageHeight,
                                ...spacing.borderTopRadius(8),
                            }}
                            resizeMode='cover'
                            source={require('@/assets/images/car_default.png')}
                        />
                    </View>

                    <View
                        className='flex-row justify-between items-center relative'
                        style={{
                            backgroundColor: isDark
                                ? Colors.dark.secondary
                                : Colors.light.secondary,
                        }}>
                        <View
                            style={{
                                ...spacing.borderBottomRadius(8),
                            }}
                            className='w-full'
                            onTouchEnd={() => item.id && router.push({ pathname: "/(tabs)/cars/edit/[carId]", params: { carId: item.id?.toString() } })}
                        >
                            <View style={{ ...spacing.me(48), ...spacing.p(8) }}>
                                <ScaledText size='lg' className='font-bold' isThemed>
                                    {item.car_nickname ?? `${item.manufacturer} ${item.model}`}
                                </ScaledText>
                                <ScaledText size='base' color={Colors.hidden_text} >
                                    {`${item.manufacturer} ${item.model}`}
                                </ScaledText>
                                <ScaledText size='base' color={Colors.hidden_text} >
                                    {`Rok výroby: ${item.manufacture_year}\nTachometr: ${item.tachometer} km`}
                                </ScaledText>
                            </View>

                        </View>
                        <View className='absolute top-0 bottom-0 right-0 justify-center' style={{ ...spacing.p(12) }} onTouchEnd={() => showPlainModal(ActionCarItemOptions, { car: item })}>
                            <Icon name="more" color={Colors.hidden_text} size={getScaleFactor() * 25} />
                        </View>
                    </View>
                </View>
            </>
        );
    });

    const renderItem = useCallback(
        ({ item }: { item: Car }) => <CarItem item={item} />,
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
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    maxToRenderPerBatch={1}
                    windowSize={2}
                    renderItem={renderItem}
                    getItemCount={() => cars.length}
                    getItem={(_, index) => cars[index]}
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


export function ActionCarItemOptions({ car }: { car: Car }) {
    const { isDark } = useTheme();
    const { hidePlainModal, showSuperModal, hideSuperModal } = useModal();

    return (
        <View className="w-full h-full flex justify-center" style={{ ...spacing.borderRadius(12), ...spacing.px(24), backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.5)" }}>
            <View
                className="border-b-[1px] sticky flex justify-between items-center"
                style={{
                    ...spacing.borderRadius(12),
                    ...spacing.py(12),
                    zIndex: 2,
                    borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                }}
            >

                <CustomButton onPress={() => car.id && router.push({ pathname: "/(tabs)/cars/edit/[carId]", params: { carId: car.id?.toString() } })} className='w-full' labelClassName='text-center' style={{ ...spacing.px(24), ...spacing.py(12) }} labelSize='xl' label="Upravit" backgroundColor='transparent' isThemed></CustomButton>
                <CustomButton onPress={() => showSuperModal(DeleteConfirmationModal, {
                    message: "Opravdu chcete smazat tento profil?",
                    deleteIcon: <Icon name="bin" color={Colors.primary} size={getScaleFactor() * 45} />,
                    onConfirm: async () => {
                        hidePlainModal();
                        await carRepository.delete(car.id!);
                    },
                })}
                    className='w-full'
                    labelClassName='text-center'
                    style={{ ...spacing.px(24), ...spacing.py(12) }} labelSize='xl' label="Smazat" backgroundColor='transparent' labelColor='red'></CustomButton>
            </View>
        </View >
    );
}
