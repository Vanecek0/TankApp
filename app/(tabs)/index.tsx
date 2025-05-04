import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import Tabs from '../components/ui/tabs';
import Dashboard from '../components/ui/dashboard';
import { usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const { toggleColorScheme, isDark } = useTheme();
  const pathname = usePathname();

  return (
    <ScrollView style={{backgroundColor: isDark ? Colors.dark.background : Colors.light.background}} className='py-2'>
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
        <View>
          <View className='flex justify-between'>
            <View className='flex'>
              <View className='flex-row justify-between'>
                <Text style={{color: isDark ? Colors.dark.text : Colors.light.text}} className='font-bold'>Shell</Text>
                <Text className='font-bold'>1200 Kč</Text>
              </View>
              <View className='flex-row justify-between gap-3'>
                <Text className='text-xs'>Koterovská 156, 326 00 Plzeň 2-Slovany</Text>
                <Text className='text-xs'>30.5l</Text>
              </View>
            </View>
          </View>
        </View>
      </Tabs>
    </ScrollView>
  );
}