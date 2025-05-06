import { View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { Colors } from "@/constants/Colors";

export default function FloatingButton({ className, children }: {
    className?: string;
    children?: React.ReactNode;
}) {
    const { toggleColorScheme, isDark } = useTheme();

    return (
        <View style={{backgroundColor: Colors.primary}} className={`${className} absolute rounded-full p-6 m-6 bottom-0 right-0`}>
            {children}
        </View>
    )
}