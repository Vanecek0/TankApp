import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, useColorScheme } from "react-native";
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import "@/app/globals.css"
import Icon from '../components/ui/Icon';
import SettingsBar from '../components/ui/settingsBar';
import { Colors } from '@/constants/Colors';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    async function prepare() {
      try {
        await AsyncStorage.getItem('user-theme');
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
        <SafeAreaProvider>
          <SafeAreaView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }} className={`flex-1 ${isDark ? 'dark' : ''}`}>
            <SettingsBar />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                headerShown: false,

                tabBarStyle: Platform.select({
                  ios: {
                    backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                    height: 55,
                    borderTopWidth: 0,
                    paddingBottom: 0
                  },
                  android: {
                    backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                    height: 70,
                    borderTopWidth: 0,
                    paddingTop: 5,
                    paddingBottom: 8
                  },
                  default: {
                    backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                    height: 75,
                    borderTopWidth: 0,
                    paddingTop: 5,
                    paddingBottom: 8
                  },
                }),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                tabBarShowLabel: true,
                tabBarInactiveTintColor: '#999',
              }}>
              <Tabs.Screen
                name="home/index"
                options={{
                  title: 'Domů',
                  tabBarIcon: ({ color }: { color: string }) => <Icon name="home" color={color} style={{ width: 24, height: 24 }} />,
                }}
              />
              <Tabs.Screen
                name="tank/index"
                options={{
                  title: 'Tankování',
                  tabBarIcon: ({ color }: { color: string }) => <Icon name="tank" color={color} style={{ width: 24, height: 24 }} />,
                }}
              />
              <Tabs.Screen
                name="service/index"
                options={{
                  title: 'Servis',
                  tabBarIcon: ({ color }: { color: string }) => <Icon name="car_repair" color={color} style={{ width: 24, height: 24 }} />,
                }}
              />
              <Tabs.Screen
                name="station/index"
                options={{
                  title: 'Stanice',
                  tabBarIcon: ({ color }: { color: string }) => <Icon name="map_pin" color={color} style={{ width: 24, height: 24 }} />,
                }}
              />
            </Tabs>
            <StatusBar style={isDark ? "light" : "dark"} />
          </SafeAreaView>
        </SafeAreaProvider>
    </>
  );
}
