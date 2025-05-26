import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Dashboard from '@/components/ui/dashboard';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Tabs from '@/components/ui/tabs';
import CustomButton from '@/components/other/customButton';
import getScaleFactor, { scaled } from '@/utils/SizeScaling';
import { spacing } from '@/utils/SizeScaling';
import { Tanking, TankingModel } from '@/models/Tanking';
import { Station } from '@/models/Station';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  const [tankingRecords, setTankingRecords] = useState<(Tanking & { station: Station })[]>([]);
  const [tankingActiveRecords, setTankingActiveRecords] = useState(2);
  const [tankingRecordsCount, setTankingRecordsCount] = useState(0);


  const loadMore = () => {
    setTankingActiveRecords(tankingActiveRecords + 3)
  }

  useEffect(() => {
    const getTankingCount = async () => {
      const count = await TankingModel.count();
      setTankingRecordsCount(count)
    };

    getTankingCount();
  }, [])

  useEffect(() => {
    const load = async () => {
      const data = await TankingModel.getAllTankingsWithStation(tankingActiveRecords);
      setTankingRecords(data);
    };
    load();
  }, [tankingActiveRecords]);

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, ...spacing.py(8) }}>
        <Dashboard routePathName={pathname} />
        <View style={{ ...spacing.my(20), ...spacing.mx(20) }} className='flex-row justify-between'>
          <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>

          <View className='flex-row items-center'>
            <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
            <Link className="flex" href={'/tank'}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} /></Link>
          </View>
        </View>
        <Tabs className='mb-' style={{ ...spacing.mx(20) }}>
          {tankingRecords.map((tanking) => (
            <View key={tanking.id} style={{ ...spacing.gap(12) }} className='flex'>
              <View style={{ ...spacing.gap(12) }} className='flex-row items-center w-full'>
                <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{tanking.station.provider.slice(0, 2).toUpperCase()}</ScaledText>
                <View className='flex-row justify-between flex-1'>
                  <View style={{ ...spacing.gap(4) }} className='flex items-start'>
                    <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.station.name}</ScaledText>
                    <View style={{ ...spacing.gap(2) }} className='flex-row justify-center items-center'>
                      <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 15} />
                      <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible w-3/4' isThemed={true} size="sm">{tanking.station.address}</ScaledText>
                    </View>
                  </View>
                  <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                    <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.price} Kč</ScaledText>
                    <ScaledText isThemed={true} size="sm">{tanking.amount}l</ScaledText>
                  </View>
                </View>
              </View>
              <View className='flex-row justify-between'>
                <View style={{ ...spacing.gap(12) }} className='flex-row'>
                  <View style={{ ...spacing.gap(2) }} className='flex-row items-center'>
                    <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 15} />
                    <ScaledText isThemed={true} size="sm">{new Date(tanking.created_at).toLocaleDateString("cs-CZ")}</ScaledText>
                  </View>
                  <View style={{ ...spacing.gap(2) }} className='flex-row items-center'>
                    <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 15} />
                    <ScaledText isThemed={true} size="sm">{new Date(tanking.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                  </View>
                </View>
                <ScaledText isThemed={true} size="sm">{tanking.tachometer} km</ScaledText>
              </View>
            </View>
          ))}
        </Tabs>
        <View style={{ ...spacing.my(42) }} className='flex'>
          <ScaledText onPress={() => loadMore()} className="text-center font-bold" color={Colors.inactive_icon} size="base">
            {
              tankingActiveRecords < tankingRecordsCount ? 'Zobrazit další' : 'Žádné další záznamy'
            }
          </ScaledText>
        </View>
      </ScrollView>
      <CustomButton style={{ ...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.borderRadius(90) }} className={`absolute bottom-0 flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}