import { Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { useController } from "react-hook-form";
import { TextInput } from "react-native";

export default function FormNumberInput({ name, control, placeholder, defaultValue, onBlur }: any) {
    const { isDark } = useTheme();

    const { field } = useController({
        control,
        defaultValue: '',
        name,
    })

    const handleChange = (text: string) => {
        let cleaned = text.replace(',', '.');

        if (/^\d*\.?\d*$/.test(cleaned)) {
            field.onChange(cleaned);
        }
    };

    return (
        <TextInput keyboardType="decimal-pad" placeholder={placeholder} placeholderTextColor={isDark ? Colors.dark.secondary_lighter : Colors.light.text} style={{ ...spacing.borderRadius(12), ...spacing.borderWidth(0.5), ...spacing.px(12), ...spacing.py(12), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary, color: isDark ? Colors.dark.text : Colors.light.text }} value={field.value}
            onBlur={() => {
                field.onBlur();
                if (onBlur) onBlur();
            }} onChangeText={handleChange} />
    )
}