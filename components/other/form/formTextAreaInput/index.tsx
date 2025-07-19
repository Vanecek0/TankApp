import { Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { useController } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

export default function FormTextArea({ name, control, placeholder, defaultValue, numberOfLines = 4, height = 70 }: any) {
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
                ...spacing.borderWidth(0.5),
                ...spacing.px(12),
                ...spacing.py(12),
                height,
                textAlignVertical: 'top',
                borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary,
                backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary,
                color: isDark ? Colors.dark.text : Colors.light.text,
            }}
            value={field.value !== undefined ? field.value : defaultValue}
            onChangeText={field.onChange}
        />
    );
}