import {TouchableHighlight, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import ScaledText from '../scaledText';
import type { FontSizeKey } from '../scaledText';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode } from 'react';

export type CustomButtonProps = TouchableOpacityProps & {
    label: string | ReactNode;
    labelSize: FontSizeKey;
    labelColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    roundedRadius?: number;
    isThemed?: boolean;
    style?: ViewStyle;
};

export default function CustomButton({ label, labelSize, labelColor, backgroundColor = 'black', borderWidth = 0, borderColor, roundedRadius, isThemed = false, style, children, ...props }: CustomButtonProps) {
    return (
        <TouchableHighlight onPress={() => null} underlayColor={darkenHexColor(backgroundColor, 30)} style={[{ borderRadius: roundedRadius, borderWidth: borderWidth, borderColor: borderColor, backgroundColor: backgroundColor }, style]} {...props}>
            <ScaledText color={labelColor} size={labelSize} isThemed={isThemed} className='aspect-square text-center'>{label}</ScaledText>
        </TouchableHighlight>
    );
}