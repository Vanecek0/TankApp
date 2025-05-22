import { View, ScrollView, Text, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Dashboard from '@/components/ui/dashboard';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import CustomButton from '@/components/other/customButton';
import TabView from '@/components/other/tabView';
import { TankHistory } from './tabs/history';
import { TankStatistics } from './tabs/statistics';
import { spacing } from '@/utils/SizeScaling';

export default function TankScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, ...spacing.py(8) }}>
        <Dashboard routePathName={pathname} />
        <TabView
          containerStyle={{...spacing.m(20), ...spacing.mb(112)}}
          tabStyle={{...spacing.py(10), ...spacing.mb(5)}}
          activeTabStyle={{borderBottomWidth: 3, borderBottomColor: Colors.hidden_text, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white}}
          activeTabTextStyle={{color: isDark ? Colors.dark.text : Colors.light.text}}
          tabTextStyle={{ textAlign: "center", color: Colors.inactive_icon }}
          tabs={[
            { key: '1', title: 'Seznam', content: <TankHistory></TankHistory> },
            { key: '2', title: 'Statistiky', content: <TankStatistics></TankStatistics> },
          ]}
        />
      </ScrollView>
      <CustomButton style={{...spacing.borderRadius(90), ...spacing.p(24), ...spacing.my(12), ...spacing.right(20)}} className={`absolute bottom-0  flex justify-center items-center aspect-square`} label='+' labelSize='xl' labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}