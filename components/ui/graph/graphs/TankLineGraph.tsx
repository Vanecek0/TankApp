import ScaledText from "@/components/other/scaledText";
import { Colors } from "@/constants/Colors";
import { FontSizes } from "@/constants/FontSizes";
import { useTheme } from "@/theme/ThemeProvider";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart, CurveType, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Stop } from "react-native-svg";

export default function TankLineGraph({ className }: {
    className?: string;
    data?: JSON;
}) {
    const { isDark } = useTheme();

    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const weight = 1;

    const data = [
        {
            originalValue: 34.2,
            value: 34.2 * weight,
            label: 'Led',
            labelFull: 'Leden',
        },
        {
            originalValue: 35.1,
            value: 35.1 * weight,
            label: 'Únr',
            labelFull: 'Únor',
        },
        {
            originalValue: 36.5,
            value: 36.5 * weight,
            label: 'Bře',
            labelFull: 'Březen',
        },
        {
            originalValue: 38.9,
            value: 38.9 * weight,
            label: 'Dub',
            labelFull: 'Duben',
        },
        {
            originalValue: 39.3,
            value: 39.3 * weight,
            label: 'Kvě',
            labelFull: 'Květen',
        },
        {
            originalValue: 39.8,
            value: 39.8 * weight,
            label: 'Čer',
            labelFull: 'Červen',
        },
        {
            originalValue: 41.2,
            value: 41.2 * weight,
            label: 'Čvc',
            labelFull: 'Červenec',
        },
        {
            originalValue: 40.7,
            value: 40.7 * weight,
            label: 'Srp',
            labelFull: 'Srpen',
        },
        {
            originalValue: 38.5,
            value: 38.5 * weight,
            label: 'Zář',
            labelFull: 'Září',
        },
        {
            originalValue: 37.1,
            value: 37.1 * weight,
            label: 'Říj',
            labelFull: 'Říjen',
        },
        {
            originalValue: 35.6,
            value: 35.6 * weight,
            label: 'Lis',
            labelFull: 'Listopad',
        },
        {
            originalValue: 34.8,
            value: 34.8 * weight,
            label: 'Pro',
            labelFull: 'Prosinec',
        },
    ];

    const barData = [
        {
            originalValue: 4523,
            value: 4523 * 1,
            label: 'Jan',
            spacing: 2,
            frontColor: '#FF4D00',
            textColor: '#fff',
            groupIndex: 0,
        },

    ];
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
                    color: isDark ? Colors.white : Colors.dark.secondary,
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
                    color: isDark ? Colors.white : Colors.dark.secondary,
                    innerWidth: 0,
                    outerWidth: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: FontSizes["sm"].size,
                }}
                rulesColor={Colors.inactive_icon}
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
                    pointerStripColor: isDark ? Colors.dark.text : Colors.light.text,
                    pointerStripWidth: 2 * getScaleFactor(),
                    strokeDashArray: [2, 5],
                    pointerColor: isDark ? Colors.dark.text : Colors.light.text,
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