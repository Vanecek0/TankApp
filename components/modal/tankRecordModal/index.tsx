import {TouchableHighlight, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode } from 'react';
import ScaledText from '@/components/other/scaledText';

export type TankRecordModalProps = TouchableOpacityProps & {
    style?: ViewStyle;
};

export default function TankRecordModal({ style, ...props }: TankRecordModalProps) {
    return (
        <View>
            <ScaledText size="base">Modal</ScaledText>
        </View>
    );
}