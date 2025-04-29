import { Button, Text, View } from "react-native";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    return (
        <View className={`${className} flex gap-2 flex-row items-end justify-end`}>
            <Link href={"/tank"}><Icon name="bell" color={Colors.primary} style={{width: 24, height: 24 }} /></Link>
            <Link href={"/tank"}><Icon name="settings" color={Colors.primary} style={{width: 24, height: 24 }} /></Link>
        </View>
    )
}