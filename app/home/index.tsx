import { View, ScrollView, Text } from 'react-native';
import React from 'react';

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

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, ...spacing.py(8) }}>
        <Dashboard routePathName={pathname} />
        <View style={{...spacing.my(20), ...spacing.mx(20)}} className='flex-row justify-between'>
          <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>
          <View className='flex-row items-center'>
            <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
            <Link className="flex" href={'/tank'}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} /></Link>
          </View>
        </View>
        <Tabs style={{...spacing.mx(20)}}>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{...spacing.gap(4)}} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                  <View style={{...spacing.gap(2)}} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                    <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                  </View>
                </View>
                <View style={{...spacing.gap(4)}} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View style={{...spacing.gap(12)}} className='flex-row'>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{...spacing.gap(4)}} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                  <View style={{...spacing.gap(2)}} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                    <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                  </View>
                </View>
                <View style={{...spacing.gap(4)}} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View style={{...spacing.gap(12)}} className='flex-row'>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{...spacing.gap(4)}} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                  <View style={{...spacing.gap(2)}} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                    <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                  </View>
                </View>
                <View style={{...spacing.gap(4)}} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View style={{...spacing.gap(12)}} className='flex-row'>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{...spacing.gap(4)}} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                  <View style={{...spacing.gap(2)}} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                    <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                  </View>
                </View>
                <View style={{...spacing.gap(4)}} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View style={{...spacing.gap(12)}} className='flex-row'>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View style={{...spacing.gap(12)}} className='flex'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center w-full'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <View className='flex-row justify-between flex-1'>
                <View style={{...spacing.gap(4)}} className='flex items-start'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
                  <View style={{...spacing.gap(2)}} className='flex-row justify-center items-center'>
                    <Icon name="map_pin" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                    <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
                  </View>
                </View>
                <View style={{...spacing.gap(4)}} className='flex items-end'>
                  <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View style={{...spacing.gap(12)}} className='flex-row'>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View style={{...spacing.gap(2)}} className='flex-row items-center'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*15} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
        </Tabs>
        <Link style={{...spacing.py(32), ...spacing.my(8)}} className='flex justify-center' href={'/tank'}><ScaledText className="text-center font-bold" color={Colors.inactive_icon} size="base">Zobrazit vše</ScaledText></Link>
      </ScrollView>
      <CustomButton style={{...spacing.p(24), ...spacing.my(12), ...spacing.right(20), ...spacing.borderRadius(90)}} className={`absolute bottom-0 flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}