import { View, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";

export default function Tabs({ className, style, children }: {
    className?: string;
    children?: React.ReactNode;
    style?: ViewStyle;
}) {
    const { isDark } = useTheme();
    const childrenArray = React.Children.toArray(children) as ReactElement[];
    const styledTabs = childrenArray.map((child, index) => {
        if (isValidElement(child)) {
            const element = child as ReactElement<{ className?: string }>;
            const existingClass = element.props.className ?? "";
            return cloneElement(
                <View key={index} style={{backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8)}} className={`${existingClass}`}>
                    {element}
                </View>
            );
        }
        return child;
    });

    return (
        <View style={[{...spacing.gap(12), ...spacing.borderRadius(12)}, style]} className={`${className}`}>
            {styledTabs}
        </View>
    )
}