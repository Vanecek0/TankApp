import { Text, View } from "react-native";
import Graph from "../graph/Graph";
import Icon from "../Icon";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import ScaledText from "../../other/scaledText";

export default function Dashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {
    return (
        <View className={`${className} flex-col mx-5 p-5 bg-primary rounded-xl`}>
            <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
            <View className="flex-row justify-between mt-3 mb-3">
                <View className="items-center">
                    <ScaledText size="3xl" className="text-white font-bold mb-1">1546.80 Kč</ScaledText>
                    <ScaledText size="lg" className="text-primary_hidden font-bold">Výdaje za palivo</ScaledText>
                </View>
                <View className="items-center">
                    <ScaledText size="3xl" className="text-white font-bold mb-1">389 km</ScaledText>
                    <ScaledText size="lg" className="text-primary_hidden font-bold">Vzdálenost</ScaledText>
                </View>
            </View>
            <Graph routePathName={routePathName} />
            <View className="flex flex-row justify-center mt-2 items-center">
                <Link className="flex" href={"/tank"}><Icon name="chevron_left" color={Colors.white} style={{width: 28, height: 28 }} /></Link>
                <ScaledText size="lg" className="text-white flex font-bold text-center mt-0.5">Audi TT</ScaledText>
                <Link className="flex" href={"/tank"}><Icon name="chevron_right" color={Colors.white} style={{width: 28, height: 28 }} /></Link>
            </View>
        </View>
    )
}