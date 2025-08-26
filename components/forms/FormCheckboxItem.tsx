import { useController } from "react-hook-form";
import { Pressable, Text } from "react-native";
import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { useEffect } from "react";

type FormCheckboxItemProps = {
    name: string;
    control: any;
    value: string | number;
    defaultValue?: (string | number)[];
    label?: string;
    render?: (checked: boolean) => React.ReactNode;
    onChange?: (checked: boolean, newValues: (string | number)[]) => void;
};

export default function FormCheckboxItem({
    name,
    control,
    value,
    defaultValue = [],
    label,
    render,
    onChange,
}: FormCheckboxItemProps) {
    const { isDark } = useTheme();

    const { field } = useController({
        name,
        control,
        defaultValue: [],
    });

    const isChecked = field.value?.includes(value);

    useEffect(() => {
        if (
            Array.isArray(field.value) &&
            field.value.length === 0 &&
            defaultValue.length > 0
        ) {
            field.onChange(defaultValue);
        }
    }, []);

    const toggle = () => {
        const newValue = isChecked
            ? field.value.filter((v: any) => v !== value)
            : [...field.value, value];

        field.onChange(newValue);
        onChange?.(!isChecked, newValue);
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
                        color: isDark ? Colors.text.primary : Colors.text.primary_dark,
                    }}
                >
                    {label ?? value}
                </Text>
            )}
        </Pressable>
    );
}