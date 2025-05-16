import { View } from "react-native";
import Graph from "../../graph/Graph";
import ScaledText from "@/components/other/scaledText";
import { Colors } from "@/constants/Colors";
import darkenHexColor from "@/utils/colorDarken";

export default function TankDashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {
    return (
        <View className={`${className} flex-col mx-5 p-5 rounded-xl`} style={{ backgroundColor: Colors.primary }}>
            <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
            <View className="flex-row justify-between mt-3 mb-3">
                <View className="items-center">
                    <ScaledText size="3xl" className="text-white font-bold">1546.80 Kč</ScaledText>
                    <View className="flex-row items-end gap-1 mb-1">
                        <ScaledText size="2xl" style={{ color: darkenHexColor(Colors.primary, -50) }}>●</ScaledText>
                        <ScaledText size="lg" style={{ color: darkenHexColor(Colors.primary, -150) }} className=" font-bold">Výdaje za palivo</ScaledText>
                    </View>
                </View>
                <View className="items-center">
                    <ScaledText size="3xl" className="text-white font-bold">389 km</ScaledText>
                    
                    <View className="flex-row items-end gap-1 mb-1">
                        <ScaledText size="2xl" style={{ color: "#fff" }}>●</ScaledText>
                        <ScaledText size="lg" style={{ color: darkenHexColor(Colors.primary, -150) }} className="font-bold">Vzdálenost</ScaledText>
                    </View>
                </View>
            </View>
            {<Graph routePathName={routePathName} />}
        </View>
    )
}