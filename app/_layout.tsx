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
import getFontSize from "@/utils/fontScaling";
import { FontSizes } from "@/constants/FontSizes";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { Database } from "@/database/database";
import { SQLiteProvider } from "expo-sqlite";

SplashScreen.preventAutoHideAsync();

export type FontSizeKey = keyof typeof FontSizes;

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [dbReady, setDbReady] = useState(false);


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

    const resetDb = async () => {
      await Database.resetDatabase();
    };
    //resetDb();

    const initDb = async () => {
      await Database.init();
    };
    initDb();

     const seedDb = async () => {
      await Database.seedData();
    };
    //seedDb();


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
    <SQLiteProvider databaseName="database.db">
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SQLiteProvider>
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
                  ...spacing.height(55),
                  borderTopWidth: 0,
                  paddingBottom: 0
                },
                android: {
                  backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                  ...spacing.height(70),
                  borderTopWidth: 0,
                },
                default: {
                  backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                  ...spacing.height(75),
                  borderTopWidth: 0,
                  paddingBottom: 0 * getScaleFactor()
                },
              }),
              tabBarLabelStyle: {
                fontSize: 12 * getScaleFactor(),
                fontWeight: 'bold',
              },
              tabBarShowLabel: true,
              tabBarInactiveTintColor: '#999',
              tabBarLabelPosition: 'below-icon'
            }}>
            <Tabs.Screen
              name="home/index"
              options={{
                title: 'Domů',
                tabBarLabelStyle: {
                  fontSize: FontSizes["base"].size
                },
                tabBarIcon: ({ color }: { color: string }) => <Icon name="home" color={color} style={{ ...spacing.width(24), ...spacing.height(24) }} />,
              }}
            />
            <Tabs.Screen
              name="tank/index"
              options={{
                title: 'Tankování',
                tabBarLabelStyle: {
                  fontSize: FontSizes["base"].size
                },
                tabBarIcon: ({ color }: { color: string }) => <Icon name="tank" color={color} style={{ ...spacing.width(24), ...spacing.height(24) }} />,
              }}
            />
            <Tabs.Screen
              name="service/index"
              options={{
                title: 'Servis',
                tabBarLabelStyle: {
                  fontSize: FontSizes["base"].size
                },
                tabBarIcon: ({ color }: { color: string }) => <Icon name="car_repair" color={color} style={{ ...spacing.width(24), ...spacing.height(24) }} />,
              }}
            />
            {/*<Tabs.Screen
                name="station/index"
                options={{
                  title: 'Stanice',
                  tabBarIcon: ({ color }: { color: string }) => <Icon name="map_pin" color={color} style={{ width: 24, height: 24 }} />,
                }}
              />*/}
          </Tabs>
          <StatusBar style={isDark ? "light" : "dark"} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
