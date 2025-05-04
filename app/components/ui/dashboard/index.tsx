import { Text, View } from "react-native";
import Graph from "../graph/Graph";
import Icon from "../Icon";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Dashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {
    return (
        <View className={`${className} flex-col mx-5 p-5 bg-primary rounded-xl`}>
            <Text className="text-center text-white font-bold">Leden 2025 – Únor 2025</Text>
            <View className="flex-row justify-between mt-3 mb-5">
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
            <View className="flex flex-row justify-center mt-2 items-center">
                <Link className="flex" href={"/tank"}><Icon name="chevron_left" color={Colors.white} style={{width: 24, height: 24 }} /></Link>
                <Text className="text-white flex font-bold text-center mt-0.5">Audi TT</Text>
                <Link className="flex" href={"/tank"}><Icon name="chevron_right" color={Colors.white} style={{width: 24, height: 24 }} /></Link>
            </View>
        </View>
    )
}