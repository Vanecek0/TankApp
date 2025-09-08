import { Animated, TouchableWithoutFeedback, View } from "react-native";
import ScaledText from "@/components/common/ScaledText";
import { spacing } from "@/utils/SizeScaling";
import { useEffect, useRef, useState } from "react";
import TankGraph from "@/components/graphs/TankGraph";
import { tankingRepository } from "@/repositories/tankingRepository";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { TankingStatistics } from "@/models/TankingStatistics";
import { tankingStatisticService } from "@/services/tankingStatisticsService";
import { loadCarFromStorage } from "@/store/slices/car.slice";

export default function TankDashboard({ className, scrollRefVal }: {
    className?: string;
    scrollRefVal?: Animated.Value;
}) {
    const [tankingSumsDate, setTankingSumsDate] = useState<({ month: string; total_price: number; total_mileage: number })[]>([])
    const [tankingStatistics, setTankingStatistics] = useState<Omit<TankingStatistics, 'period'>>()
    const { car, loading } = useSelector((state: RootState) => state.car);
    const dispatch = useDispatch<AppDispatch>();

    const H_MAX_HEIGHT = 280;
    const H_MIN_HEIGHT = 95;
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
            const tankingStatisticsDate = await tankingStatisticService.getSumOfMonthlyTankingStatsByDate();
            setTankingStatistics(tankingStatisticsDate)
        }

        getTankingStatistics();
        getTankingSums();

    }, [dispatch, car])

    const scrollY = useRef(scrollRefVal!).current;

    const animatedHeight = scrollY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const fullOpacity = scrollY.interpolate({
        inputRange: [0, 85],
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
                    ...spacing.borderRadius(12)
                }}
                className={`${className} flex-col bg-primary`}
            >
                <ScaledText size="base" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
                <View style={{ ...spacing.my(4) }} className="flex-row justify-between w-full">
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(0) }} size="xl" className="text-white font-bold">{tankingStatistics?.total_price} kč</ScaledText>
                        <ScaledText size="base" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                    </View>
                    <View className="items-center">
                        <ScaledText style={{ ...spacing.mb(0) }} size="xl" className="text-white font-bold">{tankingStatistics?.total_mileage} km</ScaledText>
                        <ScaledText size="base" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={{
                opacity: fullOpacity,
                height: animatedHeight,
                ...spacing.p(20),
                ...spacing.borderRadius(12)
            }}
                className={`${className} flex-col bg-primary`} >
                <>
                    <ScaledText size="lg" className="text-center text-white font-bold">Leden 2025 – Únor 2025</ScaledText>
                    <View style={{ ...spacing.my(12) }} className="flex-row justify-between">
                        <View className="items-center">
                            <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingStatistics?.total_price} kč</ScaledText>
                            <ScaledText size="lg" className="text-hidden_text font-bold">Výdaje za palivo</ScaledText>
                        </View>
                        <View className="items-center">
                            <ScaledText style={{ ...spacing.mb(4) }} size="3xl" className="text-white font-bold">{tankingStatistics?.total_mileage} km</ScaledText>
                            <ScaledText size="lg" className="text-hidden_text font-bold">Vzdálenost</ScaledText>
                        </View>
                    </View>
                    <TankGraph data={tankingSumsDate} />
                </>
            </Animated.View>
        </>
    );
}