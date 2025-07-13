import { View } from "react-native";
import ScaledText from "../../other/scaledText";
import type { FontSizeKey } from "../../other/scaledText";
import { spacing } from "@/utils/SizeScaling";
import darkenHexColor from "@/utils/colorDarken";
import contrastHexColor from "@/utils/colorContrast";

export default function Badge({ className, textClassName, size = "base", value, badgeColor, textColor }: {
    className?: string;
    textClassName?: string;
    size?: FontSizeKey;
    value: string;
    badgeColor?: string;
    textColor?: string;
}) {

    return (
        <View className={`${className} items-baseline`}>
            <ScaledText className={`${textClassName} rounded-full font-bold`} style={[{backgroundColor: badgeColor, color: contrastHexColor(badgeColor ?? "#ffffff"), ...spacing.px(8), ...spacing.py(4)}]} size={size}>{value}</ScaledText>
        </View>
    )
}