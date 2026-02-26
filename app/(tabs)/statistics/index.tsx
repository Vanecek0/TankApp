import { Animated, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import TankLineGraph from '@/components/graphs/TankLineGraph';
import { tankingStatisticsRepository } from '@/repositories/tankingStatisticsRepository';
import { TankingStatistics } from '@/models/TankingStatistics';
import CollapsibleScroll from '@/components/CollapsibleScroll';
import { LinearGradient } from 'expo-linear-gradient';
import darkenHexColor from '@/utils/colorDarken';
import Dashboard from '@/components/dashboards';

export default function TankStatistics() {
  const { isDark } = useTheme();
  const [statistics, setStatistics] = useState<TankingStatistics[]>([]);

  useEffect(() => {
    async function getStats() {
      const stats = await tankingStatisticsRepository.getAll();
      setStatistics(stats);
    }
    getStats();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!statistics.length) return null;

  const avgPriceNow =
    statistics[0]?.total_price && statistics[0]?.total_amount
      ? statistics[0].total_price / statistics[0].total_amount
      : null;

  const avgPricePrev =
    statistics[1]?.total_price && statistics[1]?.total_amount
      ? statistics[1].total_price / statistics[1].total_amount
      : null;

  const monthlyCostNow = statistics[0]?.total_price ?? null;
  const monthlyCostPrev = statistics[1]?.total_price ?? null;

  const avgConsumptionNow =
    statistics.length >= 2 && statistics[0]?.last_tachometer && statistics[1]?.last_tachometer && statistics[0]?.total_amount
      ? ((statistics[0].last_tachometer - statistics[1].last_tachometer) / statistics[0].total_amount).toFixed(2)
      : null;

  const avgConsumptionDiff =
    statistics.length >= 3 &&
      statistics[0]?.total_amount &&
      statistics[1]?.total_amount &&
      statistics[0]?.last_tachometer &&
      statistics[1]?.last_tachometer &&
      statistics[2]?.last_tachometer
      ? (
        (statistics[0].total_amount / (statistics[0].last_tachometer - statistics[1].last_tachometer)) * 100 -
        (statistics[1].total_amount / (statistics[1].last_tachometer - statistics[2].last_tachometer)) * 100
      )
        .toFixed(1)
        .replace(/^(-?)(\d)/, (_, sign, d) => (sign === '-' ? '-' : '+') + d)
      : null;

  const totalAmountNow = statistics[0]?.total_amount ?? null;
  const totalAmountPrev = statistics[1]?.total_amount ?? null;

  return (
    <>
      <View
        className='flex-1'
        style={{
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light
        }}
      >
        <CollapsibleScroll
          header={(scrollY) =>
            <View>
              <LinearGradient
                colors={[Colors.base.primary, darkenHexColor(Colors.base.primary, -15)]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  height: '75%',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <View style={{ ...spacing.mx(20) }}>
                <Dashboard scrollRefVal={scrollY} />
              </View>
            </View>
          }
          scrollYValue={scrollY}

        >
          <Animated.ScrollView style={{ ...spacing.mx(20), ...spacing.gap(12), ...spacing.my(12) }} className='flex'>
            <View className='flex-row flex-wrap justify-between'>
              {/* Průměrná cena */}
              <View
                style={{
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                  ...spacing.p(12),
                  ...spacing.mb(12),
                  ...spacing.borderRadius(8),
                }}
                className={`basis-[48.5%]`}
              >
                <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
                  <Icon name="bars" color={Colors.base.primary} size={getScaleFactor() * 20} />
                  <ScaledText size='base' className='font-bold' isThemed={true}>
                    Průměrná cena
                  </ScaledText>
                </View>
                <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                  <ScaledText size='lg' className='font-bold' isThemed={true}>
                    {avgPriceNow ? `${avgPriceNow.toFixed(2)} Kč/l` : '-'}
                  </ScaledText>
                  <ScaledText size='xs' color={Colors.text.muted}>
                    {avgPricePrev !== null && avgPriceNow !== null
                      ? `${(avgPriceNow - avgPricePrev >= 0 ? '+' : '')}${(avgPriceNow - avgPricePrev).toFixed(2)} od min. měs.`
                      : '- od min. měs.'}
                  </ScaledText>
                </View>
              </View>

              {/* Měsíční náklady */}
              <View
                style={{
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                  ...spacing.p(12),
                  ...spacing.mb(12),
                  ...spacing.borderRadius(8),
                }}
                className={`basis-[48.5%]`}
              >
                <View style={{ ...spacing.gap(6) }} className='flex-row items-center'>
                  <Icon name="trending" color={Colors.base.primary} size={getScaleFactor() * 20} />
                  <ScaledText size='base' className='font-bold' isThemed={true}>
                    Měsíční náklady
                  </ScaledText>
                </View>
                <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                  <ScaledText size='lg' className='font-bold' isThemed={true}>
                    {monthlyCostNow !== null ? `${monthlyCostNow} Kč` : '- Kč'}
                  </ScaledText>
                  <ScaledText size='xs' color={Colors.text.muted}>
                    {monthlyCostPrev !== null && monthlyCostNow !== null
                      ? `${(monthlyCostNow - monthlyCostPrev >= 0 ? '+' : '')}${monthlyCostNow - monthlyCostPrev} od min. měs.`
                      : '- od min. měs.'}
                  </ScaledText>
                </View>
              </View>

              {/* Průměrná spotřeba */}
              <View
                style={{
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                  ...spacing.p(12),
                  ...spacing.borderRadius(8),
                }}
                className={`basis-[48.5%]`}
              >
                <View style={{ ...spacing.gap(6) }} className='flex-row items-center'>
                  <Icon name="average" color={Colors.base.primary} size={getScaleFactor() * 20}  />
                  <ScaledText size='base' className='font-bold' isThemed={true}>
                    Průměrná spotřeba
                  </ScaledText>
                </View>
                <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                  <ScaledText size='lg' className='font-bold' isThemed={true}>
                    {avgConsumptionNow ? `${avgConsumptionNow} l/100km` : '- l/100km'}
                  </ScaledText>
                  <ScaledText size='xs' color={Colors.text.muted}>
                    {avgConsumptionDiff ? `${avgConsumptionDiff} od min. měs.` : '- od min. měs.'}
                  </ScaledText>
                </View>
              </View>

              {/* Celkem natankováno */}
              <View
                style={{
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                  ...spacing.p(12),
                  ...spacing.borderRadius(8),
                }}
                className={`basis-[48.5%]`}
              >
                <View style={{ ...spacing.gap(6) }} className='flex-row items-center'>
                  <Icon name="droplet" color={Colors.base.primary} size={getScaleFactor() * 20}  />
                  <ScaledText size='base' className='font-bold' isThemed={true}>
                    Celkem jednotek
                  </ScaledText>
                </View>
                <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                  <ScaledText size='lg' className='font-bold' isThemed={true}>
                    {totalAmountNow !== null ? `${totalAmountNow} l` : '- l'}
                  </ScaledText>
                  <ScaledText size='xs' color={Colors.text.muted}>
                    {totalAmountNow !== null && totalAmountPrev !== null
                      ? `${(totalAmountNow - totalAmountPrev >= 0 ? '+' : '')}${totalAmountNow - totalAmountPrev} od min. měs.`
                      : '- od min. měs.'}
                  </ScaledText>
                </View>
              </View>
            </View>

            {/* Vývoj ceny paliva */}
            <View
              style={{
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                ...spacing.mt(12),
                ...spacing.p(20),
                ...spacing.borderRadius(8),
              }}
              className={`basis-[48.5%] rounded-lg`}
            >
              <ScaledText style={{ ...spacing.mb(32) }} size='lg' className='font-bold' isThemed={true}>
                Vývoj ceny paliva
              </ScaledText>
              <TankLineGraph />
            </View>

            {/* Nejčastější čerpací stanice */}
            <View
              style={{
                backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                ...spacing.mt(12),
                ...spacing.p(20),
                ...spacing.borderRadius(8),
              }}
              className={`basis-[48.5%] rounded-lg`}
            >
              <ScaledText style={{ ...spacing.mb(12) }} size='lg' className='font-bold' isThemed={true}>
                Nejčastější čerpací stanice
              </ScaledText>
              <View style={{ ...spacing.my(8) }}>
                <View style={{ ...spacing.gap(12) }} className='flex-row items-center justify-between w-full'>
                  <View style={{ ...spacing.gap(12) }} className='flex-row items-center'>
                    <ScaledText className='rounded-full' style={{ backgroundColor: 'lightgray', fontWeight: 'bold', ...spacing.p(16) }} size='base'>
                      SH
                    </ScaledText>
                    <ScaledText size='lg' className='font-bold' isThemed={true}>
                      Shell
                    </ScaledText>
                  </View>
                  <View>
                    <ScaledText size='base' className='font-bold' isThemed={true}>
                      10 návštěv
                    </ScaledText>
                    <ScaledText size='sm' isThemed={true}>
                      40.00 Kč/l
                    </ScaledText>
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
        </CollapsibleScroll>
      </View>
    </>
  );
}