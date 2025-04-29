import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import "@/app/globals.css"
import Icon from '../components/ui/Icon';
import { useTheme } from '@/theme/ThemeProvider';
import Dashboard from '../components/ui/dashboard';
import SettingsBar from '../components/ui/settingsBar';

export default function TabLayout() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <SettingsBar />
      <Dashboard routePathName={pathname} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#F50537",
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              height: 55
            },
            android: {
              backgroundColor: isDark ? '#121212' : '#fff',
              height: 56
            },
            default: {
              backgroundColor: isDark ? '#121212' : '#fff',
              height: 60
            },
          }),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarInactiveTintColor: '#999'
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Domů',
            tabBarIcon: ({ color }: { color: string }) => <Icon name="home" color={color} style={{ width: 24, height: 24 }} />,
          }}
        />
        <Tabs.Screen
          name="tank"
          options={{
            title: 'Tankování',
            tabBarIcon: ({ color }: { color: string }) => <Icon name="tank" color={color} style={{ width: 24, height: 24 }} />,
          }}
        />
        <Tabs.Screen
          name="service"
          options={{
            title: 'Servis',
            tabBarIcon: ({ color }: { color: string }) => <Icon name="car_repair" color={color} style={{ width: 24, height: 24 }} />,
          }}
        />
        <Tabs.Screen
          name="station"
          options={{
            title: 'Stanice',
            tabBarIcon: ({ color }: { color: string }) => <Icon name="map_pin" color={color} style={{ width: 24, height: 24 }} />,
          }}
        />
      </Tabs>
    </>
  );
}
