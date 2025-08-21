import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import Graph from '@/components/common/Graph';
import { spacing } from '@/utils/SizeScaling';
import { TankingStatistics, TankingStatisticsModel } from '@/models/TankingStatistics';

export default function TankStatistics() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  const [statistics, setStatistics] = useState<TankingStatistics[]>([]);

  useEffect(() => {
    async function getStats() {
      const stats = await TankingStatisticsModel.all();
      setStatistics(stats);
    }
    getStats();
  }, []);

  if (!statistics.length) return null;

  return (
    <>
      <View style={{ ...spacing.gap(12), ...spacing.mb(112) }} className='flex'>
        <View style={{ ...spacing.mt(8) }} className='flex-row flex-wrap justify-between'>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
              <Icon name="bars" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná cena</ScaledText>
            </View>
            <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>{(statistics[0].total_price / statistics[0].total_amount).toFixed(2)} Kč/l</ScaledText>
              <ScaledText size='xs' color={Colors.hidden_text}>
                {statistics.length >= 2
                  ? `${((statistics[0].total_price / statistics[0].total_amount) - (statistics[1].total_price / statistics[1].total_amount) >= 0 ? '+' : '')}${((statistics[0].total_price / statistics[0].total_amount) - (statistics[1].total_price / statistics[1].total_amount)).toFixed(2)} od min. měs.`
                  : '-'}
              </ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
              <Icon name="trending" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Měsíční náklady</ScaledText>
            </View>
            <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>{statistics.length > 0 ? statistics[0].total_price : '-'} Kč</ScaledText>
              <ScaledText size='xs' color={Colors.hidden_text}>
                {statistics.length >= 2
                  ? `${((statistics[0].total_price - statistics[1].total_price) >= 0 ? '+' : '')}${(statistics[0].total_price - statistics[1].total_price)} od min. měs.`
                  : '-'}
              </ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
              <Icon name="average" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrná spotřeba</ScaledText>
            </View>
            <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>{statistics.length > 0 ? ((statistics[0].last_tachometer - statistics[1].last_tachometer) / statistics[0].total_amount).toFixed(2) : '-'} l/100km</ScaledText>
              <ScaledText size='xs' color={Colors.hidden_text}>
                {statistics.length >= 3
                  ? `${((statistics[0].total_amount / (statistics[0].last_tachometer - statistics[1].last_tachometer)) * 100 -
                    (statistics[1].total_amount / (statistics[1].last_tachometer - statistics[2].last_tachometer)) * 100
                  ).toFixed(1).replace(/^(-?)(\d)/, (_, sign, d) => (sign === '-' ? '-' : '+') + d)} od min. měs.`
                  : '-'}
              </ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
              <Icon name="droplet" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Celkem natankováno</ScaledText>
            </View>
            <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>{statistics[0].total_amount} l</ScaledText>
              <ScaledText size='xs' color={Colors.hidden_text}>
              {statistics.length >= 2
                  ? `${((statistics[0].total_amount - statistics[1].total_amount) >= 0 ? '+' : '')}${(statistics[0].total_amount - statistics[1].total_amount)} od min. měs.`
                  : '-'}
              </ScaledText>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }} className={`basis-[48.5%] rounded-lg`}>
          <ScaledText style={{ ...spacing.mb(32) }} size='lg' className='font-bold' isThemed={true}>Vývoj ceny paliva</ScaledText>
          <Graph data={statistics} routePathName={pathname + "/statistics"}></Graph>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.borderRadius(8) }} className={`basis-[48.5%] rounded-lg`}>
          <ScaledText style={{ ...spacing.mb(12) }} size='lg' className='font-bold' isThemed={true}>Nejčastější čerpací stanice</ScaledText>
          <View style={{ ...spacing.my(8) }}>
            <View style={{ ...spacing.gap(12) }} className='flex-row items-center justify-between w-full'>
              <View style={{ ...spacing.gap(12) }} className='flex-row items-center'>
                <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
                <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
              </View>
              <View>
                <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
                <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{ ...spacing.my(8) }}>
            <View style={{ ...spacing.gap(12) }} className='flex-row items-center justify-between w-full'>
              <View style={{ ...spacing.gap(12) }} className='flex-row items-center'>
                <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>SH</ScaledText>
                <ScaledText size='lg' className='font-bold' isThemed={true}>Shell</ScaledText>
              </View>
              <View>
                <ScaledText size='base' className='font-bold' isThemed={true}>10 návštěv</ScaledText>
                <ScaledText size='sm' isThemed={true}>40.00 Kč/l</ScaledText>
              </View>
            </View>
          </View>
          <View style={{ ...spacing.my(8) }}>
            <View style={{ ...spacing.gap(12) }} className='flex-row items-center justify-between w-full'>
              <View style={{ ...spacing.gap(12) }} className='flex-row items-center'>
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
    </>
  );
}