import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { useController } from "react-hook-form";
import { TextInput } from "react-native";

export default function FormNumberInput({ name, control, fieldHeight = 46, placeholder, onBlur }: any) {
    const { isDark } = useTheme();

    const { field } = useController({
        control,
        defaultValue: 0,
        name,
    })

    const handleChange = (text: string) => {
        const cleaned = text.replace(',', '.');
        const num = parseFloat(cleaned);

        if (!isNaN(num)) {
            field.onChange(num);
        } else if (cleaned === '') {
            field.onChange(0);
        }
    };

    return (
        <TextInput
            keyboardType="decimal-pad"
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
                color: isDark ? Colors.text.primary_dark : Colors.text.primary
            }}
            value={String(field.value)}
            onBlur={() => {
                field.onBlur();
                if (onBlur) onBlur();
            }} onChangeText={handleChange} />
    )
}