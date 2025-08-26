import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { View } from "react-native";

export default function Card({ children, className }: { children: React.ReactNode, className?: string  }) {
    const { isDark } = useTheme();
    return (
        <View
            style={{
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                ...spacing.p(20),
                ...spacing.mb(12),
                ...spacing.borderRadius(8),
            }}
            className={className}
        >
            {children}
        </View>
    );
};