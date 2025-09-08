import React, { Children, useRef } from "react";
import { View, Animated, Image, ScrollView, Text } from "react-native";
import Dashboard from "./dashboards";

const H_MAX_HEIGHT = 300;
const H_MIN_HEIGHT = 115;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const CollapsibleHeader = ({children}:any) => {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    });

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
                ])}
                scrollEventThrottle={16}
            >
                <View style={{ paddingTop: H_MAX_HEIGHT }}>
                    {children}
                </View>
            </ScrollView>


            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: headerScrollHeight,
                    width: "100%",
                    overflow: "hidden",
                    zIndex: 999,
                    padding: 0,
                }}
            >
                <Dashboard scrollRefVal={scrollOffsetY} />
            </Animated.View>
        </View>
    )
}

export default CollapsibleHeader;