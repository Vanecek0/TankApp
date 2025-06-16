import { RefreshControl, View, VirtualizedList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Dashboard from '@/components/ui/dashboard';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import getScaleFactor, { scaled } from '@/utils/SizeScaling';
import { spacing } from '@/utils/SizeScaling';
import { Tanking, TankingModel } from '@/models/Tanking';
import { useDatabase } from '@/database/databaseContext';
import ActionButton from '@/components/ui/actionButton';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const { tankings, initTankings, isLoading } = useDatabase();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    await initTankings();
  }, []);

  const TankingItem = React.memo(({ item }: any) => {
    return (
      <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }}>
        <View key={item.id} style={{ ...spacing.gap(12) }} className='flex'>
          <View style={{ ...spacing.gap(12) }} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{item.station.provider.slice(0, 2).toUpperCase()}</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>{item.id} {item.station.name}</ScaledText>
                <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                  <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                  <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">{item.station.address}</ScaledText>
                </View>
                <View style={{ ...spacing.gap(12) }} className='flex-col'>
                  <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                    <Icon name="calendar" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                    <ScaledText isThemed={true} size="sm">{new Date(item.created_at).toLocaleDateString("cs-CZ")}, {new Date(item.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
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
      </View>
    )
  })

  const renderItem = useCallback(
    ({ item }: { item: Tanking }) => <TankingItem item={item} />,
    [isDark]
  );

  return (
    <>
      <View className='flex-1' style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
        {/*allTankings.map((item) => (
          <ScaledText size='base'>{item.id}</ScaledText>
        ))*/}

        <VirtualizedList
          ListHeaderComponent={
            <>
              <Dashboard routePathName={pathname} />
              <View style={{ ...spacing.mt(24), ...spacing.mb(12) }} className='flex-row justify-between'>
                <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>
                <View className='flex-row items-center'>
                  <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
                  <Link className="flex" href={'/tank'}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} /></Link>
                </View>
              </View>
            </>
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          initialNumToRender={5}
          maxToRenderPerBatch={3}
          windowSize={5}
          contentContainerStyle={{ ...spacing.gap(12), ...spacing.borderRadius(12), ...spacing.mx(20), ...spacing.pb(96) }}
          renderItem={renderItem}
          getItemCount={(_data: unknown) => tankings.length}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          getItem={(_data: unknown, index: number) => tankings[index]}
          ListEmptyComponent={<ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.inactive_icon} size="base">Žádné další záznamy</ScaledText>}
        />
      </View>
      <ActionButton />
    </>
  );
}