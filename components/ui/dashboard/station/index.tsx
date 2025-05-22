import { View } from "react-native";
import Graph from "../../graph/Graph";
import ScaledText from "@/components/other/scaledText";
import { spacing } from "@/utils/SizeScaling";

export default function StationDashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {
    return (
        <View style={{ ...spacing.mx(20), ...spacing.p(20), ...spacing.borderRadius(12) }} className={`${className} flex-col bg-primary`}>
            <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
            <View style={{ ...spacing.my(12) }} className="flex-row justify-between">
                <View className="items-center">
                    <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">1546.80 Kč</ScaledText>
                    <ScaledText size="lg" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                </View>
                <View className="items-center">
                    <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">389 km</ScaledText>
                    <ScaledText size="lg" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                </View>
            </View>
            <Graph routePathName={routePathName} />
        </View>
    )
}