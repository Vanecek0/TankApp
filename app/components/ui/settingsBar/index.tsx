import { Text, View } from "react-native";
import Icon from "../Icon";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    return (
        <View className={`${className} flex flex-row items-end justify-end`}>
            <Icon name="home" color={"#000"} style={{width: 24, height: 24 }} />
            <Icon name="home" color={"#000"} style={{width: 24, height: 24 }} />
        </View>
    )
}