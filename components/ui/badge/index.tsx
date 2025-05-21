import { View } from "react-native";
import ScaledText from "../../other/scaledText";
import type { FontSizeKey } from "../../other/scaledText";

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
            <ScaledText className={`${textClassName} px-2 py-1 rounded-full`} style={[{backgroundColor: badgeColor, color: textColor}]} size={size}>{value}</ScaledText>
        </View>
    )
}