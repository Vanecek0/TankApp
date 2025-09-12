import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { View, ViewStyle } from "react-native";

export default function Card({ children, className, style }: { children: React.ReactNode, className?: string, style?: ViewStyle }) {
    const { isDark } = useTheme();
    return (
        <View
            style={[{
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                ...spacing.p(20),
                ...spacing.borderRadius(8),
            }, style]}
            className={className}
        >
            {children}
        </View>
    );
};