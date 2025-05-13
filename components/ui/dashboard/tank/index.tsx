import { View } from "react-native";
import Graph from "../../graph/Graph";
import ScaledText from "@/components/other/scaledText";

export default function TankDashboard({ data, routePathName, className }: {
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
                    <ScaledText size="lg" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                </View>
                <View className="items-center">
                    <ScaledText size="3xl" className="text-white font-bold mb-1">389 km</ScaledText>
                    <ScaledText size="lg" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                </View>
            </View>
            {<Graph routePathName={routePathName} />}
        </View>
    )
}