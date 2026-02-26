import { GestureResponderEvent, TextStyle, TouchableHighlight, TouchableOpacityProps, ViewStyle } from 'react-native';
import ScaledText from './ScaledText';
import type { FontSizeKey } from './ScaledText';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode } from 'react';

export type CustomButtonProps = TouchableOpacityProps & {
    label: string | ReactNode;
    labelSize?: FontSizeKey;
    onPress?: (event: GestureResponderEvent) => void;
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
        labelSize = "base",
        onPress,
        className,
        labelStyle,
        labelClassName,
        backgroundColor = 'black',
        borderWidth = 0, borderColor,
        roundedRadius,
        isThemed = false,
        style,
        ...props
    }: CustomButtonProps
) {
    return (
        <TouchableHighlight className={`${className}`} onPress={onPress} underlayColor={darkenHexColor(backgroundColor, 30)} style={[{ borderRadius: roundedRadius, borderWidth: borderWidth, borderColor: borderColor, backgroundColor: backgroundColor }, style]} {...props}>
            <ScaledText size={labelSize} isThemed={isThemed} style={labelStyle} className={`${labelClassName}`}>{label}</ScaledText>
        </TouchableHighlight>
    );
}