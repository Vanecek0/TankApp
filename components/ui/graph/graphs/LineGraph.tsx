import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart, CurveType, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Stop } from "react-native-svg";

export default function LineGraph({ className }: {
    className?: string;
    data?: JSON;
}) {

    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

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


    /*const average =
        barData.reduce((sum, item) => sum + item.value, 0) / barData.length;*/

    return (
        <SafeAreaView onLayout={onLayout} style={{ maxHeight: parentWidth / 3, marginVertical: 15}} className={`items-center justify-center ${className}`}>
            <LineChart
                overflowTop={1}
                initialSpacing={10}
                parentWidth={parentWidth}
                adjustToWidth
                width={parentWidth - 20}
                height={parentWidth / 3}
                spacing={22}
                hideRules
                noOfSections={1}
                endSpacing={0}
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
                referenceLine1Config={{
                    color: '#fff',
                    dashWidth: 2,
                    dashGap: 3,
                }}
        

                showScrollIndicator={false}
                indicatorColor={"white"}
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