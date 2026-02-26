import ScaledText from "@/components/common/ScaledText";
import { spacing } from "@/utils/SizeScaling";
import { View } from "react-native";

export function FormSection({
    title,
    icon,
    children,
}: {
    title?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <View style={{ ...spacing.gap(12), ...spacing.py(12) }}>
            {title && (
                <View className="flex-row items-center" style={{ ...spacing.gap(6) }}>
                    {icon}
                    <ScaledText size="lg" className="font-bold" isThemed>
                        {title}
                    </ScaledText>
                </View>
            )}
            {children}
        </View>
    );
}