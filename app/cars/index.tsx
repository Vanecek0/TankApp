import { View, Text, Button, Image, VirtualizedList, RefreshControl, useWindowDimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ScaledText from '@/components/other/scaledText';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsBar from '@/components/ui/settingsBar';
import React, { useCallback, useEffect, useState } from 'react';
import { useCar } from '@/context/carContext';
import { Car } from '@/models/Car';
import { carRepository } from '@/repositories/carRepository';
import Badge from '@/components/ui/badge';
import contrastHexColor from '@/utils/colorContrast';
import ActionButton from '@/components/ui/actionButton';

export default function CarSelect() {
    const { isDark } = useTheme();
    const { car } = useCar();
    const [containerWidth, setContainerWidth] = useState(0);
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
            <View style={{ ...spacing.mx(26) }}>
                <View className='relative'>
                    {item.id == car?.id ? (
                        <Badge className='absolute z-10 top-0 left-0' value='Vybráno' textColor={contrastHexColor(Colors.badge.primary)} badgeColor={Colors.badge.primary}></Badge>
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
                    style={{
                        ...spacing.borderBottomRadius(8),
                        ...spacing.p(8),
                        backgroundColor: isDark
                            ? Colors.dark.secondary
                            : Colors.light.secondary,
                    }}
                >
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
        );
    });

    const renderItem = useCallback(
        ({ item }: { item: Car }) => <CarItem item={item} />,
        [isDark]
    );

    return (
        <SafeAreaView
            style={{
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                flex: 1
            }}
            className={`${isDark ? 'dark' : ''}`}
        >
            <SettingsBar />
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
                    paddingBottom: 12,
                    gap: 12
                }}
                ListEmptyComponent={
                    <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.inactive_icon} size="base">
                        Žádné další záznamy
                    </ScaledText>
                }
            />
        </SafeAreaView >
    );
}