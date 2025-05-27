import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Tabs from '@/components/ui/tabs';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';
import { spacing } from '@/utils/SizeScaling';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

export function TankHistory() {
  const { isDark } = useTheme();

  const tankingActiveCount = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <View style={{...spacing.mb(20), ...spacing.mt(12)}} className='flex-row justify-between'>
        <ScaledText size='lg' className='font-bold' isThemed={true}>Historie tankování</ScaledText>
        <Text>{tankingActiveCount}</Text>
        <View className='flex-row items-center'>
          <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
          <Link className="flex" href={"/tank"}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} /></Link>
        </View>
      </View>
      <Tabs>
        <View style={{...spacing.gap(20)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{...spacing.gap(4)}} className='flex items-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View style={{...spacing.gap(2)}} className='flex-row justify-center items-start'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View style={{...spacing.gap(4)}} className='flex items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.badge.green} textColor={Colors.white} size='xs' value='Plná nádrž' />
        </View>
        <View style={{...spacing.gap(20)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{...spacing.gap(4)}} className='flex items-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View style={{...spacing.gap(2)}} className='flex-row justify-center items-start'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View style={{...spacing.gap(4)}} className='flex items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.badge.orange} textColor={Colors.white} size='xs' value='Půl nádrže' />
        </View>
        <View style={{...spacing.gap(20)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{...spacing.gap(4)}} className='flexitems-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View style={{...spacing.gap(2)}} className='flex-row justify-center items-start'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View style={{...spacing.gap(4)}} className='flex items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.badge.red} textColor={Colors.white} size='xs' value='Na dojezd' />
        </View>
        <View style={{...spacing.gap(20)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{...spacing.gap(4)}} className='flex items-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View style={{...spacing.gap(2)}} className='flex-row justify-center items-start'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View style={{...spacing.gap(4)}} className='flex items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.badge.red} textColor={Colors.white} size='xs' value='Plná nádrž' />
        </View>
        <View style={{...spacing.gap(20)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
            <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
            <View className='flex-row justify-between flex-1'>
              <View style={{...spacing.gap(4)}} className='flex items-start'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                <View style={{...spacing.gap(2)}} className='flex-row justify-center items-start'>
                  <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
                  <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                </View>
              </View>
              <View style={{...spacing.gap(4)}} className='flex items-end'>
                <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                <ScaledText isThemed={true} size="xs" >10.04.2025, 17:49</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                <ScaledText isThemed={true} size="xs" >78 450 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                <ScaledText isThemed={true} size="xs" >Natural 95</ScaledText>
              </View>
            </View>
            <View style={{...spacing.gap(12)}} className='flex-row'>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                <ScaledText isThemed={true} size="xs" >39.30 Kč/l</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                <ScaledText isThemed={true} size="xs" >423 km</ScaledText>
              </View>
              <View className='basis-1/3'>
                <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                <ScaledText isThemed={true} size="xs" >7.2l/100km</ScaledText>
              </View>
            </View>
          </View>
          <Badge badgeColor={Colors.badge.red} textColor={Colors.white} size='xs' value='Plná nádrž' />
        </View>
      </Tabs>
    </>
  );
}