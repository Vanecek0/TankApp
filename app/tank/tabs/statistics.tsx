import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Graph from '@/components/ui/graph/Graph';

export function TankStatistics() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <View className='flex-row flex-wrap justify-between mt-4'>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
          <View className='flex-row items-center gap-1'>
            <Icon name="bars" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná cena</ScaledText>
          </View>
          <View className='flex justify-between gap-3 mt-4'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>38.90 Kč/l</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>+0.9 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
          <View className='flex-row items-center gap-1'>
            <Icon name="trending" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Měsíční náklady</ScaledText>
          </View>
          <View className='flex justify-between gap-3 mt-4'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>3240 Kč</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>-240 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
          <View className='flex-row items-center gap-1'>
            <Icon name="average" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná spotřeba</ScaledText>
          </View>
          <View className='flex justify-between gap-3 mt-4'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>6.9 l/100km</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>-0.1 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
          <View className='flex-row items-center gap-1'>
            <Icon name="droplet" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Celkem natankováno</ScaledText>
          </View>
          <View className='flex justify-between gap-3 mt-4'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>81.2 l</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>+5.1 od min. měs.</ScaledText>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
      <ScaledText size='lg' className='font-bold mb-3' isThemed={true}>Vývoj ceny paliva</ScaledText>
        <Graph routePathName={pathname + "/statistics"}></Graph>
      </View>
      <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
        <ScaledText size='lg' className='font-bold mb-3' isThemed={true}>Nejčastější čerpací stanice</ScaledText>
        <View className='my-2'>
          <View className='flex-row items-center justify-between gap-3 w-full'>
            <View className='flex-row items-center gap-3'>
              <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
        <View className='my-2'>
          <View className='flex-row items-center justify-between gap-3 w-full'>
            <View className='flex-row items-center gap-3'>
              <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
        <View className='my-2'>
          <View className='flex-row items-center justify-between gap-3 w-full'>
            <View className='flex-row items-center gap-3'>
              <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}