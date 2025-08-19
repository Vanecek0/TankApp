import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTheme } from '@/theme/ThemeProvider';
import { Colors } from '@/constants/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ScaledText from '../../scaledText';

export default function FormDateTimeInput({ name, control, mode = "time", defaultValue }: any) {
    const { field } = useController({ name, control, defaultValue });
    const [show, setShow] = useState(false);
    const { isDark } = useTheme();

    const formatters: Record<string, (value: Date) => string> = {
        time: (value) =>
            value.toLocaleTimeString("cs-CZ", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        date: (value) =>
            value.toLocaleDateString("cs-CZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
        datetime: (value) =>
            value.toLocaleString("cs-CZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
    };

    const displayValue = field.value
        ? formatters[mode]?.(new Date(field.value)) ?? "Neznámý formát"
        : "Vyber čas";

    return (
        <View className='flex-1'>

            <Pressable
                onPress={() => setShow(true)}
                style={{
                    padding: 12,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: isDark ? Colors.dark.secondary_lighter : Colors.hidden_text,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary,
                }}
            >
                <ScaledText size='base' style={{
                    color: isDark ? Colors.white : Colors.dark.secondary
                }}>
                    {displayValue}
                </ScaledText>
            </Pressable>

            {show && (
                <DateTimePickerModal
                    mode={mode}
                    focusable
                    isDarkModeEnabled={isDark}
                    is24Hour={true}
                    isVisible={show}
                    display="default"
                    onConfirm={(selectedDate) => {
                        setShow(false);
                        if (selectedDate) {
                            field.onChange(selectedDate.toISOString());
                        }
                    }}
                    onCancel={() => setShow(false)}
                />
            )}
        </View>
    );
}