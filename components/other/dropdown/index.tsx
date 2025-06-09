import { FlatList, Modal, Platform, TextStyle, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import ScaledText from '../scaledText';
import { useCallback, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';

type OptionItem = {
    value: string;
    label: string;
}

export type CustomButtonProps = TouchableOpacityProps & {
    placeholder: string;
    data?: OptionItem[];
    dropdownStyle?: ViewStyle
    dropdownTextStyle?: TextStyle
    onChange: (item: OptionItem) => void;
};

export default function Dropdown({ placeholder, data = [], onChange, dropdownStyle, dropdownTextStyle }: CustomButtonProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);
    const [value, setValue] = useState('');
    const [buttonHeight, setButtonHeight] = useState(0);
    const { isDark } = useTheme();

    const onSelect = useCallback(
        (item: OptionItem) => {
            onChange(item);
            setValue(item.value);
            setExpanded(false);
        },
        [onChange]
    );

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity
                onLayout={(e) => setButtonHeight(e.nativeEvent.layout.height)}
                onPress={toggleExpanded}
                activeOpacity={0.8}
                style={[{
                    ...spacing.height(52),
                    ...spacing.px(16),
                    ...spacing.py(8),
                    ...spacing.borderRadius(12)}, dropdownStyle]
                }
                className="flex-row items-center justify-between"
            >
                <ScaledText size="base" style={[{color: isDark ? Colors.white : Colors.light.text},dropdownTextStyle]}>{value || placeholder}</ScaledText>
                <Icon name="chevron_down" color={isDark ? Colors.dark.secondary_lighter : Colors.light.text} size={getScaleFactor() * 20} />
            </TouchableOpacity>

            {expanded && (
                <>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={{ ...spacing.p(0) }} className="absolute inset-0" />
                    </TouchableWithoutFeedback>

                    <View style={[{ position: 'absolute', top: buttonHeight + 2, left: 0, right: 0, zIndex: 10, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.borderRadius(12), ...spacing.borderWidth(0.5), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.white, ...spacing.p(16), ...spacing.maxHeight(208), },]} >
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ ...spacing.py(4) }}
                                    activeOpacity={0.8}
                                    onPress={() => onSelect(item)}
                                >
                                    <ScaledText size="base">{item.label}</ScaledText>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </>
            )}
        </View>
    );
}