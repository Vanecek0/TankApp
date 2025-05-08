import { Button, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import ScaledText from "../../other/scaledText";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    const { toggleColorScheme, isDark } = useTheme();

    return (
        <View style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className={`${className} flex outline-none border-none py-3 px-5 gap-2 flex-row items-center justify-between`}>
            <View className="flex-row items-center gap-3">
                <ScaledText className='rounded-full p-3 w-10 h-10 text-center flex justify-center items-center aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='sm'>A</ScaledText>
                <ScaledText size="base" className="font-bold" isThemed={true}>Audi TT</ScaledText>
            </View>
            <View className="flex-row gap-2">
                <Link href={"/(tank)"} className="flex items-center"><Icon name="bell" color={Colors.inactive_icon} style={{ width: 28, height: 28 }} /></Link>
                <Link href={"/(tank)"} className="flex items-center"><Icon name="settings" color={Colors.inactive_icon} style={{ width: 28, height: 28 }} /></Link>
                <TouchableOpacity
                    onPress={toggleColorScheme}
                >
                    <Icon name={isDark ? "sun" : "moon"} color={Colors.inactive_icon} style={{ width: 28, height: 28 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}