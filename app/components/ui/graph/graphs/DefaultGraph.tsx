import { useState } from "react";
import { View } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";
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
        <View onLayout={onLayout} className={`${className}`}>
            <LineChart
                data={[{ value: 15, label: 'Led' }, { value: 30, label: 'Únr' }, { value: 26, label: 'Bře' }, { value: 40, label: 'Dub' }]}
                initialSpacing={15}
                spacing={95}
                adjustToWidth
                hideDataPoints
                hideRules
                lineGradient
                yAxisLabelContainerStyle={{ color: "#fff" }}
                yAxisTextStyle={{
                    color: "#fff"
                }}
                xAxisLabelTextStyle={{
                    color: "#fff"
                }}
                lineGradientId="ggrd"
                lineGradientComponent={() => {
                    return (
                        <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={'#bbb'} />
                            <Stop offset="1" stopColor={'#fff'} />
                        </LinearGradient>
                    );
                }}
                yAxisColor="#fff"
                showVerticalLines
                verticalLinesColor="#fff"
                xAxisColor="#fff"
                curveType={CurveType.QUADRATIC}
                curvature={1}
                color="#fff"
            />
        </View>
    )
}