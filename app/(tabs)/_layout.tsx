import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

import "@/app/globals.css"
import Icon from '../components/ui/Icon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F50537",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          android: {
            height: 55
          },
          default: {
            background: colorScheme === 'dark' ? '#222' : '#fff',
            height: 60
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
          tabBarIcon: ({ color }: { color: string }) => <Icon name="home" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="tank"
        options={{
          title: 'Tankování',
          tabBarIcon: ({ color }: { color: string }) => <Icon name="tank" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Servis',
          tabBarIcon: ({ color }: { color: string }) => <Icon name="car_repair" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="station"
        options={{
          title: 'Stanice',
          tabBarIcon: ({ color }: { color: string }) => <Icon name="map_pin" color={color} style={{width: 24, height: 24 }} />,
        }}
      />
    </Tabs>
  );
}
