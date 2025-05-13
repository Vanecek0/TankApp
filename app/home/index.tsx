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

export default function HomeScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className='py-2'>
        <Dashboard routePathName={pathname} />
        <View className='flex-row mx-5 my-5 justify-between'>
          <ScaledText size='lg' className='font-bold' isThemed={true}>Poslední záznamy</ScaledText>
          <View className='flex-row'>
            <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
            <Link className="flex" href={'/tank'}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 28, height: 28 }} /></Link>
          </View>
        </View>
        <Tabs className='mx-5'>
          <View className='flex gap-3'>
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
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='flex-row gap-3'>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View className='flex gap-3'>
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
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='flex-row gap-3'>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View className='flex gap-3'>
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
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='flex-row gap-3'>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View className='flex gap-3'>
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
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='flex-row gap-3'>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
          <View className='flex gap-3'>
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
                  <ScaledText isThemed={true} size="sm">30.5l</ScaledText>
                </View>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='flex-row gap-3'>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">10.04.2025</ScaledText>
                </View>
                <View className='flex-row items-center gap-0.5'>
                  <Icon name="clock" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
                  <ScaledText isThemed={true} size="sm">17:49</ScaledText>
                </View>
              </View>
              <ScaledText isThemed={true} size="sm">78 450 km</ScaledText>
            </View>
          </View>
        </Tabs>
        <Link className='py-8 my-2 flex justify-center' href={'/tank'}><ScaledText className="text-center font-bold" color={Colors.inactive_icon} size="base">Zobrazit vše</ScaledText></Link>
      </ScrollView>
      <CustomButton className={`absolute p-6 my-3 bottom-0 right-5 flex justify-center items-center aspect-square`} label='+' labelSize='xl' roundedRadius={90} labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}