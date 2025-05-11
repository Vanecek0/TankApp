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
        <View className='flex-row mx-5 my-5 justify-between'>
          <ScaledText size='lg' className='font-bold' isThemed={true}>Historie tankování</ScaledText>
          <View className='flex-row'>
            <ScaledText size='base' className='font-bold' isThemed={true}>Nejnovější</ScaledText>
            <Link className="flex" href={"/(tank)"}><Icon name="chevron_down" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 28, height: 28 }} /></Link>
          </View>
        </View>
        <TabView
          className='mx-5'
          tabStyle={{ marginRight: 5, paddingVertical: 10, marginBottom: 5}}
          activeTabStyle={{borderBottomWidth: 3, borderRadius: 8, borderBottomColor: Colors.hidden_text, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white}}
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