import { Text, View } from "react-native";

export default function TankGraph({ className }: {
    className?: string;
}) {
    return (
        <View className={`${className}`}>
            <Text className="text-center text-white font-bold">Graf tank</Text>
        </View>
    )
}