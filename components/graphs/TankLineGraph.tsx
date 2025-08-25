import ScaledText from "@/components/common/ScaledText";
import { Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import { Station } from "@/models/Station";
import { Tanking, TankingModel } from "@/models/Tanking";
import { useTheme } from "@/theme/ThemeProvider";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart, CurveType, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TankLineGraph({ className }: {
    className?: string;
    data?: any[];
}) {
    const { isDark } = useTheme();
    const [tankings, setTankings] = useState<{
        month: string,
        tankings: (Tanking & {
            station?: Station,
        })[]
    }[]>([])
    const [parentWidth, setParentWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const loadTankings = useCallback(async () => {
        setIsLoading(true);
        try {
            const tankingsBadges = await TankingModel.getGroupedTankingsByMonth();
            setTankings(tankingsBadges);
        } catch (error) {
            console.error('Chyba při načítání tankings:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTankings();
    }, [loadTankings])

    const weight = 1;

    function transformData(
        tankingSums: any[],
        weight: number
    ) {
        const monthLabels = [
            { short: "Led", full: "Leden" },
            { short: "Únr", full: "Únor" },
            { short: "Bře", full: "Březen" },
            { short: "Dub", full: "Duben" },
            { short: "Kvě", full: "Květen" },
            { short: "Čer", full: "Červen" },
            { short: "Čvc", full: "Červenec" },
            { short: "Srp", full: "Srpen" },
            { short: "Zář", full: "Září" },
            { short: "Říj", full: "Říjen" },
            { short: "Lis", full: "Listopad" },
            { short: "Pro", full: "Prosinec" }
        ]

        const barData: any[] = []

        for (let i = 0; i < 12; i++) {
            const entry = tankingSums.find(e =>
                parseInt(e.month.slice(5), 10) === i + 1
            );

            const price_per_unit = entry?.price_per_unit ?? 0;
            const month = monthLabels[i];

            barData.push({
                originalValue: price_per_unit,
                value: price_per_unit * weight,
                label: month.short,
                labelFull: month.full
            });
        }
        return barData
    }

    const tankingsFlattened = tankings.flatMap(item =>
        item.tankings.map(tanking => ({
            ...tanking,
            month: item.month
        }))
    );
    const data = transformData(tankingsFlattened, weight)

    return (
        <SafeAreaView onLayout={onLayout} style={{ maxHeight: parentWidth / 3, ...spacing.my(15) }} className={`items-center justify-center ${className}`}>

            <LineChart
                overflowBottom={1}
                overflowTop={1}
                noOfSections={3}
                initialSpacing={15 * getScaleFactor()}
                endSpacing={5 * getScaleFactor()}
                spacing={40 * getScaleFactor()}
                data={data}
                thickness={4 * getScaleFactor()}
                dataPointsColor={Colors.primary}
                startFillColor1={Colors.primary}
                endFillColor1={Colors.primary}
                color1={Colors.primary}
                startOpacity={0.85}
                endOpacity={0}
                xAxisLabelTextStyle={{
                    color: isDark ? Colors.background.surface.light : Colors.background.surface.dark,
                    innerWidth: 0,
                    outerWidth: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: FontSizes["sm"].size,
                    ...spacing.height(25)
                }}
                yAxisTextStyle={{
                    color: isDark ? Colors.background.surface.light : Colors.background.surface.dark,
                    innerWidth: 0,
                    outerWidth: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: FontSizes["sm"].size,
                }}
                rulesColor={Colors.text.muted}
                adjustToWidth
                width={parentWidth - 50}
                height={parentWidth / 3}
                parentWidth={parentWidth}
                yAxisThickness={0}
                xAxisThickness={0}
                showScrollIndicator={false}
                indicatorColor={"white"}
                pointerConfig={{
                    pointerStripUptoDataPoint: true,
                    pointerStripColor: isDark ? Colors.text.primary_dark : Colors.text.primary,
                    pointerStripWidth: 2 * getScaleFactor(),
                    strokeDashArray: [2, 5],
                    pointerColor: isDark ? Colors.text.primary_dark : Colors.text.primary,
                    radius: 4 * getScaleFactor(),
                    pointerLabelWidth: 80 * getScaleFactor(),
                    pointerLabelHeight: 64 * getScaleFactor(),
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: (items: any) => {
                        return (
                            <View className="flex justify-center text-center"
                                style={{
                                    backgroundColor: Colors.primary,
                                    ...spacing.width(80),
                                    ...spacing.height(64),
                                    ...spacing.p(12),
                                    ...spacing.borderRadius(8)
                                }}>
                                <ScaledText size="sm" style={{ color: Colors.white }}>{items[0].label}</ScaledText>
                                <ScaledText size="sm" style={{ color: Colors.white, fontWeight: 'bold' }}>{items[0].value}</ScaledText>
                            </View>
                        );
                    },
                }}
            />

        </SafeAreaView>
    )
}