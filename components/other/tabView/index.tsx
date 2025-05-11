import { ReactNode, useState } from 'react';
import { ScrollView, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import ScaledText from '../scaledText';

export type TabItem = {
    key: string;
    title: string;
    content: ReactNode;
};

type TabViewProps = {
    tabs: TabItem[];
    initialTabKey?: string;
    header?: (tabs: JSX.Element[]) => ReactNode;
    className?: string;
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    tabContainerStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<TextStyle>;
    activeTabTextStyle?: StyleProp<TextStyle>;
};

export default function TabView({ tabs, initialTabKey, header, className, containerStyle, contentStyle, tabContainerStyle, tabStyle, activeTabStyle, activeTabTextStyle, tabTextStyle }: TabViewProps) {
    const defaultKey = initialTabKey || tabs[0]?.key;
    const [activeKey, setActiveKey] = useState(() => initialTabKey || tabs[0]?.key);
    const activeTab = tabs.find(tab => tab.key === activeKey);

    const tabButtons = tabs.map(tab => {
        const isActive = tab.key === activeKey;
        return (
            <TouchableOpacity style={[{width: "50%"},tabStyle, isActive ? activeTabStyle : {} ]} key={tab.key} onPress={() => setActiveKey(tab.key)}>
                <ScaledText size='base' style={[{ fontWeight: isActive ? 'bold' : 'normal' }, tabTextStyle, isActive ? activeTabTextStyle : {} ]}>
                    {tab.title}
                </ScaledText>
            </TouchableOpacity>
        );
    });

    return (
        <View style={containerStyle} className={className}>
            {header ? header(tabButtons) : <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: "row" }} style={tabContainerStyle}>{tabButtons}</ScrollView>}
            <View style={contentStyle}>{activeTab?.content}</View>
        </View>
    );
}