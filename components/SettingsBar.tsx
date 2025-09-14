import { TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import { ThemeColors as Colors } from "@/constants/Colors";
import { Link, useNavigation } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import ScaledText from "./common/ScaledText";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { loadCarFromStorage } from "@/store/slices/car.slice";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import darkenHexColor from "@/utils/colorDarken";

export default function SettingsBar({ className }: {
    className?: string;
}) {
    const { toggleColorScheme, isDark } = useTheme();
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();
    const nav = useNavigation();

    useEffect(() => {
        dispatch(loadCarFromStorage());
    }, [dispatch]);

    return (
        <LinearGradient
            colors={[Colors.base.primary, darkenHexColor(Colors.base.primary, -15)]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <SafeAreaView
                edges={["top", "left", "right"]}
                style={{
                    ...spacing.py(12),
                    ...spacing.px(20),
                    ...spacing.gap(8)
                }}
                className={`${className} flex outline-none border-none flex-row items-center justify-between`}>
                <View onTouchStart={() => { nav.dispatch(DrawerActions.openDrawer()) }} style={{ ...spacing.gap(12) }} className="flex-row items-center">
                    <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(40), ...spacing.height(40) }} size='sm'>{car?.car_nickname.slice(0, 2).toUpperCase()}</ScaledText>
                    <ScaledText size="lg" className="font-bold" style={{ color: Colors.base.white }}>{car?.car_nickname}</ScaledText>
                </View>
                <View style={{ ...spacing.gap(8) }} className="flex-row justify-center align-middle">
                    <Link href={"/tank"} className="flex items-center"><Icon name="bell" color={Colors.base.white} size={getScaleFactor() * 30} /></Link>
                    <TouchableOpacity onPress={toggleColorScheme}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name={isDark ? "sun" : "moon"} color={Colors.base.white} size={getScaleFactor() * 28} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>

    )
}