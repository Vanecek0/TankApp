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
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import FormNumberInput from '@/components/other/form/formNumberInput';
import { useForm } from 'react-hook-form';
import FormTextInput from '@/components/other/form/formTextInput';
import FormTextArea from '@/components/other/form/formTextAreaInput';
import { callOnRefresh } from '..';

export default function CarEdit() {
    const { isDark } = useTheme();
    const [car, setCar] = useState<Car>();
    const [isLoading, setIsLoading] = useState(true);
    const { carId } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const { width: screenWidth } = useWindowDimensions();
    const horizontalMargin = 27 / (9 / 16);
    const imageWidth = screenWidth - horizontalMargin;
    const imageHeight = imageWidth * (9 / 16);

    const loadCar = async () => {
        setIsLoading(true);
        try {
            const result = await carRepository.findById(Number.parseInt(carId[0]));
            if (result.success && result.data) {
                setCar(result.data);
            }
        } catch (error) {
            console.error('Chyba při načítání car:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        //await carRepository.update(car.id!, getValues());
        await callOnRefresh();
        router.replace("/(tabs)/cars");
    };

    useEffect(() => {
        loadCar();
    }, [carId])
    
    const onFormSubmit = async (data: any) => {
        try {
            console.log("submitted");
        } catch (error) {
            console.error('Chyba při ukládání záznamu:', error);
            throw error;
        }
    };

    return (
        <View
            style={{
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                flex: 1
            }}
        >

            <View style={{ ...spacing.mx(26) }}>
                <View className='relative'>
                    <View className='flex relative'>

                        <Image
                            style={{
                                width: imageWidth,
                                height: imageHeight,
                                ...spacing.borderTopRadius(8),
                            }}
                            resizeMode='cover'
                            source={require('@/assets/images/car_default.png')}
                        />
                        <View className='absolute' style={{ ...spacing.p(12) }} onTouchEnd={async () => handleSave()}>
                            <Icon name="chevron_left" style={{ backgroundColor: "red" }} color={Colors.hidden_text} size={getScaleFactor() * 35} />
                        </View>
                    </View>
                </View>
                <View>
                    <>
                    <ScaledText size='lg' isThemed>{car?.car_nickname}</ScaledText>
                    </>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Přezdívka</ScaledText>
                        </View>
                        <FormTextInput name="car_nickname" defaultValue={car?.car_nickname ?? ''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
                    </View>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Popis</ScaledText>
                        </View>

                        <FormTextArea name="description" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextArea>
                    </View>
                    <View>
                        <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                            <Icon name='speedometer' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
                            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Stav tachometru</ScaledText>
                        </View>

                        <FormNumberInput name="tachometer" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormNumberInput>
                    </View>
                </View>
                <CustomButton
                    className='flex-1'
                    onPress={handleSubmit(async (data) => {
                        await onFormSubmit(data);

                    })}
                    label={"Uložit změny"}
                    labelSize='base'
                    labelClassName='text-center'
                    labelColor={Colors.white}
                    style={{
                        ...spacing.p(12),
                        ...spacing.borderRadius(12),
                        ...spacing.borderWidth(1),
                        borderColor: Colors.primary
                    }}
                    backgroundColor={Colors.primary}
                />
            </View>

        </View >
    );
}