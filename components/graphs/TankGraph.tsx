import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, CurveType } from "react-native-gifted-charts";
import ScaledText from "@/components/common/ScaledText";
import { ThemeColors as Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import darkenHexColor from "@/utils/colorDarken";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { getMonthLabels } from "@/utils/dateLabels";
import { useTheme } from "@/theme/ThemeProvider";

type TankGraphProps = {
    className?: string;
    data?: any[];
};

const BAR_WIDTH = 32;
const BAR_COUNT = 1;

export default function TankGraph({ className, data }: TankGraphProps) {
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
    const [highlightedGroupIndex, setHighlightedGroupIndex] = useState<number | null>(null);
    const { isDark } = useTheme();

    const handleLayout = (event: any) => {
        setParentWidth(event.nativeEvent.layout.width);
        setParentHeight(event.nativeEvent.layout.height);
    };

    const priceTransformToBarData = (tankData: any[]) => {
        const labels = getMonthLabels();

        return Array.from({ length: 12 }, (_, i) => {
            const entry = tankData?.find(e =>
                e?.month && parseInt(e.month.slice(5), 10) === i + 1
            );

            const total_price = entry?.total_price ?? 0;

            return [
                {
                    value: total_price,
                    label: labels[i].short,
                    labelFull: labels[i].full,
                    textColor: Colors.base.white,
                    groupIndex: i,
                },

            ];
        }).flat();
    };

    const mileageTransformToBarData = (tankData: any[]) => {
        const labels = getMonthLabels();

        return Array.from({ length: 12 }, (_, i) => {
            const entry = tankData?.find(e =>
                e?.month && parseInt(e.month.slice(5), 10) === i + 1
            );

            const total_mileage = entry?.total_mileage ?? 0;

            return [
                {
                    value: total_mileage,
                    label: labels[i].short,
                    labelFull: labels[i].full,
                    textColor: Colors.base.white,
                    groupIndex: i,
                },
            ];
        }).flat();
    }

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

    const barData = priceTransformToBarData(data);
    const validItems = barData.filter(item => item.value > 0);
    const average =
        validItems.length > 0
            ? validItems.reduce((sum, item) => sum + item.value, 0) / validItems.length
            : 0;


    return (
        <SafeAreaView
            onLayout={handleLayout}
            style={{
                ...spacing.height(120),
            }}
            className={`items-center justify-center ${className}`}
        >
            <BarChart
                data={barData}
                parentWidth={parentWidth * getScaleFactor()}
                width={parentWidth - 22 * getScaleFactor()}
                height={parentHeight * getScaleFactor()}
                spacing={12 * getScaleFactor()}
                barWidth={BAR_WIDTH * BAR_COUNT * getScaleFactor()}
                labelWidth={BAR_WIDTH * getScaleFactor()}
                initialSpacing={20 * getScaleFactor()}
                overflowTop={1}
                adjustToWidth
                hideRules
                noOfSections={4}
                endSpacing={0}
                frontColor={Colors.base.primary}
                showGradient
                gradientColor={darkenHexColor(Colors.base.primary, -20)}
                showLine
                lineConfig={{
                    color: darkenHexColor(Colors.base.primary, -80),
                    thickness: 1,
                    curved: true,
                    curveType: CurveType.QUADRATIC,
                    curvature: 0.2,
                    hideDataPoints: true,
                    shiftY: -30,
                    initialSpacing: 20,
                    focusEnabled: false
                }}
                barBorderRadius={4}
                barBorderWidth={0}
                xAxisLabelTextStyle={{
                    color: isDark ? Colors.text.primary_dark : Colors.text.primary,
                    fontSize: FontSizes.sm.size,
                    ...spacing.height(25),
                }}
                hideYAxisText
                trimYAxisAtTop
                yAxisThickness={0}
                xAxisThickness={0}
                autoCenterTooltip
                focusBarOnPress={false}
                showScrollIndicator={false}
                indicatorColor="white"
            
                onPress={(item: any) => setHighlightedGroupIndex(item.groupIndex ?? null)}
                renderTooltip={(item: any, index: number) => (
                    <View
                        key={index}
                        style={{
                            backgroundColor: Colors.base.primary,
                            ...spacing.px(6),
                            ...spacing.py(4),
                            ...spacing.borderRadius(4),
                        }}
                    >
                        <ScaledText size="sm" style={{ color: item.textColor }}>
                            {item.value}
                        </ScaledText>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}