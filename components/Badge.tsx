import { TextStyle, View, ViewStyle } from "react-native";
import ScaledText from "./common/ScaledText";
import type { FontSizeKey } from "./common/ScaledText";
import { spacing } from "@/utils/SizeScaling";
import contrastHexColor from "@/utils/colorContrast";
import { useTheme } from "@/theme/ThemeProvider";
import { ThemeColors as Colors } from "@/constants/Colors";

export default function Badge({ className, textClassName, style, size = "base", value, badgeColor = "#ffffff", textColor, isThemed, isCheckable = false, isChecked = false }: {
    className?: string;
    textClassName?: string;
    size?: FontSizeKey;
    style?: TextStyle;
    value: string;
    badgeColor?: string;
    textColor?: string;
    isThemed?: boolean;
    isCheckable?: boolean;
    isChecked?: boolean;
}) {
    const { isDark } = useTheme();

    const themedColor = {
        color:
            isThemed
                ? isDark
                    ? isCheckable && !isChecked
                        ? Colors.text.secondary
                        : Colors.text.primary_dark
                    : isCheckable && !isChecked
                        ? Colors.text.muted
                        : contrastHexColor(badgeColor)
                : textColor ?? undefined,
    };

    return (
        <View className={`${className} items-baseline`}>
            <ScaledText
                className={`${textClassName} font-bold`}
                size={size}
                style={
                    [
                        {
                            backgroundColor: badgeColor,
                            color: contrastHexColor(badgeColor),
                            ...spacing.px(8),
                            ...spacing.py(4)
                        },
                        [themedColor, style]
                    ]}
            >
                {value}
            </ScaledText>
        </View>
    )
}