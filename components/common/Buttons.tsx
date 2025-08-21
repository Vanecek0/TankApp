import { TextStyle, TouchableHighlight, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import ScaledText from './ScaledText';
import type { FontSizeKey } from './ScaledText';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useModal } from '@/providers/modalProvider';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import AddTankRecordModal from '../modals/tankRecordModal';
import { AddStationRecordModal } from '../modals/stationsModal';
import Icon from '../Icon';

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
            <ScaledText color={labelColor} size={labelSize} isThemed={isThemed} style={labelStyle} className={`${labelClassName}`}>{label}</ScaledText>
        </TouchableHighlight>
    );
}

export type ActionButtonProps = TouchableOpacityProps & {
    label?: string;
};

export function ActionButton({ label, ...props }: ActionButtonProps) {
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const { showModal } = useModal();

    return (
        <>
            <View className='flex justify-end items-end absolute bottom-0 top-0 left-0 right-0 gap-3'>
                {isOpen ? (
                    <>
                        <View onTouchEnd={() => setIsOpen(!isOpen)} style={{ backgroundColor: isDark ? '#000000bf' : "#ffffffbf" }} className='flex absolute bottom-0 left-0 right-0 top-0'></View>
                        <View style={{ ...spacing.right(20), ...spacing.my(12) }} className='flex-col gap-3 items-end absolute right-0'>
                            <View onTouchEnd={
                                () => { showModal(AddTankRecordModal); setIsOpen(!isOpen) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
                                <ScaledText size={'base'} color={isDark ? Colors.white : ''} className='font-bold'>Přidat tankování</ScaledText>
                                <CustomButton labelClassName='aspect text-center' style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }} className={`flex shadow-md justify-center items-center aspect-square`} label={<Icon name="tank" color={Colors.primary} style={{ ...spacing.width(20), ...spacing.height(20) }} />} labelSize='xl' labelColor={isDark ? Colors.white : ''} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
                            </View>
                            <View onTouchEnd={
                                () => { showModal(AddStationRecordModal); setIsOpen(!isOpen) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
                                <ScaledText size={'base'} color={isDark ? Colors.white : ''} className='font-bold'>Přidat stanici</ScaledText>
                                <CustomButton labelClassName='aspect-square text-center' style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }} className={`flex shadow-md justify-center items-center aspect-square`} label={<Icon name="map_pin" color={Colors.primary} style={{ ...spacing.width(20), ...spacing.height(20) }} />} labelSize='xl' labelColor={isDark ? Colors.white : ''} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
                            </View>
                            <View style={{ ...spacing.p(24), ...spacing.width(80), ...spacing.height(80) }}></View>
                        </View>
                    </>
                ) : null}
                <CustomButton labelClassName='aspect text-center' onPress={() => setIsOpen(!isOpen)} style={{ ...spacing.borderRadius(90), ...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.width(80) }} className={`flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
            </View>
        </>
    );
}