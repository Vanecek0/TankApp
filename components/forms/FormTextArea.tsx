import { Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { useController } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

export default function FormTextArea({ name, control, placeholder, defaultValue, numberOfLines = 4, fieldHeight = 90 }: any) {
    const { isDark } = useTheme();

    const { field } = useController({
        control,
        defaultValue: defaultValue ?? '',
        name,
    });

    return (
        <TextInput
            multiline
            numberOfLines={numberOfLines}
            placeholder={placeholder}
            placeholderTextColor={isDark ? Colors.dark.secondary_lighter : Colors.light.text}
            style={{
                ...spacing.borderRadius(12),
                ...spacing.borderWidth(1),
                ...spacing.px(12),
                ...spacing.py(12),
                ...spacing.height(fieldHeight),
                textAlignVertical: 'top',
                borderColor: isDark ? Colors.dark.secondary_lighter : Colors.hidden_text,
                backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary,
                color: isDark ? Colors.white : Colors.dark.secondary,
            }}
            value={field.value !== undefined ? field.value : defaultValue}
            onChangeText={field.onChange}
        />
    );
}