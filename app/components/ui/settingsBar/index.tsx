import { Button, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    const { toggleColorScheme, isDark } = useTheme();

    return (
        <View style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className={`${className} flex outline-none border-none py-3 px-5 gap-2 flex-row items-center justify-end`}>
            <Link href={"/tank"} className="flex items-center"><Icon name="bell" color={Colors.inactive_icon} style={{ width: 28, height: 28 }} /></Link>
            <Link href={"/tank"} className="flex items-center"><Icon name="settings" color={Colors.inactive_icon} style={{ width: 28, height: 28 }} /></Link>
            <TouchableOpacity
                onPress={toggleColorScheme}
            >

                <Icon name={isDark ? "sun" : "moon"} color={Colors.inactive_icon} style={{ width: 28, height: 28 }} />
                
            </TouchableOpacity>
        </View>
    )
}