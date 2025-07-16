import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, useColorScheme } from "react-native";
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
import { Provider } from 'react-redux'
import store from "../redux/store";
import { DatabaseProvider } from "@/database/databaseContext";
import { ModalProvider } from "@/providers/modalProvider";
import { CarProvider } from "@/context/carContext";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsBarDrawer from "@/components/ui/settingsBar/settingsBarDrawer";

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
        //initDb();

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
        <DatabaseProvider>
            <SQLiteProvider databaseName="database.db">
                <ThemeProvider>
                    <CarProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <DrawerWithTheme />
                        </GestureHandlerRootView>
                    </CarProvider>
                </ThemeProvider>
            </SQLiteProvider>
        </DatabaseProvider>
    )
}

function DrawerWithTheme() {
    const { isDark } = useTheme();

    return (
        <Drawer
            drawerContent={() => <SettingsBarDrawer />}
            screenOptions={{
                headerShown: false,
                swipeEnabled: true,
                swipeEdgeWidth: 7,
                swipeMinDistance: 55,
                drawerStyle: {
                    backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary
                }
            }}
        />
    );
}