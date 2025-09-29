import { useController } from "react-hook-form";
import { Pressable, View, ViewStyle } from "react-native";
import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { useEffect } from "react";
import ScaledText from "../common/ScaledText";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { spacing } from "@/utils/SizeScaling";

type FormToggleInputProps = {
    name: string;
    control: any;
    label?: string | React.ReactNode;
    labelPosition?: "left" | "right";
    style?: ViewStyle;
    onChange?: (checked: boolean) => void;
};

export default function FormToggleInput({
    name,
    control,
    label,
    labelPosition,
    style,
    onChange,
}: FormToggleInputProps) {
    const { isDark } = useTheme();

    const { field } = useController({
        name,
        control,
        defaultValue: false, // už jen boolean
    });

    const isChecked = !!field.value;
    const translateX = useSharedValue(isChecked ? 18 : 0);

    useEffect(() => {
        translateX.value = withTiming(isChecked ? 18 : 0, { duration: 200 });
    }, [isChecked]);

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const toggle = () => {
        const newValue = !isChecked;
        field.onChange(newValue);
        onChange?.(newValue);
    };

    return (
        <Pressable
            onPress={toggle}
            style={[{
                flexDirection: labelPosition === "left" ? "row-reverse" : "row",
                alignItems: "center",
            }, style]}
        >
            <View
                style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: isChecked
                        ? Colors.base.primary
                        : isDark
                            ? Colors.border.secondary_dark
                            : Colors.border.secondary,
                    justifyContent: "center",
                    paddingHorizontal: 2,
                    marginRight: 8,
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            backgroundColor: Colors.base.white,
                        },
                        thumbStyle,
                    ]}
                />
            </View>

            {(label) && (
                typeof label === "string" || typeof label === "number" ? (
                    <ScaledText
                        isThemed
                        size="base"
                        style={{
                            ...spacing.me(labelPosition === "left" ? 8 : 0),
                            ...spacing.ms(labelPosition === "right" ? 8 : 0),
                        }}
                    >
                        {label}
                    </ScaledText>
                ) : (
                    <View
                        style={{
                            ...spacing.me(labelPosition === "left" ? 8 : 0),
                            ...spacing.ms(labelPosition === "right" ? 8 : 0),
                        }}
                    >
                        {label}
                    </View>
                )
            )}
        </Pressable>
    );
}
