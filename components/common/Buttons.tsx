import { TextStyle, TouchableHighlight, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import ScaledText from './ScaledText';
import type { FontSizeKey } from './ScaledText';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useModal } from '@/providers/modalProvider';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';

export type CustomButtonProps = TouchableOpacityProps & {
    label: string | ReactNode;
    labelSize: FontSizeKey;
    labelColor?: string;
    className?: string;
    labelStyle?: TextStyle;
    labelClassName?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    roundedRadius?: number;
    isThemed?: boolean;
    style?: ViewStyle;
};

export default function CustomButton(
    {
        label,
        labelSize,
        className,
        labelStyle,
        labelClassName,
        labelColor,
        backgroundColor = 'black',
        borderWidth = 0, borderColor,
        roundedRadius,
        isThemed = false,
        style,
        ...props
    }: CustomButtonProps
) {
    return (
        <TouchableHighlight className={`${className}`} onPress={() => null} underlayColor={darkenHexColor(backgroundColor, 30)} style={[{ borderRadius: roundedRadius, borderWidth: borderWidth, borderColor: borderColor, backgroundColor: backgroundColor }, style]} {...props}>
            <ScaledText size={labelSize} isThemed={isThemed} style={[{color: labelColor}, labelStyle]} className={`${labelClassName}`}>{label}</ScaledText>
        </TouchableHighlight>
    );
}



export function ActionButton({ children }: any) {
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const { showModal } = useModal();

    return (
        <>
            <View className='flex justify-end items-end absolute bottom-0 top-0 left-0 right-0 gap-3'>
                {isOpen ? (
                    <>
                        <View onTouchEnd={() => setIsOpen(!isOpen)} style={{ backgroundColor: isDark ? '#000000bf' : "#ffffffbf", zIndex: 10 }} className='flex absolute bottom-0 left-0 right-0 top-0'></View>
                        <View style={{ ...spacing.right(20), ...spacing.my(12), ...spacing.gap(12), ...spacing.pb(92), zIndex: 20 }} className='flex-col items-end absolute right-0'>
                            {children}
                        </View>
                    </>
                ) : null}
                <CustomButton labelClassName='aspect text-center' onPress={() => setIsOpen(!isOpen)} style={{ ...spacing.borderRadius(90), ...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.width(80), zIndex: 20 }} className={`flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
            </View>
        </>
    );
}