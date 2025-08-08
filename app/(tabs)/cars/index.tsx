import { View, Text, Button, Image, VirtualizedList, RefreshControl, useWindowDimensions, FlatList } from 'react-native';
import ScaledText from '@/components/other/scaledText';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import React, { useCallback, useEffect, useState } from 'react';
import { useCar } from '@/context/carContext';
import { Car } from '@/models/Car';
import { carRepository } from '@/repositories/carRepository';
import Badge from '@/components/ui/badge';
import contrastHexColor from '@/utils/colorContrast';
import { ModalProvider, useModal } from '@/providers/modalProvider';
import Icon from '@/components/ui/Icon';
import CustomButton from '@/components/other/customButton';
import DeleteConfirmationModal from '@/components/modal/superModals/deleteConfirmationModal';
import { navigate } from 'expo-router/build/global-state/routing';
import { router, useFocusEffect, useNavigation } from 'expo-router';

let onRefresh: null | (() => void | Promise<void>) = null;

export const setOnRefresh = (fn: () => void | Promise<void>) => {
    onRefresh = fn;
};

export const callOnRefresh = async () => {
    if (onRefresh) {
        await onRefresh();
    }
};

export default function CarSelect() {
    const { isDark } = useTheme();
    const { car } = useCar();
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showPlainModal } = useModal();

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
        console.log("refreshed")
    }, []);

    useEffect(() => {
        setOnRefresh(onRefresh);
        loadCars();
    }, [loadCars])

    const CarItem = React.memo(({ item }: { item: Car }) => {
        const { width: screenWidth } = useWindowDimensions();
        const horizontalMargin = 27 / (9 / 16);
        const imageWidth = screenWidth - horizontalMargin;
        const imageHeight = imageWidth * (9 / 16);

        return (
            <>
                <View style={{ ...spacing.mx(26) }}>
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
        <View
            style={{
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                flex: 1
            }}
            className={`${isDark ? 'dark' : ''}`}
        >
            <FlatList
                data={cars}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                windowSize={10}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                contentContainerStyle={{
                    ...spacing.pb(24),
                    ...spacing.gap(12)
                }}
                ListEmptyComponent={
                    <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.inactive_icon} size="base">
                        Žádné další záznamy
                    </ScaledText>
                }
            />
        </View >
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
                        callOnRefresh()
                    },
                })}
                    className='w-full'
                    labelClassName='text-center'
                    style={{ ...spacing.px(24), ...spacing.py(12) }} labelSize='xl' label="Smazat" backgroundColor='transparent' labelColor='red'></CustomButton>
            </View>
        </View >
    );
}