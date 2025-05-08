import {TouchableHighlight, TouchableOpacityProps} from 'react-native';
import ScaledText from '../scaledText';
import type { FontSizeKey } from '../scaledText';
import darkenHexColor from '@/utils/colorDarken';

export type CustomButtonProps = TouchableOpacityProps & {
    label: string;
    labelSize: FontSizeKey;
    labelColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    roundedRadius?: number;
    isThemed?: boolean;
};

export default function CustomButton({ label, labelSize, labelColor, backgroundColor = 'black', borderWidth = 0, borderColor, roundedRadius, isThemed = false, style, children, ...props }: CustomButtonProps) {
    return (
        <TouchableHighlight onPress={() => null} underlayColor={darkenHexColor(backgroundColor, 30)} style={[{ borderRadius: roundedRadius, borderWidth: borderWidth, borderColor: borderColor, backgroundColor: backgroundColor }]} {...props}>
            <ScaledText color={labelColor} size={labelSize} isThemed={isThemed} className='aspect-square text-center'>{label}</ScaledText>
        </TouchableHighlight>
    );
}