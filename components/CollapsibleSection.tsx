import { useTheme } from "@/theme/ThemeProvider";
import React, { useRef, useState } from "react";
import { ThemeColors as Colors } from '@/constants/Colors';
import {
    View,
    Animated,
    ScrollView,
    FlatListProps,
    ScrollViewProps,
    LayoutChangeEvent,
} from "react-native";

const H_MAX_HEIGHT = 280;

type CollapsibleSectionProps<T> = {
    header: (scrollY: Animated.Value) => React.ReactNode;
    children?: React.ReactNode;
    scrollComponent?: React.ComponentType<any>;
    scrollProps?: ScrollViewProps | FlatListProps<T>;
    subHeader?: (scrollY: Animated.Value) => React.ReactNode;
    wrapper?: (content: React.ReactNode, scrollY: Animated.Value) => React.ReactNode;
};

const CollapsibleSection = <T,>({
    header,
    children,
    scrollComponent: ScrollComponent = ScrollView,
    scrollProps = {},
    subHeader,
    wrapper,
}: CollapsibleSectionProps<T>) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [subHeaderHeight, setSubHeaderHeight] = useState(0);
    const { isDark } = useTheme();

    const scrollContent = (
        <ScrollComponent
            {...scrollProps}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={[
                { paddingTop: H_MAX_HEIGHT + subHeaderHeight },
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
                    backgroundColor: isDark ? Colors.background.dark : Colors.background.light
                }}
            >
                {header(scrollY)}

                {subHeader && (
                    <View
                        style={{
                            position: "relative",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: isDark ? Colors.background.dark : Colors.background.light
                        }}
                        onLayout={(e: LayoutChangeEvent) =>
                            setSubHeaderHeight(e.nativeEvent.layout.height)
                        }
                    >
                        {subHeader(scrollY)}
                    </View>
                )}
            </View>
        </View>
    );
};

export default CollapsibleSection;