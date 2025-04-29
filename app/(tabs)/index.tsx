import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';

export default function HomeScreen() {
  const { toggleColorScheme, isDark } = useTheme();

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          className="bg-blue-500 dark:bg-blue-700 p-3 rounded-lg"
          onPress={toggleColorScheme}
        >
          <Text className="text-white text-center font-medium">
            Přepnout na {isDark ? 'světlý' : 'tmavý'} režim
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}