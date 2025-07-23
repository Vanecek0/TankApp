import { View, ViewStyle } from "react-native";
import ScaledText from "../../other/scaledText";
import type { FontSizeKey } from "../../other/scaledText";
import { spacing } from "@/utils/SizeScaling";
import darkenHexColor from "@/utils/colorDarken";
import contrastHexColor from "@/utils/colorContrast";
import { useTheme } from "@/theme/ThemeProvider";
import { Colors } from "@/constants/Colors";

export default function Badge({ className, textClassName, style, size = "base", value, badgeColor = "#ffffff", textColor, isThemed, isCheckable = false, isChecked = false }: {
    className?: string;
    textClassName?: string;
    size?: FontSizeKey;
    style?: ViewStyle;
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
                        ? Colors.dark.secondary_lighter
                        : Colors.dark.text
                    : isCheckable && !isChecked
                        ? Colors.hidden_text
                        : contrastHexColor(badgeColor)
                : textColor ?? undefined,
    };

    return (
        <View style={style} className={`${className} items-baseline`}>
            <ScaledText
                className={`${textClassName} font-bold`}
                size={size}
                style={
                    [
                        {
                            backgroundColor: badgeColor,
                            borderRadius: style?.borderRadius,
                            color: contrastHexColor(badgeColor),
                            ...spacing.px(8),
                            ...spacing.py(4)
                        },
                        themedColor
                    ]}
            >
                {value}
            </ScaledText>
        </View>
    )
}