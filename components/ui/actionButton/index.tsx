import {TouchableHighlight, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import ScaledText from '../scaledText';
import type { FontSizeKey } from '../scaledText';
import darkenHexColor from '@/utils/colorDarken';
import CustomButton from '@/components/other/customButton';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

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
const [isOpen, setIsOpen] = useState(false);

export default function ActionButton({ label, ...props }: CustomButtonProps) {
    return (
        
        <CustomButton style={{ ...spacing.borderRadius(90), ...spacing.p(24), ...spacing.my(12), ...spacing.right(20) }} className={`absolute bottom-0  flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
    );
}