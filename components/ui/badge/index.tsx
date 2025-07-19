import { View, ViewStyle } from "react-native";
import ScaledText from "../../other/scaledText";
import type { FontSizeKey } from "../../other/scaledText";
import { spacing } from "@/utils/SizeScaling";
import darkenHexColor from "@/utils/colorDarken";
import contrastHexColor from "@/utils/colorContrast";
import { useTheme } from "@/theme/ThemeProvider";
import { Colors } from "@/constants/Colors";

export default function Badge({ className, textClassName, style, size = "base", value, badgeColor, textColor, isThemed }: {
    className?: string;
    textClassName?: string;
    size?: FontSizeKey;
    style?: ViewStyle;
    value: string;
    badgeColor?: string;
    textColor?: string;
    isThemed?: boolean;
}) {
    const { isDark } = useTheme();

    const themedColor = isThemed
        ? { color: isDark ? Colors.dark.text : Colors.light.text }
        : textColor != null ? { color: textColor } : {};



    return (
        <View style={style} className={`${className} items-baseline`}>
            <ScaledText className={`${textClassName} rounded-full font-bold`} style={[{ backgroundColor: badgeColor, color: contrastHexColor(badgeColor ?? "#ffffff"), ...spacing.px(8), ...spacing.py(4) }, themedColor]} size={size}>{value}</ScaledText>
        </View>
    )
}