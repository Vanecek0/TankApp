import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart, CurveType, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Stop } from "react-native-svg";

export default function DefaultGraph({ className }: {
    className?: string;
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
            label: 'Jan',
            spacing: 2,
            frontColor: '#FF4D00',
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
            label: 'Feb',
            spacing: 2,
            frontColor: '#FF4D00',
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
            label: 'Mar',
            spacing: 2,
            frontColor: '#FF4D00',
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
            label: 'Apr',
            spacing: 2,
            frontColor: '#FF4D00',
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
            label: 'May',
            spacing: 2,
            frontColor: '#FF4D00',
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
            label: 'Jun',
            spacing: 2,
            frontColor: '#FF4D00',
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
    ];


    const average =
        barData.reduce((sum, item) => sum + item.value, 0) / barData.length;

    return (
        <SafeAreaView onLayout={onLayout} style={{ maxHeight: parentWidth / 3, marginVertical: 15}} className={`items-center justify-center ${className}`}>
            <BarChart
                data={barData.map(item => ({
                    ...item,
                    frontColor: highlightedGroupIndex === null ? `${item.frontColor}6F` : item.groupIndex === highlightedGroupIndex ? `${item.frontColor}` : `${item.frontColor}6F`,
                    gradientColor: highlightedGroupIndex === null ? "#ffffff6F" : item.groupIndex === highlightedGroupIndex
                        ? "#ffffff9D"
                        : "#ffffff6F"
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
                capThickness={4}
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
                showGradient={true}
                autoCenterTooltip={true}
                focusBarOnPress={true}
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