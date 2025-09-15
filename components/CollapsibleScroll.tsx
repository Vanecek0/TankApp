import { useTheme } from "@/theme/ThemeProvider";
import React, { useEffect, useRef, useState } from "react";
import { ThemeColors as Colors } from "@/constants/Colors";
import { View, Animated, ScrollView, ScrollViewProps, FlatListProps } from "react-native";
import { spacing } from "@/utils/SizeScaling";

type CollapsibleScrollProps<T> = {
    header: (scrollY: Animated.Value) => React.ReactNode;
    children?: React.ReactNode;
    scrollProps?: ScrollViewProps | FlatListProps<T>;
    subHeader?: (scrollY: Animated.Value) => React.ReactNode;
    wrapper?: (content: React.ReactNode, scrollY: Animated.Value) => React.ReactNode;
    scrollComponent?: React.ComponentType<any>;
    scrollYValue?: Animated.Value;
};

const CollapsibleScroll = <T,>({
    header,
    children,
    scrollProps = {},
    subHeader,
    wrapper,
    scrollComponent: ScrollComponent = ScrollView,
    scrollYValue
}: CollapsibleScrollProps<T>) => {
    const scrollY = scrollYValue ?? useRef(new Animated.Value(0)).current;
    const [headerHeight, setHeaderHeight] = useState(0);
    const [subHeaderHeight, setSubHeaderHeight] = useState(0);
    const { isDark } = useTheme();

    const headerRef = useRef<View>(null);
    const subHeaderRef = useRef<View>(null);

    useEffect(() => {
        if (subHeaderRef.current) {
            subHeaderRef.current.measure((x, y, width, height) => {
                setSubHeaderHeight(height);
            });
        }

        if (headerRef.current) {
            headerRef.current.measure((x, y, width, height) => {
                setHeaderHeight(height);
            });
        }

    }, []);

    const scrollContent = (
        <ScrollComponent
            {...scrollProps}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={[
                { paddingTop: headerHeight + subHeaderHeight },
                (scrollProps as any).contentContainerStyle,
            ]}
        >
            {children}
        </ScrollComponent>
    );

    return (
        <View style={{ flex: 1 }}>
            {wrapper ? wrapper(scrollContent, scrollY) : scrollContent}
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    width: "100%",
                    zIndex: 10,
                    backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
                }}
            >
                <View ref={headerRef}>
                    {header(scrollY)}
                </View>
                {subHeader &&
                    <View ref={subHeaderRef} style={{backgroundColor: isDark ? Colors.background.dark : Colors.background.light}}>
                        {subHeader(scrollY)}
                    </View>
                }
            </View>
        </View>
    );
};

export default CollapsibleScroll;