import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { spacing } from '@/utils/SizeScaling';
import ScaledText from '../common/ScaledText';

export default function FormDateTimeInput({ name, control, fieldHeight = 46, mode = "time", defaultValue }: any) {
    const { field } = useController({ name, control, defaultValue: defaultValue ?? '' });
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
        <View
            style={{
                flex: 1,
                ...spacing.height(fieldHeight)
            }}
        >
            <Pressable
                onPress={() => setShow(true)}
                style={{
                    ...spacing.p(12),
                    ...spacing.borderWidth(1),
                    ...spacing.borderRadius(12),
                    borderColor: isDark ? Colors.text.secondary : Colors.text.muted,
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                }}
            >
                <ScaledText
                    size='base'
                    style={{
                        color: isDark ? Colors.text.primary_dark : Colors.text.primary
                    }}
                >
                    {field.value !== undefined ? displayValue : defaultValue}
                    {
                        console.log(defaultValue)
                    }
                </ScaledText>
            </Pressable>

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
                        field.onChange(selectedDate.getTime());
                    }
                }}
                onCancel={() => setShow(false)}
            />
        </View>

    );
}