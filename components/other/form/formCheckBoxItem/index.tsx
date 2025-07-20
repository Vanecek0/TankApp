import { useController } from "react-hook-form";
import { Pressable, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";

type FormCheckboxItemProps = {
    name: string;
    control: any;
    value: string | number;
    label?: string;
    render?: (checked: boolean) => React.ReactNode;
    onChange?: (checked: boolean, newValues: (string | number)[]) => void; // <- přidaný prop
};

export default function FormCheckboxItem({
    name,
    control,
    value,
    label,
    render,
    onChange, // <- destructure
}: FormCheckboxItemProps) {
    const { isDark } = useTheme();

    const { field } = useController({
        name,
        control,
        defaultValue: [],
    });

    const isChecked = field.value?.includes(value);

    const toggle = () => {
        const newValue = isChecked
            ? field.value.filter((v: any) => v !== value)
            : [...field.value, value];

        field.onChange(newValue);
        onChange?.(!isChecked, newValue); // <- zavolá se callback, pokud byl předán
    };

    return (
        <Pressable
            onPress={toggle}
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {render ? (
                render(isChecked)
            ) : (
                <Text
                    style={{
                        color: isDark ? Colors.white : Colors.dark.text,
                    }}
                >
                    {label ?? value}
                </Text>
            )}
        </Pressable>
    );
}
