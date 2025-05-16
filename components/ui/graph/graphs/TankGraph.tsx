import { Colors } from "@/constants/Colors";
import darkenHexColor from "@/utils/colorDarken";
import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart, CurveType, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Stop } from "react-native-svg";

export default function TankGraph({ className }: {
    className?: string;
    data?: JSON;
}) {

    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const [highlightedGroupIndex, setHighlightedGroupIndex] = useState<number | null>(null);


    const fuelWeight = 1;
    const distanceWeight = 2.66;

    const barData = [
        {
            originalValue: 4523,
            value: 4523 * fuelWeight,
            label: 'Led',
            labelFull: 'Leden',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 0,
        },
        {
            originalValue: 842,
            value: 842 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 0,
        },
        {
            originalValue: 4123,
            value: 4123 * fuelWeight,
            label: 'Únr',
            labelFull: 'Únor',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 1,
        },
        {
            originalValue: 712,
            value: 712 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 1,
        },
        {
            originalValue: 4951,
            value: 4951 * fuelWeight,
            label: 'Bře',
            labelFull: 'Březen',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 2,
        },
        {
            originalValue: 904,
            value: 904 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 2,
        },
        {
            originalValue: 6025,
            value: 6025 * fuelWeight,
            label: 'Dub',
            labelFull: 'Duben',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 3,
        },
        {
            originalValue: 1203,
            value: 1203 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 3,
        },
        {
            originalValue: 3087,
            value: 3087 * fuelWeight,
            label: 'Kvě',
            labelFull: 'Květen',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 4,
        },
        {
            originalValue: 698,
            value: 698 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 4,
        },
        {
            originalValue: 4396,
            value: 4396 * fuelWeight,
            label: 'Čer',
            labelFull: 'Červen',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 5,
        },

        {
            originalValue: 832,
            value: 832 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 5,
        },
        {
            originalValue: 5120,
            value: 5120 * fuelWeight,
            label: 'Čvc',
            labelFull: 'Červenec',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 6,
        },
        {
            originalValue: 1105,
            value: 1105 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 6,
        },
        {
            originalValue: 4783,
            value: 4783 * fuelWeight,
            label: 'Srp',
            labelFull: 'Srpen',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 7,
        },
        {
            originalValue: 973,
            value: 973 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 7,
        },
        {
            originalValue: 3902,
            value: 3902 * fuelWeight,
            label: 'Zář',
            labelFull: 'Září',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 8,
        },
        {
            originalValue: 852,
            value: 852 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 8,
        },
        {
            originalValue: 4308,
            value: 4308 * fuelWeight,
            label: 'Říj',
            labelFull: 'Říjen',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 9,
        },
        {
            originalValue: 790,
            value: 790 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 9,
        },
        {
            originalValue: 4021,
            value: 4021 * fuelWeight,
            label: 'Lis',
            labelFull: 'Listopad',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 10,
        },
        {
            originalValue: 865,
            value: 865 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 10,
        },
        {
            originalValue: 3897,
            value: 3897 * fuelWeight,
            label: 'Pro',
            labelFull: 'Prosinec',
            spacing: 2,
            frontColor: '',
            textColor: '#fff',
            groupIndex: 11,
        },
        {
            originalValue: 743,
            value: 743 * distanceWeight,
            frontColor: '#ffffff',
            textColor: '#000',
            groupIndex: 11,
        }
    ];


    const average =
        barData.reduce((sum, item) => sum + item.value, 0) / barData.length;

    return (
        <SafeAreaView onLayout={onLayout} style={{ maxHeight: parentWidth / 3, marginVertical: 15 }} className={`items-center justify-center ${className}`}>
            <BarChart
                data={barData.map(item => ({
                    ...item,
                    frontColor: highlightedGroupIndex === null ? item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}` : item.groupIndex === highlightedGroupIndex ? item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}` : item.frontColor == '' ? `${darkenHexColor(Colors.primary, -50)}` : `${item.frontColor}`,
                }))}
                overflowTop={1}
                initialSpacing={10}
                parentWidth={parentWidth}
                adjustToWidth
                width={parentWidth - 20}
                height={parentWidth / 3}
                spacing={22}
                barWidth={24}
                labelWidth={24 * 2}
                hideRules
                noOfSections={1}
                endSpacing={0}
                cappedBars
                capColor={'#fff'}
                capThickness={3}
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
                }}
                hideYAxisText={true}
                trimYAxisAtTop
                yAxisThickness={0}
                xAxisThickness={0}
                showReferenceLine1
                referenceLine1Position={average}
                referenceLine1Config={{
                    color: '#fff',
                    dashWidth: 2,
                    dashGap: 3,
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
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                                borderRadius: 4
                            }} key={index}>
                            <Text style={{ color: item.textColor }}>{item.originalValue}</Text>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    )
}