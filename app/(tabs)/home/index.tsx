import { Animated, Dimensions, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import getScaleFactor from '@/utils/SizeScaling';
import { spacing } from '@/utils/SizeScaling';
import { getDate } from '@/utils/getDate';
import { Station } from '@/models/Station';
import Dropdown from '@/components/common/Dropdown';
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

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { car } = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  const { showModal } = useModal();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [orderTankings, setOrderTankings] = useState<'DESC' | 'ASC'>('DESC');
  const [tanking, setTanking] = useState<{
    month: string,
    tankings: (Tanking & {
      station?: Station;
      fuels?: Fuel[];
      badges: Badge[];
    })[]
  }[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadCarFromStorage());
  }, [dispatch]);

  const loadTankings = useCallback(async (orderTankings: 'DESC' | 'ASC', carId: number) => {
    setIsLoading(true);
    try {
      const tankingsBadges = await tankingService.getGroupedTankingsByMonth(orderTankings, carId);
      setTanking(tankingsBadges);
    } catch (error) {
      console.error('Error while loading tankings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadTankings(orderTankings, car?.id ?? 2);
  }, [loadTankings, car, orderTankings]);

  const TankingItem = React.memo(({ item }: {
    item: {
      month: string,
      tankings: (Tanking & {
        station?: Station
      })[]
    }
  }) => {
    return (
      <View>
        <ScaledText size='xl' className='capitalize font-bold' style={{ color: isDark ? Colors.text.primary_dark : '', ...spacing.my(12) }}>{getDate(item.month).monthLong} {getDate(item.month).year}</ScaledText>
        {item.tankings.map((item) => (
          <Card key={item.id}>
            <View style={{ ...spacing.gap(12) }} className='flex-row items-center'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='lg'>{item.station?.provider?.slice(0, 2).toUpperCase() ?? '-'}</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                  <ScaledText isThemed size="xl" className='font-bold'>{item.station?.name ?? 'Neznámá stanice'}</ScaledText>
                  <View style={{ ...spacing.gap(4) }} className='flex-row items-center justify-start'>
                    <Icon name="map_pin" color={Colors.text.muted} size={getScaleFactor() * 16} />
                    <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed size="base">{item.station?.address ?? 'Bez adresy'}</ScaledText>
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
          </Card >
        ))}
      </View>
    )
  })

  const renderItem = useCallback(
    ({ item }: {
      item: {
        month: string,
        tankings: (Tanking & {
          station?: Station
        })[]
      }
    }) => <TankingItem item={item} />,
    [isDark]
  );

  return (
    <>
      <View
        className='flex-1'
        style={{
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light
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
          subHeader={() => (
            <View style={{ ...spacing.py(12), ...spacing.mx(20) }} className='flex-row items-center justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed>Poslední záznamy</ScaledText>
              <Dropdown
                defaultIndex={0}
                data={[
                  { value: 'DESC', label: 'Nejnovější' },
                  { value: 'ASC', label: 'Nejstarší' }
                ]}
                onChange={(item) => {
                  if (item.value === "DESC" || item.value === "ASC") {
                    setOrderTankings(item.value);
                  } else {
                    console.warn("Invalid value for order:", item.value);
                  }
                }}
                dropdownStyle={{
                  ...spacing.borderRadius(12),
                  ...spacing.width(180),
                  ...spacing.borderWidth(0.5),
                  ...spacing.p(12),
                  borderColor: Colors.base.transparent,
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light
                }}
              ></Dropdown>
            </View>
          )}
          scrollComponent={Animated.FlatList}
          scrollProps={{
            initialNumToRender: 1,
            maxToRenderPerBatch: 2,
            windowSize: 2,
            contentContainerStyle: { ...spacing.borderRadius(12), ...spacing.mx(20), ...spacing.pb(6), backgroundColor: isDark ? Colors.background.dark : Colors.background.light },
            renderItem: renderItem,
            horizontal: false,
            data: tanking,
            keyExtractor: (item, index) => tanking[index].month ?? index.toString(),
            showsVerticalScrollIndicator: false,
            ListEmptyComponent:
              !isLoading ? (
                <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">Žádné další záznamy</ScaledText>
              ) : <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">Načítání</ScaledText>

          }}
        >
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