import { Text, View } from "react-native";

export default function Dashboard({ screen, className }: {
    screen?: Screen;
    className?: string;
}) {
    return (
        <View className={`${className} flex-col bg-primary`}>
            <Text className="text-center">Leden 2025 - Únor 2025</Text>
            <View className="flex-row justify-center gap-6">
                <View className="">
                    <Text>1546.80 Kč</Text>
                    <Text>Výdaje za palivo</Text>
                </View>
                <View>
                    <Text>389 km</Text>
                    <Text>Vzdálenost</Text>
                </View>
            </View>
            <View>
                <Text>Graf</Text>
            </View>
            <View>
                <Text>Audi TT</Text>
            </View>
        </View>
    )
}