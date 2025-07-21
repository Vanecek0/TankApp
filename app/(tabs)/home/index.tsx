import { Button, RefreshControl, Text, View, VirtualizedList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { Link, useNavigation, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Dashboard from '@/components/ui/dashboard';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import getScaleFactor, { scaled } from '@/utils/SizeScaling';
import { spacing } from '@/utils/SizeScaling';
import { getDate } from '@/utils/getDate';
import { Tanking, TankingModel } from '@/models/Tanking';
import { useDatabase } from '@/database/databaseContext';
import ActionButton from '@/components/ui/actionButton';
import { Station } from '@/models/Station';
import { Fuel } from '@/models/Fuel';
import { StationFuel } from '@/models/StationFuel';
import Dropdown from '@/components/other/dropdown';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [orderTankings, setOrderTankings] = useState('DESC');
  const { tankings, initTankings, isLoading } = useDatabase();

  const loadTankings = async (orderTankings: string) => {
    await initTankings(orderTankings);
  }
  const onRefresh = useCallback(async () => {
    await loadTankings(orderTankings);
  }, []);

  useEffect(() => {
    loadTankings(orderTankings);
  }, [orderTankings])

  const TankingItem = React.memo(({ item }: { item: { month: string, tankings: (Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[] } }) => {
    return (
      <View style={{ ...spacing.gap(12) }}>
        <ScaledText size='lg' className='font-bold capitalize' style={{ color: isDark ? Colors.dark.text : '' }}>{getDate(item.month).monthLong} {getDate(item.month).year}</ScaledText>
        <View style={{ ...spacing.gap(12) }}>
          {item.tankings.map((item) => (
            <View key={item.id} style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }}>
              <View key={item.id} style={{ ...spacing.gap(12) }} className='flex'>
                <View style={{ ...spacing.gap(12) }} className='flex-row items-center w-full'>
                  <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{item.station?.provider?.slice(0, 2).toUpperCase() ?? '-'}</ScaledText>
                  <View className='flex-row justify-between flex-1'>
                    <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                      <ScaledText isThemed={true} size="lg" className='font-bold'>{item.id} {item.station?.name ?? 'Neznámá stanice'}</ScaledText>
                      <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                        <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                        <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">{item.station?.address ?? 'Bez adresy'}</ScaledText>
                      </View>
                      <View style={{ ...spacing.gap(12) }} className='flex-col'>
                        <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                          <Icon name="calendar" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                          <ScaledText isThemed={true} size="sm">{new Date(item.tank_date).toLocaleDateString("cs-CZ")}, {new Date(item.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                        </View>
                      </View>
                    </View>
                    
                    <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                      <ScaledText isThemed={true} size="lg" className='font-bold'>{item.price} Kč</ScaledText>
                      <ScaledText isThemed={true} size="sm">{item.amount}l</ScaledText>
                      <ScaledText isThemed={true} size="sm">{item.tachometer} km</ScaledText>
                    </View>
                  </View>
                </View>
              </View>
            </View >
          ))}
        </View>
      </View>
    )
  })

  const renderItem = useCallback(
    ({ item }: { item: { month: string, tankings: (Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[] } }) => <TankingItem item={item} />,
    [isDark]
  );

  return (
    <>
        <View className='flex-1' style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
          <VirtualizedList
            ListHeaderComponent={
              <View>
                <Dashboard routePathName={pathname} />
                <View style={{ ...spacing.mt(24), ...spacing.mb(12) }} className='flex-row items-center justify-between'>
                  <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>
                  <Dropdown
                    defaultIndex={0}
                    data={[
                      { value: 'DESC', label: 'Nejnovější' },
                      { value: 'ASC', label: 'Nejstarší' }
                    ]}
                    onChange={(item) => setOrderTankings(item.value)}
                    dropdownStyle={{ ...spacing.borderRadius(12), ...spacing.width(150), ...spacing.borderWidth(0.5), ...spacing.px(12), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary }}
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
            contentContainerStyle={{ ...spacing.gap(12), ...spacing.borderRadius(12), ...spacing.mx(20), ...spacing.pb(96) }}
            renderItem={renderItem}
            horizontal={false}
            getItemCount={(_data: unknown) => tankings.length}
            keyExtractor={(item, index) => tankings[index].month ?? index.toString()}
            getItem={(_data: unknown, index: number) => tankings[index]}
            ListEmptyComponent={<ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.inactive_icon} size="base">Žádné další záznamy</ScaledText>}
          />
        </View>
      <ActionButton />
    </>
  );
}