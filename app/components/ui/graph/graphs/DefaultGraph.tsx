import { useState } from "react";
import { View } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";
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

    return (
        <SafeAreaView onLayout={onLayout} className={`flex-1 items-center justify-center ${className}`}>
            <LineChart
                data={[{ value: 15, label: 'Led' }, { value: 30, label: 'Únr' }, { value: 26, label: 'Bře' }, { value: 40, label: 'Dub' }]}
                hideDataPoints
                adjustToWidth
                initialSpacing={5}
                hideRules
                yAxisLabelContainerStyle={{ color: "#fff" }}
                yAxisTextStyle={{
                    color: "#fff"
                }}
                xAxisLabelTextStyle={{
                    color: "#fff"
                }}
                areaChart
                areaGradientId="ggrd"
                areaGradientComponent={() => {
                    return (
                        <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={'#d70537ff'} />
                            <Stop offset="1" stopColor={'#F50537'} />
                        </LinearGradient>
                    );
                }}
                yAxisColor="#fff"
                verticalLinesColor="#fff"
                xAxisColor="#fff"
                curveType={CurveType.QUADRATIC}
                curvature={1}
                color="#fff"
            />
        </SafeAreaView>
    )
}