import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import Tabs from '../components/ui/tabs';
import Dashboard from '../components/ui/dashboard';
import { usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '../components/other/scaledText';

export default function HomeScreen() {
  const { toggleColorScheme, isDark } = useTheme();
  const pathname = usePathname();

  return (
    <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className='py-2'>
      <Dashboard routePathName={pathname} />
      <TouchableOpacity
        className="bg-blue-500 dark:bg-blue-700 p-3 rounded-lg"
        onPress={toggleColorScheme}
      >
        <Text className="text-white text-center font-medium">
          Přepnout na {isDark ? 'světlý' : 'tmavý'} režim
        </Text>
      </TouchableOpacity>
      <Tabs>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
        <View className='flex-row items-center gap-3 w-full'>
          <ScaledText className='p-4 rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold" }} size='base'>SH</ScaledText>
          <View className='flex-row justify-between flex-1'>
            <View className='flex gap-1 items-start'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>Shell</ScaledText>
              <ScaledText isThemed={true} size="sm">Koterovská 156, Plzeň</ScaledText>
            </View>
            <View className='flex gap-1 items-end'>
              <ScaledText isThemed={true} size="lg" className='font-bold'>1200 Kč</ScaledText>
              <ScaledText isThemed={true} size="sm" className='text-xs'>30.5l</ScaledText>
            </View>
          </View>
        </View>
      </Tabs>
    </ScrollView>
  );
}