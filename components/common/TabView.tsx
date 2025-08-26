import { ReactNode, useState, useMemo } from "react";
import {
    ScrollView,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import ScaledText from "./ScaledText";

export type TabItem = {
    key: string;
    title: string;
    content: ReactNode;
};

type TabViewProps = {
    tabs: TabItem[];
    initialTabKey?: string;
    header?: (tabButtons: JSX.Element[]) => ReactNode;

    className?: string;
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    tabContainerStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<TextStyle>;
    activeTabTextStyle?: StyleProp<TextStyle>;
};
export default function TabView({
    tabs,
    initialTabKey,
    header,
    className,
    containerStyle,
    contentStyle,
    tabContainerStyle,
    tabStyle,
    activeTabStyle,
    tabTextStyle,
    activeTabTextStyle,
}: TabViewProps) {
    const [activeKey, setActiveKey] = useState(
        () => initialTabKey || tabs[0]?.key
    );

    const activeTab = useMemo(
        () => tabs.find((tab) => tab.key === activeKey),
        [tabs, activeKey]
    );

    const tabButtons = useMemo(
        () =>
            tabs.map((tab) => {
                const isActive = tab.key === activeKey;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            defaultStyles.tab,
                            tabStyle,
                            isActive && activeTabStyle,
                        ]}
                        onPress={() => setActiveKey(tab.key)}
                    >
                        <ScaledText
                            size="base"
                            style={[
                                defaultStyles.tabText,
                                tabTextStyle,
                                isActive && [defaultStyles.activeTabText, activeTabTextStyle],
                            ]}
                        >
                            {tab.title}
                        </ScaledText>
                    </TouchableOpacity>
                );
            }),
        [tabs, activeKey, tabStyle, activeTabStyle, tabTextStyle, activeTabTextStyle]
    );

    return (
        <View style={containerStyle} className={className}>
            {header ? (
                header(tabButtons)
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[defaultStyles.tabContainer, tabContainerStyle]}
                >
                    {tabButtons}
                </ScrollView>
            )}

            <View style={contentStyle}>{activeTab?.content}</View>
        </View>
    );
}

const defaultStyles = {
    tabContainer: {
        flexDirection: "row",
    } as ViewStyle,
    tab: {
        flex: 1,
        alignItems: "center",
        
    } as ViewStyle,
    tabText: {
        fontWeight: "normal",
    } as TextStyle,
    activeTabText: {
        fontWeight: "bold",
    } as TextStyle,
};