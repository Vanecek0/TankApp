import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Tabs from '@/components/ui/tabs';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import counterReducer, { initialState } from '@/redux/reducers/counterReducer';
import { Tanking, TankingModel } from '@/models/Tanking';
import { Station } from '@/models/Station';

export function TankHistory() {
  const { isDark } = useTheme();

  const [state, dispatch] = useReducer(counterReducer, initialState)

  const [tankingRecords, setTankingRecords] = useState<(Tanking & { station: Station })[]>([]);
  const [tankingRecordsCount, setTankingRecordsCount] = useState(0);

  const getTankingCount = async () => {
    const count = await TankingModel.count();
    setTankingRecordsCount(count)
  };
  getTankingCount();

  useEffect(() => {
    const loadMore = async () => {
      const data = await TankingModel.getNextTankingsWithStation(state.value, state.stepSize);
      setTankingRecords(prev => [...prev, ...data]);
    };
    loadMore();

  }, [state.value]);


  return (
    <>
      <View style={{ ...spacing.mb(20), ...spacing.mt(12) }} className='flex-row justify-between'>
        <ScaledText size='lg' className='font-bold' isThemed={true}>Historie tankování</ScaledText>
        <View className='flex-row items-center'>
          <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
          <Link className="flex" href={"/tank"}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} /></Link>
        </View>
      </View>
      <Tabs>
        {tankingRecords.map((tanking) => (
          <View key={tanking.id} style={{ ...spacing.gap(20) }}>
            <View style={{ ...spacing.gap(12) }} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{tanking.station.provider.slice(0, 2).toUpperCase()}</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{ ...spacing.gap(4) }} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.station.name}</ScaledText>
                  <View style={{ ...spacing.gap(2) }} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 15} />
                    <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible w-2/3' isThemed={true} size="sm">{tanking.station.address}</ScaledText>
                  </View>
                </View>
                <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>{tanking.price} Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm" className='text-xs'>{tanking.amount}l</ScaledText>
                </View>
              </View>
            </View>
            <View style={{ ...spacing.gap(12) }} className='flex'>
              <View style={{ ...spacing.gap(12) }} className='flex-row'>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{new Date(tanking.created_at).toLocaleDateString("cs-CZ")}, {new Date(tanking.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                </View>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{tanking.tachometer} km</ScaledText>
                </View>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{tanking.fuel_type}</ScaledText>
                </View>
              </View>
              <View style={{ ...spacing.gap(12) }} className='flex-row'>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{tanking.price_per_unit} Kč/l</ScaledText>
                </View>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{tanking.mileage} km</ScaledText>
                </View>
                <View className='basis-1/3'>
                  <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                  <ScaledText isThemed={true} size="xs" >{((tanking.amount / tanking.mileage) * 100).toFixed(2)} l/100km</ScaledText>
                </View>
              </View>
            </View>
            <Badge badgeColor={Colors.badge.green} textColor={Colors.white} size='xs' value='Plná nádrž' />
          </View>
        )
        )}
      </Tabs>
      <View style={{ ...spacing.my(42) }} className='flex'>
        <ScaledText onPress={() => tankingRecords.length < tankingRecordsCount ? dispatch({ type: 'ADD_NEXT_STEP_ACTION' }) : null} className="text-center font-bold" color={Colors.inactive_icon} size="base">
          {
            tankingRecords.length < tankingRecordsCount ? 'Zobrazit další' : 'Žádné další záznamy'
          }
        </ScaledText>
      </View>
    </>
  );
}