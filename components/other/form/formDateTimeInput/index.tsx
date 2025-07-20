import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTheme } from '@/theme/ThemeProvider';
import { Colors } from '@/constants/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FormDateTimeInput({ name, control, defaultValue }: any) {
    const { field } = useController({ name, control, defaultValue });
    const [show, setShow] = useState(false);
    const { isDark } = useTheme();

    const initialDate = field.value ? new Date(field.value) : new Date();

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

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
                <Text style={{
                    color: isDark ? Colors.white : Colors.dark.secondary
                }}>
                    {field.value ? formatTime(new Date(field.value)) : 'Vyber čas'}
                </Text>
            </Pressable>

            {show && (
                <DateTimePickerModal
                    mode="time"
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