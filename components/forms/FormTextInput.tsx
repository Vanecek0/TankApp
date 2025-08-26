import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { useController } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

export default function FormTextInput({ name, control, fieldHeight = 46, placeholder, defaultValue }: any) {
    const { isDark } = useTheme();

    const { field } = useController({
        control,
        defaultValue: defaultValue ?? '',
        name,
    })

    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={isDark ? Colors.text.secondary : Colors.text.primary}
            style={{
                ...spacing.borderRadius(12),
                ...spacing.borderWidth(1),
                ...spacing.px(12),
                ...spacing.py(12),
                ...spacing.height(fieldHeight),
                borderColor: isDark ? Colors.text.secondary : Colors.text.muted,
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                color: isDark ? Colors.text.primary : Colors.text.primary_dark
            }}
            value={field.value !== undefined ? field.value : defaultValue}
            onChangeText={field.onChange} />
    )
}