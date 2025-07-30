import { View } from "react-native";
import Graph from "../../graph/Graph";
import ScaledText from "@/components/other/scaledText";
import { spacing } from "@/utils/SizeScaling";
import { useEffect, useState } from "react";
import { TankingModel } from "@/models/Tanking";
import { TankingStatistics, TankingStatisticsModel } from "@/models/TankingStatistics";
import { useDatabase } from "@/database/databaseContext";

export default function TankDashboard({ routePathName, className }: {
    routePathName?: string;
    className?: string;
}) {
    const [tankingSumsDate, setTankingSumsDate] = useState<({ month: string; total_price: number; total_mileage: number })[]>([])
    const [tankingStatistics, setTankingStatistics] = useState<Omit<TankingStatistics, 'period'>>()
    const { db } = useDatabase();

    useEffect(() => {
        const getTankingSums = async () => {
            const tankingSums = await TankingModel.getPriceMileageSumByDate(db);
            setTankingSumsDate(tankingSums)
        }

        const getTankingStatistics = async () => {
            const tankingStatisticsDate = await TankingStatisticsModel.getSumOfMonthlyTankingStatsByDate();
            setTankingStatistics(tankingStatisticsDate)
        }

        getTankingStatistics();
        getTankingSums();

    }, [])
    return (
        <>
            <View style={{ ...spacing.p(20), ...spacing.borderRadius(12) }} className={`${className} flex-col bg-primary`}>
                <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
                <View style={{ ...spacing.my(12) }} className="flex-row justify-between">
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingStatistics?.total_price} kč</ScaledText>
                        <ScaledText size="lg" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                    </View>
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingStatistics?.total_mileage} km</ScaledText>
                        <ScaledText size="lg" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                    </View>
                </View>
                <Graph data={tankingSumsDate} routePathName={routePathName} />
            </View>
        </>

    )
}