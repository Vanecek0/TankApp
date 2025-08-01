import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native";
import ScaledText from "@/components/other/scaledText";
import { Link, router, useNavigation, useRouter } from "expo-router";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useTheme } from "@/theme/ThemeProvider";
import { useCar } from "@/context/carContext";
import Icon from "../Icon";
import { Colors } from "@/constants/Colors";
import { ModalProvider, useModal } from "@/providers/modalProvider";
import AboutAppModal from "@/components/modal/aboutAppModal";
import StationsModal from "@/components/modal/stationsModal";
import { useSegments } from 'expo-router';

export default function SettingsBarDrawer({ ...props }) {

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ marginHorizontal: getScaleFactor() * -12, flexGrow: 1 }}>
            <ModalProvider>
                <TestDrawerContent></TestDrawerContent>
            </ModalProvider>
        </DrawerContentScrollView>
    );
}

const currentTabIndex = () => {
    const segments = useSegments();
    return segments.slice(1).join('/');
}

function TestDrawerContent() {
    const { isDark } = useTheme();
    const { car } = useCar();
    const { showModal } = useModal();

    return (
        <>
            <View className="border-b-[1px] flex-row justify-between" style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, marginHorizontal: getScaleFactor() * 16, ...spacing.mb(16), ...spacing.py(16) }}>
                <View style={{ ...spacing.gap(12) }} className="flex-row items-center">
                    <ScaledText className='rounded-full text-center flex justify-center items-center align-middle aspect-square' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.width(60), ...spacing.height(60) }} size='xl'>{car?.car_nickname.slice(0, 2).toUpperCase()}</ScaledText>
                    <View>
                        <ScaledText size="xl" className="font-bold" isThemed={true}>{car?.car_nickname}</ScaledText>
                        <ScaledText size="base" className="font-medium" style={{ color: Colors.inactive_icon }}>{car?.manufacturer} {car?.model}</ScaledText>
                    </View>
                </View>
                <View className="justify-center">
                    <Link href={"/tank"}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="users" color={Colors.inactive_icon} size={getScaleFactor() * 20} />
                        </View>
                    </Link>
                </View>
            </View>
            <View className="flex-1 flex-col justify-between">
                <View >
                    TODO
                    <View style={{ ...spacing.gap(8) }}>
                        <View style={{ ...spacing.gap(8), borderBottomWidth: 1 }}>
                            <Link
                                href="/home"
                                style={{
                                    ...spacing.py(8),
                                    ...spacing.px(16),
                                    backgroundColor:
                                        currentTabIndex() === "home"
                                            ? isDark
                                                ? Colors.dark.secondary_light
                                                : Colors.light.background
                                            : undefined,
                                }}
                            >
                                <View
                                    className="justify-center items-center"
                                    style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                                >
                                    <Icon
                                        name="home"
                                        color={currentTabIndex() === "home" ? Colors.white : Colors.inactive_icon}
                                        size={getScaleFactor() * 20}
                                    />
                                </View>
                                <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                    <ScaledText
                                        size="base"
                                        style={{ color: currentTabIndex() === "home" ? Colors.white : Colors.inactive_icon }}
                                        className="font-medium"
                                        isThemed={true}
                                    >
                                        Domů
                                    </ScaledText>
                                </View>
                            </Link>

                            <Link
                                href="/tank"
                                style={{
                                    ...spacing.py(8),
                                    ...spacing.px(16),
                                    backgroundColor:
                                        currentTabIndex() === "tank"
                                            ? isDark
                                                ? Colors.dark.secondary_light
                                                : Colors.light.background
                                            : undefined,
                                }}
                            >
                                <View
                                    className="justify-center items-center"
                                    style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                                >
                                    <Icon
                                        name="tank"
                                        color={currentTabIndex() === "tank" ? Colors.white : Colors.inactive_icon}
                                        size={getScaleFactor() * 20}
                                    />
                                </View>
                                <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                    <ScaledText
                                        size="base"
                                        style={{ color: currentTabIndex() === "tank" ? Colors.white : Colors.inactive_icon }}
                                        className="font-medium"
                                        isThemed={true}
                                    >
                                        Tankování
                                    </ScaledText>
                                </View>
                            </Link>

                            <Link
                                href="/(tabs)/service"
                                style={{
                                    ...spacing.py(8),
                                    ...spacing.px(16),
                                    backgroundColor:
                                        currentTabIndex() === "service"
                                            ? isDark
                                                ? Colors.dark.secondary_light
                                                : Colors.light.background
                                            : undefined,
                                }}
                            >
                                <View
                                    className="justify-center items-center"
                                    style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                                >
                                    <Icon
                                        name="car_repair"
                                        color={currentTabIndex() === "service" ? Colors.white : Colors.inactive_icon}
                                        size={getScaleFactor() * 20}
                                    />
                                </View>
                                <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                    <ScaledText
                                        size="base"
                                        style={{ color: currentTabIndex() === "service" ? Colors.white : Colors.inactive_icon }}
                                        className="font-medium"
                                        isThemed={true}
                                    >
                                        Servis
                                    </ScaledText>
                                </View>
                            </Link>
                        </View>
                        <View onTouchEnd={() => { showModal(StationsModal) }} className="flex-row" style={{ ...spacing.py(6) }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                                <Icon name="map_pin" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(5) }} className="justify-center">
                                <ScaledText size='base' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Stanice</ScaledText>
                            </View>
                        </View>
                        <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                                <Icon name="document" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                                <ScaledText size='base' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Dokumenty vozidla</ScaledText>
                            </View>
                        </Link>
                    </View>
                </View>

                <View className="border-t-[1px]" style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, marginHorizontal: getScaleFactor() * 16, marginVertical: getScaleFactor() * 12, paddingVertical: getScaleFactor() * 16 }} >
                    <ScaledText size="lg" style={{ color: Colors.inactive_icon, ...spacing.mb(6) }} className="font-bold uppercase" isThemed={true}>Aplikace</ScaledText>
                    <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="palette" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='base' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Vzhled</ScaledText>
                        </View>
                    </Link>
                    <Link href={"/tank"} style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="settings" color={Colors.inactive_icon} size={getScaleFactor() * 30} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="h-full justify-center">
                            <ScaledText size='base' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>Nastavení</ScaledText>
                        </View>
                    </Link>
                    <View onTouchEnd={() => { showModal(AboutAppModal) }} className="flex-row" style={{ ...spacing.py(6) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="info" color={Colors.inactive_icon} size={getScaleFactor() * 30} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="justify-center">
                            <ScaledText size='base' style={{ color: Colors.inactive_icon }} className="font-medium" isThemed={true}>O aplikaci</ScaledText>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}