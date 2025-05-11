import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Tabs from '@/components/ui/tabs';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';

export function TankHistory() {
  const { isDark } = useTheme();

  return (
    <>
      <Tabs className='mb-28'>
        <View className='gap-5'>
          <View className='flex-row items-center gap-3 w-full'>
            <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View className='flex gap-1 items-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View className='flex-row justify-center items-start gap-0.5'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View className='flex gap-1 items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View className='flex gap-3'>
            <View className='flex-row gap-3'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View className='flex-row gap-3'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold'>Cena za litr</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="xs"  className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.primary} textColor={Colors.white} size='xs' value='Plná nádrž' />
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <View className='flex-row justify-center items-start gap-0.5'>
                <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
                <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
              </View>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <View className='flex-row justify-center items-start gap-0.5'>
                <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
                <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
              </View>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <View className='flex-row justify-center items-start gap-0.5'>
                <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
                <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
              </View>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <View className='flex-row justify-center items-start gap-0.5'>
                <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
                <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
              </View>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
      </Tabs>
    </>
  );
}