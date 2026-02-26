import { Button, View } from "react-native";
import ScaledText from "@/components/common/ScaledText";
import { Link } from "expo-router";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useTheme } from "@/theme/ThemeProvider";
import Icon from "../Icon";
import { ThemeColors as Colors } from "@/constants/Colors";
import { ModalProvider, useModal } from "@/hooks/useModal";
import AboutAppModal from "@/components/modals/aboutAppModal";
import StationsModal from "@/components/modals/stationsModal";
import { useSegments } from 'expo-router';
import { ScrollView } from "react-native-gesture-handler";
import ProfileModal from "@/components/modals/profileModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loadCarFromStorage, setCarByIdAndPersist } from "@/store/slices/car.slice";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Drawer({ ...props }) {

    return (

        <ScrollView {...props}>
            <ModalProvider>
                <DrawerContent />
            </ModalProvider>
        </ScrollView>

    );
}

const currentTabIndex = () => {
    const segments = useSegments();
    return segments.slice(1).join('/');
}

function DrawerContent() {
    const { isDark } = useTheme();
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();
    const { showModal } = useModal();

    useEffect(() => {
        dispatch(loadCarFromStorage());
    }, [dispatch]);

    return (
        <SafeAreaView>
            <View className="border-b-[1px] flex-row justify-between" style={{ borderColor: isDark ? Colors.text.primary : Colors.text.primary_dark, marginHorizontal: getScaleFactor() * 16, ...spacing.mb(16), ...spacing.py(16) }}>
                <View style={{ ...spacing.gap(12) }} className="flex-row items-center">
                    <View
                        className="rounded-full justify-center items-center aspect-square"
                        style={{ backgroundColor: "lightgray", ...spacing.width(60) }}
                    >
                        <ScaledText
                            className="font-bold text-center"
                            size="xl"
                        >
                            {car?.car_nickname.slice(0, 2).toUpperCase()}
                        </ScaledText>
                    </View>
                    <View>
                        <ScaledText size="xl" className="font-bold" isThemed>{car?.car_nickname}</ScaledText>
                        <ScaledText size="base" className="font-medium" style={{ color: Colors.text.muted }}>{car?.manufacturer} {car?.model}</ScaledText>
                    </View>
                </View>
                <View onTouchEnd={() => { showModal(ProfileModal) }} className="justify-center">
                    <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                        <Icon name="users" color={Colors.icon.disabled} size={getScaleFactor() * 25} />
                    </View>
                </View>
            </View>
            <View>
                <View style={{ ...spacing.gap(8) }}>
                    <View>
                        <Link
                            href="/home"
                            style={{
                                ...spacing.py(12),
                                ...spacing.px(16),
                                backgroundColor:
                                    currentTabIndex() === "home"
                                        ? isDark
                                            ? Colors.text.primary
                                            : Colors.text.primary_dark
                                        : undefined,
                            }}
                        >
                            <View
                                className="justify-center items-center"
                                style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                            >
                                <Icon
                                    name="home"
                                    color={isDark ? Colors.text.primary_dark : Colors.text.primary}
                                    size={getScaleFactor() * 20}
                                />
                            </View>
                            <View style={{ ...spacing.px(10) }} className="h-full justify-center">
                                <ScaledText
                                    size="lg"
                                    className="font-medium"
                                    isThemed
                                >
                                    Domů
                                </ScaledText>
                            </View>
                        </Link>

                        <Link
                            href="/tank"
                            style={{
                                ...spacing.py(12),
                                ...spacing.px(16),
                                backgroundColor:
                                    currentTabIndex() === "tank"
                                        ? isDark
                                            ? Colors.text.primary
                                            : Colors.text.primary_dark
                                        : undefined,
                            }}
                        >
                            <View
                                className="justify-center items-center"
                                style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                            >
                                <Icon
                                    name="tank"
                                    color={isDark ? Colors.text.primary_dark : Colors.text.primary}
                                    size={getScaleFactor() * 20}
                                />
                            </View>
                            <View style={{ ...spacing.px(10) }} className="h-full justify-center">
                                <ScaledText
                                    size="lg"
                                    className="font-medium"
                                    isThemed
                                >
                                    Tankování
                                </ScaledText>
                            </View>
                        </Link>

                        <Link
                            href="/(tabs)/service"
                            style={{
                                ...spacing.py(12),
                                ...spacing.px(16),
                                backgroundColor:
                                    currentTabIndex() === "service"
                                        ? isDark
                                            ? Colors.text.primary
                                            : Colors.text.primary_dark
                                        : undefined,
                            }}
                        >
                            <View
                                className="justify-center items-center"
                                style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                            >
                                <Icon
                                    name="car_repair"
                                    color={isDark ? Colors.text.primary_dark : Colors.text.primary}
                                    size={getScaleFactor() * 20}
                                />
                            </View>
                            <View style={{ ...spacing.px(10) }} className="h-full justify-center">
                                <ScaledText
                                    size="lg"
                                    className="font-medium"
                                    isThemed
                                >
                                    Servis
                                </ScaledText>
                            </View>
                        </Link>
                        <View style={{ ...spacing.mx(16), borderBottomWidth: 1, borderColor: isDark ? Colors.text.primary : Colors.text.primary_dark, ...spacing.py(6) }}></View>
                    </View>
                    <View>
                        <View
                            onTouchEnd={() => { showModal(StationsModal) }}
                            className="flex-row"
                            style={{
                                ...spacing.py(12),
                                ...spacing.px(16)
                            }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                                <Icon name="map_pin" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(10) }} className="justify-center">
                                <ScaledText size='lg' className="font-medium" isThemed>Stanice</ScaledText>
                            </View>
                        </View>
                        <Link
                            href={"/tank"}
                            style={{
                                ...spacing.py(12),
                                ...spacing.px(16)
                            }}>
                            <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                                <Icon name="document" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 25} />
                            </View>
                            <View style={{ ...spacing.px(10) }} className="h-full justify-center">
                                <ScaledText size='lg' className="font-medium" isThemed>Dokumenty vozidla</ScaledText>
                            </View>
                        </Link>
                    </View>
                </View>



                <View className="border-t-[1px]" style={{ borderColor: isDark ? Colors.text.primary : Colors.text.primary_dark, marginHorizontal: getScaleFactor() * 16, marginVertical: getScaleFactor() * 12, paddingVertical: getScaleFactor() * 16 }} >

                    <Link href={"/tank"} style={{ ...spacing.py(12) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="settings" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 30} />
                        </View>
                        <View style={{ ...spacing.px(10) }} className="h-full justify-center">
                            <ScaledText size='lg' className="font-medium" isThemed>Nastavení</ScaledText>
                        </View>
                    </Link>
                    <View onTouchEnd={() => { showModal(AboutAppModal) }} className="flex-row" style={{ ...spacing.py(12) }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}>
                            <Icon name="info" color={isDark ? Colors.text.primary_dark : Colors.text.primary} size={getScaleFactor() * 30} />
                        </View>
                        <View style={{ ...spacing.px(10) }} className="justify-center">
                            <ScaledText size='lg' className="font-medium" isThemed>O aplikaci</ScaledText>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}