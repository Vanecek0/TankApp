import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTheme } from '@/theme/ThemeProvider';
import { Colors } from '@/constants/Colors';

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
                    borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary,
                }}
            >
                <Text style={{ color: isDark ? Colors.white : Colors.dark.text }}>
                    {field.value ? formatTime(new Date(field.value)) : 'Vyber čas'}
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                    mode="time"
                    focusable
                    design='material'
                    themeVariant={isDark ? 'dark' : 'light'}
                    value={initialDate}
                    is24Hour={true}
                    display="default"
                    onChange={(_, selectedDate) => {
                        setShow(false);
                        if (selectedDate) {
                            field.onChange(selectedDate.toISOString());
                        }
                    }}
                />
            )}
        </View>
    );
}