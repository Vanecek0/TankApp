import { Animated, GestureResponderEvent, TextStyle, TouchableHighlight, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import ScaledText from './ScaledText';
import type { FontSizeKey } from './ScaledText';
import darkenHexColor from '@/utils/colorDarken';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';

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

type ActionButtonProps = {
    children?: React.ReactNode;
    scrollY?: Animated.Value;
};

export function ActionButton({ children, scrollY }: ActionButtonProps) {
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        if (!(scrollY instanceof Animated.Value)) return;

        let lastValue = 0;

        const id = scrollY.addListener(({ value }) => {
            if (value > lastValue + 3) {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }).start(() => {
                    setDisabled(true);
                });
            } else if (value < lastValue - 3) {
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }).start(() => {
                    setDisabled(false);
                });
            }
            lastValue = value;
        });

        return () => scrollY.removeListener(id);
    }, [scrollY, fadeAnim]);

    return (
        <View className='flex justify-end items-end absolute bottom-0 top-0 left-0 right-0 gap-3'>
            {isOpen ? (
                <>
                    <View
                        onTouchEnd={() => setIsOpen(!isOpen)}
                        style={{
                            backgroundColor: isDark ? '#000000df' : "#ffffffdf",
                            zIndex: 10
                        }}
                        className='flex absolute bottom-0 left-0 right-0 top-0'></View>
                    <View style={{
                        ...spacing.right(20),
                        ...spacing.my(12),
                        ...spacing.gap(12),
                        ...spacing.pb(92),
                        zIndex: 20
                    }}
                        className='flex-col items-end absolute right-0'>
                        {children}
                    </View>
                </>
            ) : null}
            <Animated.View
                style={{
                    zIndex: 20,
                    opacity: fadeAnim,
                }}
                pointerEvents={disabled ? "none" : "auto"}
                >
                <CustomButton
                    labelClassName='aspect text-center'
                    onPress={() => setIsOpen(!isOpen)}
                    style={{
                        ...spacing.borderRadius(90),
                        ...spacing.p(24),
                        ...spacing.my(12),
                        ...spacing.right(20),
                        ...spacing.width(80), zIndex: 20
                    }}
                    className={`flex justify-center items-center aspect-square`}
                    label='+'
                    labelSize='xl'
                    labelStyle={{ color: Colors.white }}
                    backgroundColor={Colors.primary}
                />
            </Animated.View>
        </View>
    );
}