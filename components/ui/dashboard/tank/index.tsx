import { View } from "react-native";
import Graph from "../../graph/Graph";
import ScaledText from "@/components/other/scaledText";
import { spacing } from "@/utils/SizeScaling";
import { useDatabase } from "@/database/databaseContext";
import { useEffect, useState } from "react";
import { TankingModel } from "@/models/Tanking";

export default function TankDashboard({ routePathName, className }: {
    routePathName?: string;
    className?: string;
}) {
    const { tankingSums} = useDatabase();
    const [tankingSumsDate, setTankingSumsDate] = useState<({ month: string; total_price: number; total_mileage: number })[]>([])

    useEffect(() => {
        const getTankingSums = async() => {
            const tankingSums = await TankingModel.getPriceMileageSumByDate();
            setTankingSumsDate(tankingSums)
        }

        getTankingSums();
    },[])
    return (
        <View style={{ ...spacing.p(20), ...spacing.borderRadius(12) }} className={`${className} flex-col bg-primary`}>
            <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
            <View style={{ ...spacing.my(12) }} className="flex-row justify-between">
                <View className="items-center">
                    <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingSums?.total_price} kč</ScaledText>
                    <ScaledText size="lg" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                </View>
                <View className="items-center">
                    <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingSums?.total_mileage} km</ScaledText>
                    <ScaledText size="lg" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                </View>
            </View>
            <Graph data={tankingSumsDate} routePathName={routePathName} />
        </View>
    )
}