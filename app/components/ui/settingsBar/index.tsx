import { Button, Text, View } from "react-native";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    const { isDark } = useTheme();

    return (
        <View style={{backgroundColor: isDark ? Colors.dark.background : Colors.light.background}} className={`${className} flex outline-none border-none py-3 px-5 gap-2 flex-row items-center justify-end`}>
            <Link href={"/tank"} className="flex items-center"><Icon name="bell" color={isDark ? Colors.inactive_icon : Colors.primary} style={{width: 28, height: 28 }} /></Link>
            <Link href={"/tank"} className="flex items-center"><Icon name="settings" color={isDark ? Colors.inactive_icon : Colors.primary} style={{width: 28, height: 28 }} /></Link>
        </View>
    )
}