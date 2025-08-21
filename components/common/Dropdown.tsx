import { ScrollView, TextStyle, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import ScaledText from './ScaledText';
import { useCallback, useState } from 'react';
import Icon from '@/components/Icon';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';

type DropdownProps<T> = TouchableOpacityProps & {
    placeholder?: string;
    defaultIndex?: number;
    data?: T[];
    dropdownStyle?: ViewStyle;
    dropdownTextStyle?: TextStyle;
    onChange: (item: T) => void;
    renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
    getItemLabel?: (item: T) => string;
    getItemValue?: (item: T) => string;
};

export default function Dropdown<T>({
    placeholder,
    defaultIndex = 0,
    data = [],
    onChange,
    dropdownStyle,
    dropdownTextStyle,
    renderItem,
    getItemLabel = (item) => (item as any).label,
    getItemValue = (item) => (item as any).value
}: DropdownProps<T>) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);
    const [selectedItem, setSelectedItem] = useState<T | null>(
        !placeholder ? data[defaultIndex] : null
    );
    const [buttonHeight, setButtonHeight] = useState(0);
    const { isDark } = useTheme();

    const onSelect = useCallback(
        (item: T) => {
            onChange(item);
            setSelectedItem(item);
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
                    ...spacing.px(12),
                    ...spacing.py(11),
                    ...spacing.borderRadius(12),
                    ...spacing.borderWidth(1),
                    ...spacing.borderBottomRadius(expanded ? 0 : 12),
                    borderColor: isDark ? Colors.dark.secondary_lighter : Colors.inactive_icon,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary
                }, dropdownStyle]}
                className="flex-row items-center justify-between"
            >
                <ScaledText
                    size="base"
                    style={[{ color: isDark ? Colors.white : Colors.light.text }, dropdownTextStyle]}
                >
                    {selectedItem ? getItemLabel(selectedItem) : placeholder}
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
                        top: buttonHeight,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white,
                        ...spacing.borderRadius(12),
                        ...spacing.borderTopRadius(0), 
                        ...spacing.borderTopWidth(0),
                        ...spacing.borderWidth(1),
                        borderColor: Colors.hidden_text,
                        ...spacing.maxHeight(280)
                    }]}>
                        <ScrollView>
                            {data.length === 0 ? (
                                <ScaledText
                                    size="base"
                                    style={{
                                        ...spacing.p(8),
                                        textAlign: 'center',
                                        color: Colors.inactive_icon
                                    }}
                                >
                                    Žádné položky k dispozici
                                </ScaledText>
                            ) : (
                                data.map((item, index) => {
                                    const isSelected = selectedItem && getItemValue(item) === getItemValue(selectedItem);
                                    return (
                                        <TouchableOpacity
                                            key={getItemValue(item) ?? `item-${index}`}
                                            style={[{
                                                ...spacing.p(0),
                                                ...spacing.mx(0)},
                                                index !== data.length - 1 && { borderBottomWidth: 1, borderColor: Colors.inactive_icon }
                                            ]}
                                            activeOpacity={0.8}
                                            onPress={() => onSelect(item)}
                                        >
                                            {renderItem ? renderItem(item, isSelected!) : (
                                                <ScaledText
                                                    size="base"
                                                    style={{
                                                        ...spacing.p(8),
                                                        ...spacing.borderRadius(8),
                                                        color: isDark ? Colors.white : '',
                                                        backgroundColor: isSelected ? Colors.dark.secondary_lighter : ''
                                                    }}
                                                >
                                                    {getItemLabel(item)}
                                                </ScaledText>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })
                            )}
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
}