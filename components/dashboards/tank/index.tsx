import { Animated, View } from "react-native";
import ScaledText from "@/components/common/ScaledText";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { useEffect, useRef, useState } from "react";
import TankGraph from "@/components/graphs/TankGraph";
import { tankingRepository } from "@/repositories/tankingRepository";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { TankingStatistics } from "@/models/TankingStatistics";
import { tankingStatisticService } from "@/services/tankingStatisticsService";
import { loadCarFromStorage } from "@/store/slices/car.slice";
import { ThemeColors as Colors } from '@/constants/Colors';
import { useTheme } from "@/theme/ThemeProvider";

export default function TankDashboard({ className, scrollRefVal }: {
    className?: string;
    scrollRefVal?: Animated.Value;
}) {
    const [tankingSumsDate, setTankingSumsDate] = useState<({ month: string; total_price: number; total_mileage: number })[]>([])
    const [tankingStatistics, setTankingStatistics] = useState<Omit<TankingStatistics, 'period'>>()
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();
    const { isDark } = useTheme();

    const H_MAX_HEIGHT = getScaleFactor() * 310;
    const H_MIN_HEIGHT = getScaleFactor() * 110;
    const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

    useEffect(() => {
        dispatch(loadCarFromStorage());
    }, [dispatch]);

    useEffect(() => {
        const getTankingSums = async () => {
            const tankingSums = await tankingRepository.getPriceMileageSumByDate(car?.id!);
            setTankingSumsDate(tankingSums)
        }

        const getTankingStatistics = async () => {
            const tankingStatisticsDate = await tankingStatisticService.getYearTankingStats(car?.id!);
            setTankingStatistics(tankingStatisticsDate)
        }

        getTankingStatistics();
        getTankingSums();

    }, [car])


    const scrollY = useRef(scrollRefVal!).current;

    const animatedHeight = scrollY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const fullOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    }) as Animated.AnimatedInterpolation<number>;

    return (
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    height: animatedHeight,
                    ...spacing.px(20),
                    ...spacing.py(12),
                    ...spacing.borderRadius(12),
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    shadowColor: Colors.base.black,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 5,
                    zIndex: 1
                }}
                className={`${className} flex-col`}
            >
                <ScaledText size="lg" className="text-center font-bold" isThemed>Leden 2025 – Únor 2025</ScaledText>
                <View style={{ ...spacing.my(4) }} className="flex-row justify-between w-full">
                    <View className="items-start">
                        <ScaledText style={{ ...spacing.mb(0) }} size="xl" className="font-bold" isThemed>{tankingStatistics?.total_price.toFixed(2) ?? "0"} kč</ScaledText>
                        <ScaledText size="lg" className="font-bold" isThemed>Výdaje za palivo</ScaledText>
                    </View>
                    <View className="items-end">
                        <ScaledText style={{ ...spacing.mb(0) }} size="xl" className="font-bold" isThemed>{tankingStatistics?.total_mileage.toFixed(0) ?? "0"} km</ScaledText>
                        <ScaledText size="lg" className="font-bold" isThemed>Vzdálenost</ScaledText>
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={{
                opacity: fullOpacity,
                height: animatedHeight,
                ...spacing.p(20),
                ...spacing.borderRadius(12),
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                shadowColor: Colors.base.black,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                overflow: "hidden",
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 5,
                zIndex: 10
            }}
                className={`${className} flex-col`} >
                <ScaledText size="lg" className="text-center font-bold" isThemed>Leden 2025 – Únor 2025</ScaledText>
                <View style={{ ...spacing.mt(12), ...spacing.mb(24) }} className="flex-row justify-between">
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="font-bold" isThemed>{tankingStatistics?.total_price.toFixed(2) ?? "0"} kč</ScaledText>
                        <ScaledText size="lg" className="font-bold" isThemed>Výdaje za palivo</ScaledText>
                    </View>
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="font-bold" isThemed>{tankingStatistics?.total_mileage.toFixed(0) ?? "0"} km</ScaledText>
                        <ScaledText size="lg" className="font-bold" isThemed>Vzdálenost</ScaledText>
                    </View>
                </View>
                <TankGraph data={tankingSumsDate} />
            </Animated.View>
        </>
    );
}