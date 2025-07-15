import { DrawerContentScrollView } from "@react-navigation/drawer";
import SettingsBar from ".";
import { Text, TouchableOpacity, View } from "react-native";
import ScaledText from "@/components/other/scaledText";
import { Link, useNavigation } from "expo-router";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useTheme } from "@/theme/ThemeProvider";
import { useCar } from "@/context/carContext";
import Icon from "../Icon";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

export default function SettingsBarDrawer({ ...props }) {

    const { toggleColorScheme, isDark } = useTheme();
    const { car } = useCar();
    const nav = useNavigation();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ marginHorizontal: getScaleFactor() * -12, flexGrow: 1 }}>
            <View style={{ marginHorizontal: getScaleFactor() * 16, ...spacing.my(16) }}>
                <View onTouchStart={() => { nav.dispatch(DrawerActions.openDrawer()) }} style={{ ...spacing.gap(12) }} className="flex-row items-center">
                    <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(70), ...spacing.height(70) }} size='xl'>{car?.car_nickname.slice(0, 2).toUpperCase()}</ScaledText>
                    <View>
                        <ScaledText size="xl" className="font-bold" isThemed={true}>{car?.car_nickname}</ScaledText>
                        <ScaledText size="sm" className="font-medium" style={{ color: Colors.inactive_icon }}>{car?.manufacturer} {car?.model}</ScaledText>
                    </View>
                </View>
            </View>
            <View className="flex-1 flex-col justify-between">
                <View style={{ ...spacing.gap(8), marginHorizontal: getScaleFactor() * 16, backgroundColor: "red" }} >

                </View>
                <View className="border-t-[1px]" style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, ...spacing.gap(24), marginHorizontal: getScaleFactor() * 16, marginVertical: getScaleFactor() * 12, paddingVertical: getScaleFactor() * 16 }} >
                    <Link href={"/tank"}>
                        <Icon name="users" color={Colors.inactive_icon} size={getScaleFactor() * 35} />
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Přepnout účty</ScaledText>
                        </View>
                    </Link>
                    <Link href={"/tank"}>
                        <Icon name="settings" color={Colors.inactive_icon} size={getScaleFactor() * 35} />
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Nastavení</ScaledText>
                        </View>
                    </Link>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}