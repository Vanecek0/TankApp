import { useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { useEffect } from "react";
import ScaledText from "../common/ScaledText";
import Icon from "../Icon";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";

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
                paddingVertical: 4,
            }}
        >
            {render ? (
                render(isChecked)
            ) : (
                <>
                    {/* Default fallback checkbox */}
                    <View
                    className="justify-center items-center"
                        style={{
                            ...spacing.width(20),
                            ...spacing.height(20),
                            ...spacing.borderWidth(isChecked ? 0 : 1),
                            ...spacing.borderRadius(4),
                            borderColor: isDark ? Colors.border.secondary_dark : Colors.border.secondary,
                            backgroundColor: isChecked
                                ? (Colors.base.primary)
                                : "transparent",
                            ...spacing.me(8),
                        }}
                    >
                        {isChecked && (
                            <ScaledText color={Colors.base.white} size="xs">
                                <Icon name='check' color={Colors.base.white} size={getScaleFactor() * 16} />
                            </ScaledText>
                        )}
                    </View>

                    {(label || value) && (
                        <ScaledText
                            isThemed
                            size="base"
                        >
                            {label ?? value}
                        </ScaledText>
                    )}
                </>
            )}
        </Pressable>
    );
}
