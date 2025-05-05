import { Text, View } from "react-native";
import Graph from "../graph/Graph";
import Icon from "../Icon";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import React, { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useTheme } from "@/theme/ThemeProvider";

export default function Tabs({ className, children }: {
    className?: string;
    children?: React.ReactNode;
}) {
    const { isDark } = useTheme();
    const childrenArray = React.Children.toArray(children) as ReactElement[];
    const styledTabs = childrenArray.map((child, index) => {
        if (isValidElement(child)) {
            const element = child as ReactElement<{ className?: string }>;
            const existingClass = element.props.className ?? "";
            return cloneElement(
                <View key={index} style={{backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white}} className={`${existingClass} p-5 rounded-lg`}>
                    {element}
                </View>
            );
        }
        return child;
    });

    return (
        <View className={`${className} flex-col gap-3 rounded-xl`}>
            {styledTabs}
        </View>
    )
}