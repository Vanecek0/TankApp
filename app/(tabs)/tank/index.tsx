import { RefreshControl, ScrollView, TouchableOpacity, View, VirtualizedList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { usePathname } from 'expo-router';
import { ThemeColors as Colors } from '@/constants/Colors';
import TankStatistics from './tabs/statistics';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import BadgeComponent from '@/components/Badge';
import { Badge, Badge as BadgeType } from '@/models/Badge';
import { Station } from '@/models/Station';
import { Fuel } from '@/models/Fuel';
import { StationFuel } from '@/models/StationFuel';
import { getDate } from '@/utils/getDate';
import CustomButton, { ActionButton } from '@/components/common/Buttons';
import Dashboard from '@/components/dashboards';
import AddTankRecordModal from '@/components/modals/tankRecordModal';
import { AddStationRecordModal } from '@/components/modals/stationsModal';
import { useModal } from '@/providers/modalProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loadCarFromStorage } from '@/store/slices/car.slice';
import Dropdown from '@/components/common/Dropdown';
import { Tanking } from '@/models/Tanking';
import { tankingService } from '@/services/tankingService';
import Card from '@/components/common/Card';

export default function TankScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { car, loading } = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  const [orderTankings, setOrderTankings] = useState<'DESC' | 'ASC'>('DESC');
  const { showModal } = useModal();
  const [tanking, setTanking] = useState<{
    month: string,
    tankings: (Tanking & {
      station?: Station,
      fuel?: Fuel,
      station_fuel?: StationFuel,
      badges?: Badge[]
    })[]
  }[]>([])

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

  const onRefresh = useCallback(async () => {
    await loadTankings(orderTankings, car?.id ?? 2);
  }, [car]);

  const TankingItem = React.memo(({ item }: {
    item: {
      month: string,
      tankings: (Tanking & {
        station?: Station,
        fuel?: Fuel,
        station_fuel?: StationFuel,
        badges?: BadgeType[]
      })[]
    }
  }) => {
    return (
      <View style={{ ...spacing.gap(12) }}>
        <ScaledText size='lg' className='font-bold capitalize' style={{ color: isDark ? Colors.text.primary_dark : Colors.text.primary }}>{getDate(item.month).monthLong} {getDate(item.month).year}</ScaledText>
        <View style={{ ...spacing.gap(12) }}>
          {item.tankings.map((item) => (
            <React.Fragment key={item.id}>
              <Card>
                <View style={{ ...spacing.gap(12) }} className=' flex-row items-center w-full'>
                  <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{item.station?.provider.slice(0, 2).toUpperCase()}</ScaledText>
                  <View className='flex-row justify-between flex-1'>
                    <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                      <ScaledText isThemed={true} size="lg" className='font-bold'>{item.station?.name}</ScaledText>
                      <View style={{ ...spacing.gap(2) }} className='flex-row justify-center items-center'>
                        <Icon name="map_pin" color={Colors.icon.primary} size={getScaleFactor() * 15} />
                        <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible w-2/3' isThemed={true} size="sm">{item.station?.address}</ScaledText>
                      </View>
                    </View>
                    <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                      <ScaledText isThemed={true} size="lg" className='font-bold'>{item.price} Kč</ScaledText>
                      <ScaledText isThemed={true} size="sm" className='text-xs'>{item.amount} l</ScaledText>
                    </View>
                  </View>
                </View>
                <View style={{ ...spacing.gap(12) }} className='flex'>
                  <View style={{ ...spacing.gap(12) }} className='flex-row'>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{new Date(item.tank_date).toLocaleDateString("cs-CZ")}, {new Date(item.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                    </View>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{item.tachometer} km</ScaledText>
                    </View>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{item.fuel?.trademark}</ScaledText>
                    </View>
                  </View>
                  <View style={{ ...spacing.gap(12) }} className='flex-row'>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{item.price_per_unit} Kč/l</ScaledText>
                    </View>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{item.mileage} km</ScaledText>
                    </View>
                    <View className='basis-1/3'>
                      <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                      <ScaledText isThemed={true} size="xs" >{((item.amount / item.mileage) * 100).toFixed(2)} l/100km</ScaledText>
                    </View>
                  </View>
                </View>
                <View style={{ ...spacing.gap(8) }} className='flex-row'>
                  {item.badges?.map((badge: BadgeType) => (
                    <BadgeComponent
                      key={badge.id}
                      badgeColor={badge.color}
                      textColor={Colors.base.white}
                      size='xs'
                      style={{
                        ...spacing.borderRadius(12),
                      }}
                      value={badge.name}
                    />
                  ))}
                </View>
              </Card>
            </React.Fragment>
          ))}
        </View>
      </View>
    )
  })

  const renderItem = useCallback(
    ({ item }: {
      item: {
        month: string,
        tankings: (Tanking & {
          station?: Station,
          fuel?: Fuel,
          station_fuel?: StationFuel,
          badges?: BadgeType[]
        })[]
      }
    }) => <TankingItem item={item} />,
    [isDark]
  );
  const [tab, setTab] = useState<'list' | 'stats'>('list');

  return (
    <>
      <View style={{ backgroundColor: isDark ? Colors.background.dark : Colors.background.light, flex: 1, position: 'relative' }}>
        <View style={{ ...spacing.mx(20) }}>
          {tab === 'list' ? (
            <VirtualizedList
              ListHeaderComponent={
                <View>
                  <Dashboard routePathName={pathname} />
                  <View className='flex-row justify-center items-center' style={{ ...spacing.mt(20) }}>
                    <TouchableOpacity style={{ width: "50%", ...spacing.py(10), borderTopRightRadius: 8, borderTopLeftRadius: 8, borderBottomWidth: 3, borderBottomColor: Colors.base.primary, backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }} onPress={() => setTab('list')}>
                      <ScaledText size='base' style={[{ fontWeight: 'bold', textAlign: "center", color: isDark ? Colors.text.primary_dark : Colors.text.primary }]}>
                        Záznamy
                      </ScaledText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5) }} onPress={() => setTab('stats')}>
                      <ScaledText size='base' style={{ fontWeight: 'normal', textAlign: "center", color: Colors.text.muted }}>
                        Statistiky
                      </ScaledText>
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...spacing.mt(24), ...spacing.mb(12) }} className='flex-row items-center justify-between'>
                    <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>
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
                        ...spacing.width(150),
                        ...spacing.borderWidth(0.5),
                        ...spacing.px(12),
                        borderColor: Colors.base.transparent,
                        backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light
                      }}
                    ></Dropdown>
                  </View>

                </View>
              }
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              windowSize={2}
              ListHeaderComponentStyle={{ zIndex: 50 }}
              contentContainerStyle={{ ...spacing.gap(12), ...spacing.borderRadius(12), ...spacing.pb(96) }}
              renderItem={renderItem}
              keyExtractor={(item, index) => tanking[index].month ?? index.toString()}
              getItemCount={(_data: unknown) => tanking.length}
              getItem={(_data: unknown, index: number) => tanking[index]}
              ListEmptyComponent={
                !loading ? (
                  <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">Žádné další záznamy</ScaledText>
                ) : <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">Načítání</ScaledText>
              }
            />
          ) : (
            <>
              <ScrollView>
                <Dashboard routePathName={pathname} />
                <View className='flex-row justify-center items-center' style={{ ...spacing.mt(20) }}>
                  <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5) }} onPress={() => setTab('list')}>
                    <ScaledText size='base' style={{ fontWeight: 'normal', textAlign: "center", color: Colors.text.muted }}>
                      Seznam
                    </ScaledText>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5), borderTopRightRadius: 8, borderTopLeftRadius: 8, borderBottomWidth: 3, borderBottomColor: Colors.base.primary, backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }} onPress={() => setTab('stats')}>
                    <ScaledText size='base' style={[{ fontWeight: 'bold', textAlign: "center", color: isDark ? Colors.text.primary_dark : Colors.text.primary }]}>
                      Statistiky
                    </ScaledText>
                  </TouchableOpacity>
                </View>
                <TankStatistics />
              </ScrollView>
            </>
          )}
        </View>
        <ActionButton>
          <View onTouchEnd={
            () => { showModal(AddTankRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
            <ScaledText size={'base'} color={isDark ? Colors.base.white : ''} className='font-bold'>Přidat tankování</ScaledText>
            <CustomButton
              labelClassName='aspect text-center'
              style={{
                ...spacing.borderRadius(90),
                ...spacing.p(16),
                ...spacing.width(60)
              }}
              className={`flex shadow-md justify-center items-center aspect-square`}
              label={
                <Icon
                  name="tank" color={Colors.base.primary}
                  style={{
                    ...spacing.width(20),
                    ...spacing.height(20)
                  }}
                />
              }
              labelSize='xl'
              labelColor={isDark ? Colors.base.white : ''}
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
                ...spacing.width(60)
              }}
              className={`flex shadow-md justify-center items-center aspect-square`}
              label={
                <Icon name="map_pin"
                  color={Colors.base.primary}
                  style={{
                    ...spacing.width(20),
                    ...spacing.height(20)
                  }}
                />
              }
              labelSize='xl'
              labelColor={isDark ? Colors.base.white : ''}
              backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
            />
          </View>
        </ActionButton>
      </View>
    </>
  );
}