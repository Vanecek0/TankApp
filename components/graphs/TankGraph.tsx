import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts";
import ScaledText from "@/components/common/ScaledText";
import { ThemeColors as Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import darkenHexColor from "@/utils/colorDarken";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { getMonthLabels } from "@/utils/dateLabels";

type TankGraphProps = {
    className?: string;
    data?: any[];
};

const FUEL_WEIGHT = 1;
const DISTANCE_WEIGHT = 2.66;

export default function TankGraph({ className, data }: TankGraphProps) {
    const [parentWidth, setParentWidth] = useState(0);
     const [parentHeight, setParentHeight] = useState(0);
    const [highlightedGroupIndex, setHighlightedGroupIndex] = useState<number | null>(null);

    const handleLayout = (event: any) => {
        setParentWidth(event.nativeEvent.layout.width);
        setParentHeight(event.nativeEvent.layout.height);
    };

    const transformToBarData = (tankData: any[]) => {
        const labels = getMonthLabels();

        return Array.from({ length: 12 }, (_, i) => {
            const entry = tankData?.find(e =>
                e?.month && parseInt(e.month.slice(5), 10) === i + 1
            );

            const total_price = entry?.total_price ?? 0;
            const total_mileage = entry?.total_mileage ?? 0;

            return [
                {
                    originalValue: total_price,
                    value: total_price * FUEL_WEIGHT,
                    label: labels[i].short,
                    labelFull: labels[i].full,
                    spacing: 2,
                    textColor: Colors.base.white,
                    groupIndex: i,
                },
                {
                    originalValue: total_mileage,
                    value: total_mileage * DISTANCE_WEIGHT,
                    frontColor: Colors.base.white,
                    textColor: Colors.base.black,
                    groupIndex: i,
                },
            ];
        }).flat();
    };

    if (!Array.isArray(data)) {
        return (
            <SafeAreaView
                style={{ maxHeight: parentWidth / 3, ...spacing.my(15), ...spacing.height(120) }}
                className={`items-center justify-center ${className}`}
            >
                <ScaledText size="sm" style={{ color: Colors.text.primary }}>
                    Načítání dat...
                </ScaledText>
            </SafeAreaView>
        );
    }

    const barData = transformToBarData(data);
    const validItems = barData.filter(item => item.originalValue > 0);
    const average =
        validItems.length > 0
            ? validItems.reduce((sum, item) => sum + item.value, 0) / validItems.length
            : 0;

    const chartData = barData.map(item => {
        const defaultColor = darkenHexColor(Colors.base.primary, -50);
        const baseColor = item.frontColor || defaultColor;

        return {
            ...item,
            frontColor:
                highlightedGroupIndex === null
                    ? baseColor
                    : item.groupIndex === highlightedGroupIndex
                        ? baseColor
                        : baseColor,
        };
    });

    return (
        <SafeAreaView
            onLayout={handleLayout}
            style={{ maxHeight: parentWidth / 3, ...spacing.my(15), ...spacing.height(120) }}
            className={`items-center justify-center ${className}`}
        >
            <BarChart
                data={chartData}
                parentWidth={parentWidth}
                width={parentWidth - 20 * getScaleFactor()}
                height={parentHeight}
                spacing={22 * getScaleFactor()}
                barWidth={24 * getScaleFactor()}
                labelWidth={(24 * 2) * getScaleFactor()}
                initialSpacing={10 * getScaleFactor()}
                overflowTop={1}
                adjustToWidth
                hideRules
                noOfSections={1}
                endSpacing={0}
                cappedBars
                capColor={Colors.base.white}
                capThickness={3 * getScaleFactor()}
                barBorderRadius={0}
                barBorderWidth={0}
                xAxisLabelTextStyle={{
                    color: Colors.base.white,
                    fontSize: FontSizes.sm.size,
                    ...spacing.height(25),
                }}
                hideYAxisText
                trimYAxisAtTop
                yAxisThickness={0}
                xAxisThickness={0}
                showReferenceLine1
                referenceLine1Position={average}
                referenceLine1Config={{
                    color: Colors.base.white,
                    dashWidth: 2 * getScaleFactor(),
                    dashGap: 3 * getScaleFactor(),
                }}
                autoCenterTooltip
                focusBarOnPress={false}
                showScrollIndicator={false}
                indicatorColor="white"
                onPress={(item: any) => setHighlightedGroupIndex(item.groupIndex ?? null)}
                renderTooltip={(item: any, index: number) => (
                    <View
                        key={index}
                        style={{
                            backgroundColor: item.frontColor,
                            ...spacing.px(6),
                            ...spacing.py(4),
                            ...spacing.borderRadius(4),
                        }}
                    >
                        <ScaledText size="sm" style={{ color: item.textColor }}>
                            {item.originalValue}
                        </ScaledText>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}