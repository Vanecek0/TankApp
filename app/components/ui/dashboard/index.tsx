import { Text, View } from "react-native";
import Graph from "../graph/Graph";

export default function Dashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {
    return (
        <View className={`${className} flex-col bg-primary p-5 rounded-xl`}>
            <Text className="text-center text-white font-bold">Leden 2025 – Únor 2025</Text>
            <View className="flex-row justify-between my-3">
                <View className="items-center">
                    <Text className="text-white font-bold mb-1 text-3xl">1546.80 Kč</Text>
                    <Text className="text-primary_hidden font-bold">Výdaje za palivo</Text>
                </View>
                <View className="items-center">
                    <Text className="text-white font-bold mb-1 text-3xl">389 km</Text>
                    <Text className="text-primary_hidden font-bold">Vzdálenost</Text>
                </View>
            </View>
            <Graph routePathName={routePathName} />
            <View>
                <Text className="text-white font-bold text-center">Audi TT</Text>
            </View>
        </View>
    )
}