import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Icon } from '@/components/ui/Icon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F50537",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          android: {
            height: 55
          },
          default: {
            background: colorScheme === 'dark' ? '#222' : '#fff',
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#666' : '#bbb',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Domů',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="tank"
        options={{
          title: 'Tankování',
          tabBarIcon: ({ color }) => <Icon name="tank" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Servis',
          tabBarIcon: ({ color }) => <Icon name="car_repair" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="station"
        options={{
          title: 'Stanice',
          tabBarIcon: ({ color }) => <Icon name="map_pin" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
    </Tabs>
  );
}
