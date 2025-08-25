import ScaledText from "@/components/common/ScaledText";
import { Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import darkenHexColor from "@/utils/colorDarken";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TankGraph({ className, data }: {
    className?: string;
    data: any[];
}) {

    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const [highlightedGroupIndex, setHighlightedGroupIndex] = useState<number | null>(null);

    const fuelWeight = 1;
    const distanceWeight = 2.66;

    function transformToBarData(
        tankingSums: any[],
        fuelWeight: number,
        distanceWeight: number
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
            // OPRAVA: Přidána kontrola existence dat a vlastnosti month
            const entry = tankingSums?.find(e =>
                e && e.month && parseInt(e.month.slice(5), 10) === i + 1
            );

            const total_price = entry?.total_price ?? 0;
            const total_mileage = entry?.total_mileage ?? 0;

            barData.push({
                originalValue: total_price,
                value: total_price * fuelWeight,
                label: monthLabels[i].short,
                labelFull: monthLabels[i].full,
                spacing: 2,
                frontColor: '',
                textColor: '#fff',
                groupIndex: i
            });

            barData.push({
                originalValue: total_mileage,
                value: total_mileage * distanceWeight,
                frontColor: '#ffffff',
                textColor: '#000',
                groupIndex: i
            });
        }
        return barData
    }

    // OPRAVA: Kontrola existence dat před transformací
    if (!data || !Array.isArray(data)) {
        return (
            <SafeAreaView style={{ maxHeight: parentWidth / 3, ...spacing.my(15), ...spacing.height(120) }} className={`items-center justify-center ${className}`}>
                <ScaledText size="sm" style={{ color: Colors.text.primary }}>
                    Načítání dat...
                </ScaledText>
            </SafeAreaView>
        );
    }

    const barData = transformToBarData(data, fuelWeight, distanceWeight)

    const validItems = barData.filter(item => item.originalValue > 0);
    const average = validItems.length > 0 ? validItems.reduce((sum, item) => sum + item.value, 0) / validItems.length : 0;


    return (
        <SafeAreaView onLayout={onLayout} style={{ maxHeight: parentWidth / 3, ...spacing.my(15), ...spacing.height(120) }} className={`items-center h- justify-center ${className}`}>
            <BarChart
                data={barData.map(item => ({
                    ...item,
                    frontColor: highlightedGroupIndex === null ? item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}` : item.groupIndex === highlightedGroupIndex ? item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}` : item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}`,
                }))}
                overflowTop={1}
                initialSpacing={10 * getScaleFactor()}
                parentWidth={parentWidth}
                adjustToWidth
                width={parentWidth - (20 * getScaleFactor())}
                height={parentWidth / 3}
                spacing={22 * getScaleFactor()}
                barWidth={24 * getScaleFactor()}
                labelWidth={(24 * 2) * getScaleFactor()}
                hideRules
                noOfSections={1}
                endSpacing={0}
                cappedBars
                capColor={'#fff'}
                capThickness={3 * getScaleFactor()}
                barBorderRadius={0}
                barBorderWidth={0}
                xAxisLabelTextStyle={{
                    color: "#fff",
                    innerWidth: 0,
                    outerWidth: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: FontSizes["sm"].size,
                    ...spacing.height(25)
                }}
                hideYAxisText={true}
                trimYAxisAtTop
                yAxisThickness={0}
                xAxisThickness={0}
                showReferenceLine1
                referenceLine1Position={average}
                referenceLine1Config={{
                    color: '#fff',
                    dashWidth: 2 * getScaleFactor(),
                    dashGap: 3 * getScaleFactor(),
                }}
                autoCenterTooltip={true}
                focusBarOnPress={false}
                showScrollIndicator={false}
                indicatorColor={"white"}
                onPress={(item: any, index: number) => {
                    setHighlightedGroupIndex(item.groupIndex ?? null);
                }}
                renderTooltip={(item: any, index: number) => {
                    return (
                        <View
                            style={{
                                marginBottom: 0,
                                backgroundColor: item.frontColor,
                                ...spacing.px(6),
                                ...spacing.py(4),
                                ...spacing.borderRadius(4)
                            }} key={index}>
                            <ScaledText size="sm" style={{ color: item.textColor }}>{item.originalValue}</ScaledText>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    )
}