import { ScrollView, TextStyle, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import ScaledText from '../scaledText';
import { useCallback, useState } from 'react';
import Icon from '@/components/ui/Icon';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';

type OptionItem = {
    value: string;
    label: string;
}

export type CustomButtonProps = TouchableOpacityProps & {
    placeholder?: string;
    defaultIndex?: number;
    data?: OptionItem[];
    dropdownStyle?: ViewStyle;
    dropdownTextStyle?: TextStyle;
    onChange: (item: OptionItem) => void;
    renderItem?: (item: OptionItem, isSelected: boolean) => React.ReactNode;
};

export default function Dropdown({
    placeholder,
    defaultIndex = 0,
    data = [],
    onChange,
    dropdownStyle,
    dropdownTextStyle,
    renderItem
}: CustomButtonProps) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);
    const [value, setValue] = useState(!placeholder ? data[defaultIndex].value : '');
    const [label, setLabel] = useState(!placeholder ? data[defaultIndex].label : '');
    const [buttonHeight, setButtonHeight] = useState(0);
    const { isDark } = useTheme();

    const onSelect = useCallback(
        (item: OptionItem) => {
            onChange(item);
            setValue(item.value);
            setLabel(item.label);
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
                    ...spacing.px(16),
                    ...spacing.py(11),
                    ...spacing.borderRadius(12)
                }, dropdownStyle]}
                className="flex-row items-center justify-between"
            >
                <ScaledText
                    size="base"
                    style={[{ color: isDark ? Colors.white : Colors.light.text }, dropdownTextStyle]}>
                    {label || placeholder}
                </ScaledText>
                <Icon
                    name="chevron_down"
                    color={isDark ? Colors.dark.secondary_lighter : Colors.light.text}
                    size={getScaleFactor() * 20}
                />
            </TouchableOpacity>

            {expanded && (
                <>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={{ ...spacing.p(0) }} className="absolute inset-0" />
                    </TouchableWithoutFeedback>

                    <View style={[{
                        position: 'absolute',
                        top: buttonHeight + 2,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white,
                        ...spacing.borderRadius(12),
                        ...spacing.borderWidth(1),
                        borderColor: isDark ? Colors.dark.secondary_lighter : Colors.white,
                        ...spacing.maxHeight(280)
                    }]}>
                        <ScrollView>
                            {data.map((item) => {
                                const isSelected = value === item.value;
                                return (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={{ ...spacing.p(0), ...spacing.m(0) }}
                                        activeOpacity={0.8}
                                        onPress={() => onSelect(item)}
                                    >
                                        {renderItem ? (
                                            renderItem(item, isSelected)
                                        ) : (
                                            <ScaledText
                                                size="base"
                                                style={{
                                                    ...spacing.p(8),
                                                    ...spacing.borderRadius(8),
                                                    color: isDark ? Colors.white : '',
                                                    backgroundColor: isSelected ? Colors.dark.secondary_lighter : ''
                                                }}
                                            >
                                                {item.label}
                                            </ScaledText>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
}