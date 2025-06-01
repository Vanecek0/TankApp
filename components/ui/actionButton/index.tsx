import { TouchableHighlight, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import type { FontSizeKey } from '../scaledText';
import darkenHexColor from '@/utils/colorDarken';
import CustomButton from '@/components/other/customButton';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import ScaledText from '@/components/other/scaledText';
import Icon from '../Icon';

export type CustomButtonProps = TouchableOpacityProps & {
    label?: string;
    /*labelSize: FontSizeKey;
    labelColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    roundedRadius?: number;
    isThemed?: boolean;
    style?: ViewStyle;*/
};

export default function ActionButton({ label, ...props }: CustomButtonProps) {
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <View className='flex justify-end items-end absolute bottom-0 top-0 left-0 right-0 gap-3'>
                {isOpen ? (
                    <>
                        <View onTouchEnd={() => setIsOpen(!isOpen)} style={{ backgroundColor: '#000000bf' }} className='flex absolute bottom-0 left-0 right-0 top-0'></View>
                        <View style={{ ...spacing.right(20), ...spacing.my(12) }} className='flex-col gap-3 items-end absolute right-0'>
                            <View style={{...spacing.right(10)}} className='flex-row items-center gap-3'>
                                <ScaledText size={'base'} color={Colors.white}>Přidat tankování</ScaledText>
                                <CustomButton style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }} className={`flex justify-center items-center aspect-square`} label={<Icon name="tank" color={Colors.primary} style={{ ...spacing.width(20), ...spacing.height(20) }} />} labelSize='xl' labelColor={isDark ? Colors.white : ''} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
                            </View>
                            <View style={{...spacing.right(10)}} className='flex-row items-center gap-3'>
                                <ScaledText size={'base'} color={Colors.white}>Přidat stanici</ScaledText>
                                <CustomButton style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }} className={`flex justify-center items-center aspect-square`} label={<Icon name="map_pin" color={Colors.primary} style={{ ...spacing.width(20), ...spacing.height(20) }} />} labelSize='xl' labelColor={isDark ? Colors.white : ''} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
                            </View>
                            <View style={{ ...spacing.p(24), ...spacing.width(80), ...spacing.height(80) }}></View>
                        </View>
                    </>

                ) : null}
                <CustomButton onPress={() => setIsOpen(!isOpen)} style={{ ...spacing.borderRadius(90), ...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.width(80) }} className={`flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
            </View>
        </>
    );
}