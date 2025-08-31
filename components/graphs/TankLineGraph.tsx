import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import ScaledText from "@/components/common/ScaledText";
import { ThemeColors as Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import { Station } from "@/models/Station";
import { useTheme } from "@/theme/ThemeProvider";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { getMonthLabels } from "@/utils/dateLabels";
import { Tanking } from "@/models/Tanking";
import { tankingService } from "@/services/tankingService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loadCarFromStorage } from "@/store/slices/car.slice";

type TankLineGraphProps = {
    className?: string;
};

type TankingGroup = {
    month: string;
    tankings: (Tanking & { station?: Station })[];
};

const WEIGHT = 1;

const transformData = (tankings: TankingGroup[], weight: number) => {
    const monthLabels = getMonthLabels();

    return Array.from({ length: 12 }, (_, i) => {
        const entry = tankings.find(e => parseInt(e.month.slice(5), 10) === i + 1);

        const price_per_unit = entry?.tankings[0]?.price_per_unit ?? 0;
        const month = monthLabels[i];

        return {
            originalValue: price_per_unit,
            value: price_per_unit * weight,
            label: month.short,
            labelFull: month.full,
        };
    });
};

export default function TankLineGraph({ className }: TankLineGraphProps) {
    const { isDark } = useTheme();
    const [tankings, setTankings] = useState<TankingGroup[]>([]);
    const [parentWidth, setParentWidth] = useState(0);
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();

    const handleLayout = (event: any) => {
        setParentWidth(event.nativeEvent.layout.width);
    };

    useEffect(() => {
        dispatch(loadCarFromStorage());
    }, [dispatch]);

    const loadTankings = useCallback(async () => {
        try {
            const tankingsBadges = await tankingService.getGroupedTankingsByMonth(undefined, car?.id!);
            setTankings(tankingsBadges);
        } catch (error) {
            console.error("Chyba při načítání tankings:", error);
        }
    }, []);

    useEffect(() => {
        loadTankings();
    }, [loadTankings]);

    const data = transformData(tankings, WEIGHT);

    const xAxisLabelTextStyle = {
        color: isDark ? Colors.background.surface.light : Colors.background.surface.dark,
        fontSize: FontSizes.sm.size,
        ...spacing.height(25),
    };

    const yAxisTextStyle = {
        color: isDark ? Colors.background.surface.light : Colors.background.surface.dark,
        fontSize: FontSizes.sm.size,
    };

    return (
        <SafeAreaView
            onLayout={handleLayout}
            style={{ maxHeight: parentWidth / 3, ...spacing.my(15) }}
            className={`items-center justify-center ${className}`}
        >
            <LineChart
                data={data}
                parentWidth={parentWidth}
                width={parentWidth - 50}
                height={parentWidth / 3}
                spacing={40 * getScaleFactor()}
                initialSpacing={15 * getScaleFactor()}
                endSpacing={5 * getScaleFactor()}
                noOfSections={3}
                overflowBottom={1}
                overflowTop={1}
                thickness={4 * getScaleFactor()}
                dataPointsColor={Colors.base.primary}
                startFillColor1={Colors.base.primary}
                endFillColor1={Colors.base.primary}
                color1={Colors.base.primary}
                startOpacity={0.85}
                endOpacity={0}
                xAxisLabelTextStyle={xAxisLabelTextStyle}
                yAxisTextStyle={yAxisTextStyle}
                rulesColor={Colors.text.muted}
                yAxisThickness={0}
                xAxisThickness={0}
                adjustToWidth
                showScrollIndicator={false}
                indicatorColor="white"
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
                    pointerLabelComponent: (items: any) => (
                        <View
                            className="flex justify-center text-center"
                            style={{
                                backgroundColor: Colors.base.primary,
                                ...spacing.width(80),
                                ...spacing.height(64),
                                ...spacing.p(12),
                                ...spacing.borderRadius(8),
                            }}
                        >
                            <ScaledText size="sm" style={{ color: Colors.base.white }}>
                                {items[0].label}
                            </ScaledText>
                            <ScaledText size="sm" style={{ color: Colors.base.white, fontWeight: "bold" }}>
                                {items[0].value}
                            </ScaledText>
                        </View>
                    ),
                }}
            />
        </SafeAreaView>
    );
}