import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Graph from '@/components/ui/graph/Graph';
import { spacing } from '@/utils/SizeScaling';

export function TankStatistics() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <View style={{ ...spacing.gap(12) }} className='flex'>
      <View style={{ ...spacing.mt(16) }} className='flex-row flex-wrap justify-between'>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
          <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
            <Icon name="bars" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná cena</ScaledText>
          </View>
          <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>38.90 Kč/l</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>+0.9 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
          <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
            <Icon name="trending" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Měsíční náklady</ScaledText>
          </View>
          <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>3240 Kč</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>-240 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
          <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
            <Icon name="average" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná spotřeba</ScaledText>
          </View>
          <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>6.9 l/100km</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>-0.1 od min. měs.</ScaledText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
          <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
            <Icon name="droplet" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
            <ScaledText size='xs' className='font-bold' isThemed={true}>Celkem natankováno</ScaledText>
          </View>
          <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
            <ScaledText size='lg' className='font-bold' isThemed={true}>81.2 l</ScaledText>
            <ScaledText size='xs' color={Colors.hidden_text}>+5.1 od min. měs.</ScaledText>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8)  }} className={`basis-[48.5%] rounded-lg`}>
        <ScaledText style={{...spacing.mb(32)}} size='lg' className='font-bold' isThemed={true}>Vývoj ceny paliva</ScaledText>
        <Graph routePathName={pathname + "/statistics"}></Graph>
      </View>
      <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8)  }} className={`basis-[48.5%] rounded-lg`}>
        <ScaledText style={{...spacing.mb(12)}} size='lg' className='font-bold' isThemed={true}>Nejčastější čerpací stanice</ScaledText>
        <View style={{...spacing.my(8)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center justify-between w-full'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
        <View style={{...spacing.my(8)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center justify-between w-full'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
        <View style={{...spacing.my(8)}}>
          <View style={{...spacing.gap(12)}} className='flex-row items-center justify-between w-full'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center'>
              <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
            </View>
            <View>
              <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
              <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}