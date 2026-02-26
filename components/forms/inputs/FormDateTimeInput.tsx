import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { spacing } from '@/utils/SizeScaling';
import ScaledText from '../../common/ScaledText';

export default function FormDateTimeInput({ name, control, fieldHeight = 46, mode = "time", defaultValue }: any) {
    const { field } = useController({ name, control, defaultValue: defaultValue ?? '' });
    const [show, setShow] = useState(false);
    const { isDark } = useTheme();

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
                        field.onChange(selectedDate);
                    }
                }}
                onCancel={() => setShow(false)}
            />
        </View>

    );
}