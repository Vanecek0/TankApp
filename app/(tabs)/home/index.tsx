import { Animated, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import getScaleFactor from '@/utils/SizeScaling';
import { spacing } from '@/utils/SizeScaling';
import { getDate } from '@/utils/getDate';
import { Station } from '@/models/Station';
import CustomButton, { ActionButton } from '@/components/common/Buttons';
import Dashboard from '@/components/dashboards';
import { useModal } from '@/hooks/useModal';
import AddTankRecordModal from '@/components/modals/tankRecordModal';
import { AddStationRecordModal } from '@/components/modals/stationsModal';
import Card from '@/components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loadCarFromStorage } from '@/store/slices/car.slice';
import { Tanking } from '@/models/Tanking';
import { tankingService } from '@/services/tankingService';
import { Fuel } from '@/models/Fuel';
import { Badge } from '@/models/Badge';
import CollapsibleScroll from '@/components/CollapsibleScroll';
import { LinearGradient } from 'expo-linear-gradient';
import darkenHexColor from '@/utils/colorDarken';
import { router } from 'expo-router';
import { TankingStatistics } from '@/models/TankingStatistics';
import { tankingStatisticService } from '@/services/tankingStatisticsService';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { car } = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  const { showModal } = useModal();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [tanking, setTanking] = useState<{
    month: string,
    tankings: (Tanking & {
      station?: Station;
      fuels?: Fuel[];
      badges: Badge[];
    })[]
  }[]>([])
  const [tankingStatisticsThisMonth, setTankingStatisticsThisMonth] = useState<Omit<TankingStatistics, 'period'>>()
  const [tankingStatisticsLastMonth, setTankingStatisticsLastMonth] = useState<Omit<TankingStatistics, 'period'>>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadCarFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const getTankingStatisticsThisMonth = async () => {
      const tankingStatisticsThisMonth = await tankingStatisticService.getThisMonthTankingStats(car?.id!);
      setTankingStatisticsThisMonth(tankingStatisticsThisMonth)
    }

    const getTankingStatisticsLastMonth = async () => {
      const tankingStatisticsLastMonth = await tankingStatisticService.getLastMonthTankingStats(car?.id!);
      setTankingStatisticsLastMonth(tankingStatisticsLastMonth)
    }

    getTankingStatisticsThisMonth();
    getTankingStatisticsLastMonth();
  }, [car])

  const loadTankings = useCallback(async (carId: number) => {
    setIsLoading(true);
    try {
      const tankingsBadges = await tankingService.getGroupedTankingsByMonth('DESC', carId, 3);
      setTanking(tankingsBadges);
    } catch (error) {
      console.error('Error while loading tankings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadTankings(car?.id ?? 2);
  }, [loadTankings, car]);

  const TankingItem = React.memo(({ item }: {
    item: {
      month: string,
      tankings: (Tanking & {
        station?: Station
      })[]
    }
  }) => {
    return (
      <View style={{ ...spacing.gap(12) }}>
        <ScaledText size='xl' className='capitalize font-bold' style={{ color: isDark ? Colors.text.primary_dark : '' }}>{getDate(item.month).monthIndex == new Date().getMonth() ? "Tento měsíc" : `${getDate(item.month).monthLong} ${getDate(item.month).year}`}</ScaledText>
        <View style={{ ...spacing.mb(12) }}>
          {item.tankings.map((item, index) => (
            <View key={index} style={{ ...spacing.gap(12), ...spacing.my(12) }} className='flex-row items-center'>
              <>
              {console.log(item)}
              </>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='lg'>{item.station?.provider?.slice(0, 2).toUpperCase() ?? '-'}</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                  <ScaledText isThemed size="xl" className='font-bold'>{item.station?.name ?? 'Neznámá stanice'}</ScaledText>
                  <View style={{ ...spacing.gap(4) }} className='flex-row items-center justify-start'>
                    <Icon name="map_pin" color={Colors.text.muted} size={getScaleFactor() * 16} />
                    <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed size="base" style={{ width: "85%" }}>{item.station?.address ?? 'Bez adresy'}</ScaledText>
                  </View>
                  <View style={{ ...spacing.gap(12) }} className='flex-col'>
                    <View style={{ ...spacing.gap(4) }} className='flex-row items-center justify-start'>
                      <Icon name="calendar" color={Colors.text.muted} size={getScaleFactor() * 16} />
                      <ScaledText isThemed size="base">{new Date(item.tank_date).toLocaleDateString("cs-CZ")}, {new Date(item.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                    </View>
                  </View>
                </View>

                <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                  <ScaledText isThemed size="xl" className='font-bold'>{item.price} Kč</ScaledText>
                  <ScaledText isThemed size="base">{item.amount} l</ScaledText>
                  <ScaledText isThemed size="base">{item.tachometer} km</ScaledText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  })

  return (
    <>
      <View
        className='flex-1'
        style={{
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light,
        }}
      >
        <CollapsibleScroll
          header={(scrollY) =>
            <View>
              <LinearGradient
                colors={[Colors.base.primary, darkenHexColor(Colors.base.primary, -15)]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  height: '75%',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <View style={{ ...spacing.mx(20) }}>
                <Dashboard scrollRefVal={scrollY} />
              </View>
            </View>
          }
          scrollYValue={scrollY}

        >
          <Animated.ScrollView style={{ ...spacing.mx(20), ...spacing.gap(12), ...spacing.mt(12), ...spacing.mb(96) }}>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row justify-center items-center' style={{ ...spacing.gap(8), ...spacing.borderRadius(8), ...spacing.py(12) }}>
                <Icon name='tank' color={Colors.base.primary} size={getScaleFactor() * 20} />
                <ScaledText size='xl' className='font-bold' isThemed>Poslední tankování</ScaledText>
              </View>
              <CustomButton
                label="Zobrazit více"
                labelSize='base'
                labelStyle={{ textDecorationLine: "underline" }}
                backgroundColor='transparent'
                onPress={() => router.navigate("/(tabs)/tank")}
                isThemed={true}
              />
            </View>

            <Card>
              {tanking.map((item, index) => (
                <TankingItem key={index} item={item} />
              ))}
              {
                tanking.length > 0 ? (
                  <View style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    ...spacing.height(80),
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                    opacity: 0.85
                  }}
                    className='flex justify-center items-center'
                  >
                    <CustomButton
                      label={<View>
                        <ScaledText size='lg' style={{fontWeight: "bold"}} isThemed>Zobrazit více</ScaledText>
                        <Icon name="chevron_down" color={Colors.text.muted} size={getScaleFactor() * 26} />
                      </View>}
                      labelStyle={{ fontWeight: "bold" }}
                      backgroundColor='transparent'
                      onPress={() => router.navigate("/(tabs)/tank")}
                      style={{}}
                      isThemed={true}
                    />
                  </View>
                ) : null
              }
            </Card>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row justify-center items-center' style={{ ...spacing.gap(8), ...spacing.borderRadius(8), ...spacing.py(12) }}>
                <Icon name='dollar' color={Colors.base.primary} size={getScaleFactor() * 20} />
                <ScaledText size='xl' className='font-bold' isThemed>Náklady</ScaledText>
              </View>
              <CustomButton
                label="Zobrazit více"
                labelSize='base'
                labelStyle={{ textDecorationLine: "underline" }}
                backgroundColor='transparent'
                onPress={() => router.navigate("/(tabs)/statistics")}
                isThemed={true}
              />
            </View>
            <Card style={{ ...spacing.gap(12) }}>
              <View style={{ ...spacing.gap(8) }}>
                <View className='flex-row items-center'>
                  <ScaledText size='lg' isThemed>Tento měsíc</ScaledText>
                </View>

                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="average" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsThisMonth?.avg_price_per_unit.toFixed(2) ?? "0"} kč/l</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Průměrná cena</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="dollar" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsThisMonth?.total_price.toFixed(2) ?? "0"} kč</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Cena za palivo</ScaledText>
                </View>
              </View>
              <View style={{ ...spacing.gap(8) }}>
                <View className='flex-row items-center'>
                  <ScaledText size='lg' isThemed>Předchozí měsíc</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="average" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsLastMonth?.avg_price_per_unit.toFixed(2) ?? "0"} kč/l</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Průměrná cena</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="dollar" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsLastMonth?.total_price.toFixed(2) ?? "0"} kč</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Cena za palivo</ScaledText>
                </View>
              </View>
            </Card>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row justify-center items-center' style={{ ...spacing.gap(8), ...spacing.borderRadius(8), ...spacing.py(12) }}>
                <Icon name='tank' color={Colors.base.primary} size={getScaleFactor() * 20} />
                <ScaledText size='xl' className='font-bold' isThemed>Palivo</ScaledText>
              </View>
              <CustomButton
                label="Zobrazit více"
                labelSize='base'
                labelStyle={{ textDecorationLine: "underline" }}
                backgroundColor='transparent'
                onPress={() => router.navigate("/(tabs)/statistics")}
                isThemed={true}
              />
            </View>
            <Card style={{ ...spacing.gap(12) }}>
              <View style={{ ...spacing.gap(8) }}>
                <View className='flex-row items-center'>
                  <ScaledText size='lg' isThemed>Tento měsíc</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="droplet" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsThisMonth?.avg_consumption.toFixed(2) ?? "0"} l/100km</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Průměrná spotřeba</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="tank" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsThisMonth?.total_amount.toFixed(2) ?? "0"} l</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Natankováno paliva</ScaledText>
                </View>
              </View>
              <View style={{ ...spacing.gap(8) }}>
                <View className='flex-row items-center'>
                  <ScaledText size='lg' isThemed>Předchozí měsíc</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="droplet" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsLastMonth?.avg_consumption.toFixed(2) ?? "0"} l/100km</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Průměrná spotřeba</ScaledText>
                </View>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                    <Icon name="tank" color={Colors.base.primary} size={getScaleFactor() * 20} />
                    <ScaledText size='xl' className='font-bold' isThemed>{tankingStatisticsLastMonth?.total_amount.toFixed(2) ?? "0"} l</ScaledText>
                  </View>
                  <ScaledText size='base' style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled }}>Natankováno paliva</ScaledText>
                </View>
              </View>
            </Card>
          </Animated.ScrollView>
        </CollapsibleScroll>

      </View >
      <ActionButton scrollY={scrollY}>
        <View onTouchEnd={
          () => { showModal(AddTankRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.base.white : ''} className='font-bold'>Přidat tankování</ScaledText>
          <CustomButton
            labelClassName='aspect text-center'
            style={{
              ...spacing.borderRadius(90),
              ...spacing.p(16),
              ...spacing.width(60),
              shadowColor: Colors.base.black,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 8,
            }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="tank"
                color={Colors.base.primary}
                style={{
                  ...spacing.width(20),
                  ...spacing.height(20),
                }}
              />
            }
            labelSize='xl'
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}

          />
        </View>
        <View onTouchEnd={
          () => { showModal(AddStationRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.base.white : ''} className='font-bold'>Přidat stanici</ScaledText>
          <CustomButton
            labelClassName='aspect-square text-center'
            style={{
              ...spacing.borderRadius(90),
              ...spacing.p(16),
              ...spacing.width(60),
              shadowColor: Colors.base.black,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 8,
            }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="map_pin"
                color={Colors.base.primary}
                style={{
                  ...spacing.width(20),
                  ...spacing.height(20)
                }}
              />
            }
            labelSize='xl'
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
          />
        </View>
      </ActionButton>
    </>
  );
}