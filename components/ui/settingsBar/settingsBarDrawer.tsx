import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native";
import ScaledText from "@/components/other/scaledText";
import { Link } from "expo-router";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useTheme } from "@/theme/ThemeProvider";
import { useCar } from "@/context/carContext";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { ModalProvider, useModal } from "@/providers/modalProvider";
import AboutAppModal from "@/components/modal/aboutAppModal";
import StationsModal from "@/components/modal/stationsModal";

export default function SettingsBarDrawer({ ...props }) {

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ marginHorizontal: getScaleFactor() * -12, flexGrow: 1 }}>
            <ModalProvider>
                <TestDrawerContent></TestDrawerContent>
            </ModalProvider>
        </DrawerContentScrollView>
    );
}

function TestDrawerContent() {
    const { isDark } = useTheme();
    const { car } = useCar();
    const { showModal } = useModal();

    return (
        <>
            <View className="border-b-[1px] flex-row justify-between" style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, marginHorizontal: getScaleFactor() * 16, ...spacing.mb(16), ...spacing.py(16) }}>
                <View style={{ ...spacing.gap(12) }} className="flex-row items-center">
                    <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(70), ...spacing.height(70) }} size='xl'>{car?.car_nickname.slice(0, 2).toUpperCase()}</ScaledText>
                    <View>
                        <ScaledText size="xl" className="font-bold" isThemed={true}>{car?.car_nickname}</ScaledText>
                        <ScaledText size="base" className="font-medium" style={{ color: Colors.inactive_icon }}>{car?.manufacturer} {car?.model}</ScaledText>
                    </View>
                </View>
                <View className="justify-center">
                    <Link href={"/tank"}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="users" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                        </View>
                    </Link>
                </View>
            </View>
            <View className="flex-1 flex-col justify-between">
                <View style={{ ...spacing.gap(8), marginHorizontal: getScaleFactor() * 16 }} >
                    <View style={{ ...spacing.gap(8) }}>
                        <ScaledText size="lg" style={{ color: Colors.inactive_icon, ...spacing.mb(6) }} className="font-bold uppercase" isThemed={true}>Aktuální vozidlo</ScaledText>
                        <Link href={"/(tabs)/service"} style={{ ...spacing.py(6) }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                                <Icon name="car_repair" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Servis</ScaledText>
                            </View>
                        </Link>
                        <View onTouchEnd={() => {showModal(<StationsModal/>)}} className="flex-row" style={{ ...spacing.py(6) }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                                <Icon name="map_pin" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(5) }} className="justify-center">
                                <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Stanice</ScaledText>
                            </View>
                        </View>
                        <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                                <Icon name="document" color={Colors.inactive_icon} size={getScaleFactor() * 30} />
                            </View>
                            <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Dokumenty vozidla</ScaledText>
                            </View>
                        </Link>
                    </View>
                </View>

                <View className="border-t-[1px]" style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, marginHorizontal: getScaleFactor() * 16, marginVertical: getScaleFactor() * 12, paddingVertical: getScaleFactor() * 16 }} >
                    <ScaledText size="lg" style={{ color: Colors.inactive_icon, ...spacing.mb(6) }} className="font-bold uppercase" isThemed={true}>Aplikace</ScaledText>
                    <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="palette" color={Colors.inactive_icon} size={getScaleFactor() * 30} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Vzhled</ScaledText>
                        </View>
                    </Link>
                    <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="settings" color={Colors.inactive_icon} size={getScaleFactor() * 35} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Nastavení</ScaledText>
                        </View>
                    </Link>
                    <View onTouchEnd={() => {showModal(<AboutAppModal/>)}} className="flex-row" style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="info" color={Colors.inactive_icon} size={getScaleFactor() * 35} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="justify-center">
                            <ScaledText size='lg' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>O aplikaci</ScaledText>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}