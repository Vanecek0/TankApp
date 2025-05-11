import { Button, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import ScaledText from "../../other/scaledText";
import type { FontSizeKey } from "../../other/scaledText";
import { FontSizes } from "@/constants/FontSizes";
import { ReactNode } from "react";

export default function Badge({ className, size = "base", value, badgeColor, textColor }: {
    className?: string;
    size?: FontSizeKey;
    value: string;
    badgeColor?: string;
    textColor?: string;
}) {
    const { toggleColorScheme, isDark } = useTheme();

    return (
        <View className="items-baseline">
            <ScaledText className="px-2 py-1 rounded-full" style={[{backgroundColor: badgeColor, color: textColor}]} size={size}>{value}</ScaledText>
        </View>
    )
}