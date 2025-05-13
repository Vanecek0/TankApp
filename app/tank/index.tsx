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

export default function TankScreen() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className='py-2'>
        <Dashboard routePathName={pathname} />
        <TabView
          className='m-5'
          tabStyle={{paddingVertical: 10, marginBottom: 5}}
          activeTabStyle={{borderBottomWidth: 3, borderBottomColor: Colors.hidden_text, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white}}
          activeTabTextStyle={{color: isDark ? Colors.dark.text : Colors.light.text}}
          tabTextStyle={{ textAlign: "center", color: Colors.inactive_icon }}
          tabs={[
            { key: '1', title: 'Seznam', content: <TankHistory></TankHistory> },
            { key: '2', title: 'Statistiky', content: <TankStatistics></TankStatistics> },
          ]}
        />
      </ScrollView>
      <CustomButton className={`absolute p-6 my-3 bottom-0 right-5 flex justify-center items-center aspect-square`} label='+' labelSize='xl' roundedRadius={90} labelColor={Colors.white} backgroundColor={Colors.primary} />
    </>
  );
}