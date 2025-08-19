import { RefreshControl, ScrollView, TouchableOpacity, View, VirtualizedList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Dashboard from '@/components/ui/dashboard';
import TankStatistics from './tabs/statistics';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { Tanking, TankingModel } from '@/models/Tanking';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';
import ActionButton from '@/components/ui/actionButton';
import { Badge as BadgeType, BadgeModel } from '@/models/Badge';
import { Station } from '@/models/Station';
import { Fuel } from '@/models/Fuel';
import { StationFuel } from '@/models/StationFuel';
import { getDate } from '@/utils/getDate';

export default function TankScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [tanking, setTanking] = useState<{
    month: string,
    tankings: (Tanking & {
      station?: Station,
      fuel?: Fuel,
      station_fuel?: StationFuel,
      badges?: BadgeType[]
    })[]
  }[]>([])

  const loadTankings = useCallback(async () => {
    setIsLoading(true);
    try {
      const tankingsBadges = await TankingModel.getGroupedTankingsByMonth();
      setTanking(tankingsBadges);
    } catch (error) {
      console.error('Chyba při načítání tankings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTankings();
  }, [loadTankings]);

  const onRefresh = loadTankings;

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
      <>
        <View style={{ ...spacing.gap(12) }}>
          <ScaledText size='lg' className='font-bold capitalize' style={{ color: isDark ? Colors.dark.text : '' }}>{getDate(item.month).monthLong} {getDate(item.month).year}</ScaledText>
          <View style={{ ...spacing.gap(12) }}>
            {item.tankings.map((item) => (
              <View key={item.id} style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }}>
                <View key={item.id} style={{ ...spacing.gap(20) }}>
                  <View style={{ ...spacing.gap(12) }} className=' flex-row items-center w-full'>
                    <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{item.station?.provider.slice(0, 2).toUpperCase()}</ScaledText>
                    <View className='flex-row justify-between flex-1'>
                      <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                        <ScaledText isThemed={true} size="lg" className='font-bold'>{item.station?.name}</ScaledText>
                        <View style={{ ...spacing.gap(2) }} className='flex-row justify-center items-center'>
                          <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 15} />
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
                      <Badge
                        key={badge.id}
                        badgeColor={badge.color}
                        textColor={Colors.white}
                        size='xs'
                        style={{
                          ...spacing.borderRadius(12),
                        }}
                        value={badge.name}
                      />
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
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
      <View style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, flex: 1, position: 'relative' }}>
        <View style={{ ...spacing.mx(20) }}>
          {tab === 'list' ? (
            <VirtualizedList
              ListHeaderComponent={
                <>
                  <Dashboard routePathName={pathname} />
                  <View className='flex-row justify-center items-center' style={{ ...spacing.mt(20) }}>
                    <TouchableOpacity style={{ width: "50%", ...spacing.py(10), borderTopRightRadius: 8, borderTopLeftRadius: 8, borderBottomWidth: 3, borderBottomColor: Colors.primary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} onPress={() => setTab('list')}>
                      <ScaledText size='base' style={[{ fontWeight: 'bold', textAlign: "center", color: isDark ? Colors.dark.text : Colors.light.text }]}>
                        Záznamy
                      </ScaledText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5) }} onPress={() => setTab('stats')}>
                      <ScaledText size='base' style={{ fontWeight: 'normal', textAlign: "center", color: Colors.inactive_icon }}>
                        Statistiky
                      </ScaledText>
                    </TouchableOpacity>
                  </View>

                </>
              }
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              windowSize={2}
              contentContainerStyle={{ ...spacing.gap(12), ...spacing.borderRadius(12), ...spacing.pb(96) }}
              renderItem={renderItem}
              keyExtractor={(item, index) => tanking[index].month ?? index.toString()}
              getItemCount={(_data: unknown) => tanking.length}
              getItem={(_data: unknown, index: number) => tanking[index]}
              ListEmptyComponent={<ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.inactive_icon} size="base">Žádné další záznamy</ScaledText>}
            />
          ) : (
            <>
              <ScrollView>
                <Dashboard routePathName={pathname} />
                <View className='flex-row justify-center items-center' style={{ ...spacing.mt(20) }}>
                  <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5) }} onPress={() => setTab('list')}>
                    <ScaledText size='base' style={{ fontWeight: 'normal', textAlign: "center", color: Colors.inactive_icon }}>
                      Seznam
                    </ScaledText>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: "50%", ...spacing.py(10), ...spacing.mb(5), borderTopRightRadius: 8, borderTopLeftRadius: 8, borderBottomWidth: 3, borderBottomColor: Colors.primary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} onPress={() => setTab('stats')}>
                    <ScaledText size='base' style={[{ fontWeight: 'bold', textAlign: "center", color: isDark ? Colors.dark.text : Colors.light.text }]}>
                      Statistiky
                    </ScaledText>
                  </TouchableOpacity>
                </View>
                <TankStatistics />
              </ScrollView>
            </>
          )}
        </View>
        <ActionButton />
      </View>
    </>
  );
}