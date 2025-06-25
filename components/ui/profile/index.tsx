import ScaledText from "@/components/other/scaledText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import { View } from "react-native";

export default function Profile() {
    const { toggleColorScheme, isDark } = useTheme();

    return (
        <View style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, ...spacing.py(12), ...spacing.px(20), ...spacing.gap(8)}} className={`flex outline-none border-none flex-row items-center justify-between`}>
            <View style={{...spacing.gap(12)}} className="flex-row items-center">
                <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(40), ...spacing.height(40) }} size='sm'>A</ScaledText>
                <ScaledText size="base" className="font-bold" isThemed={true}>Audi TT</ScaledText>
            </View>
        </View>
    )
}