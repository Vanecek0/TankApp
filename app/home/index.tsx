import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
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
import { useDatabase } from '@/database/databaseContext';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  const [initCount, setInitCount] = useState(1000);
  const [count, setCount] = useState(initCount);
  const [step, setStep] = useState(3);
  const { tankings, isLoading } = useDatabase();

  const [tankingRecords, setTankingRecords] = useState<(Tanking & { station: Station })[]>([]);

  useEffect(() => {

     const loadAllMore = () => {
      if (count == initCount) {
        const data = tankings.slice(0, initCount);
        setTankingRecords(prev => [...prev, ...data]);
      } else {
        const data = tankings.slice((count - step), step);
        setTankingRecords(prev => [...prev, ...data])
      }
      console.log(count);
    };
    //loadAllMore();

    const loadMore = async () => {
      if (count == initCount) {
        const data = await TankingModel.getNextTankingsWithStation(0, initCount);
        setTankingRecords(prev => [...prev, ...data]);
      } else {
        const data = await TankingModel.getNextTankingsWithStation((count - step), step);
        setTankingRecords(prev => [...prev, ...data])
      }
    };
    //loadMore();

  }, [count]);

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
        <Tabs style={{ ...spacing.mx(20) }}>
          {tankings.slice(0,count).map((tanking) => (
            <View key={tanking.id} style={{ ...spacing.gap(12) }} className='flex'>
              <View style={{ ...spacing.gap(12) }} className='flex-row items-center w-full'>
                <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{tanking.station.provider.slice(0, 2).toUpperCase()}</ScaledText>
                <View className='flex-row justify-between flex-1'>
                  <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/3'>
                    <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.id} {tanking.station.name}</ScaledText>
                    <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                      <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                      <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">{tanking.station.address}</ScaledText>
                    </View>
                    <View style={{ ...spacing.gap(12) }} className='flex-col'>
                      <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                        <Icon name="calendar" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                        <ScaledText isThemed={true} size="sm">{new Date(tanking.created_at).toLocaleDateString("cs-CZ")}, {new Date(tanking.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                    <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.price} Kč</ScaledText>
                    <ScaledText isThemed={true} size="sm">{tanking.amount}l</ScaledText>
                    <ScaledText isThemed={true} size="sm">{tanking.tachometer} km</ScaledText>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Tabs>
        <View className='flex'>
          <ScaledText style={{...spacing.p(42)}} onPress={() => /*tankingRecords.length <*/ tankings.length ? setCount(count + step) : null} className="text-center font-bold" color={Colors.inactive_icon} size="base">
            {
              /*tankingRecords.length <*/ tankings.length ? 'Zobrazit další' : 'Žádné další záznamy'
            }
          </ScaledText>
        </View>
      </ScrollView>
      <CustomButton style={{ ...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.borderRadius(90) }} className={`absolute bottom-0 flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}