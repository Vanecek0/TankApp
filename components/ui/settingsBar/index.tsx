import { TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { Link, useNavigation } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import ScaledText from "../../other/scaledText";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useCar } from "@/context/carContext";
import { DrawerActions } from "@react-navigation/native";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    const { toggleColorScheme, isDark } = useTheme();
    const { car } = useCar();
    const nav = useNavigation();

    return (
        <View style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, ...spacing.py(12), ...spacing.px(20), ...spacing.gap(8)}} className={`${className} flex outline-none border-none flex-row items-center justify-between`}>
            <View onTouchStart={() => {nav.dispatch(DrawerActions.openDrawer())}} style={{...spacing.gap(12)}} className="flex-row items-center">
                <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(40), ...spacing.height(40) }} size='sm'>{car?.car_nickname.slice(0, 2).toUpperCase()}</ScaledText>
                <ScaledText size="base" className="font-bold" isThemed={true}>{car?.car_nickname}</ScaledText>
            </View>
            <View style={{...spacing.gap(8)}} className="flex-row">
                <Link href={"/tank"} className="flex items-center"><Icon name="bell" color={Colors.inactive_icon} size={getScaleFactor()*30} /></Link>
                <Link href={"/tank"} className="flex items-center"><Icon name="settings" color={Colors.inactive_icon} size={getScaleFactor()*30} /></Link>
                <TouchableOpacity onPress={toggleColorScheme}>
                    <Icon name={isDark ? "sun" : "moon"} color={Colors.inactive_icon} size={getScaleFactor()*30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}