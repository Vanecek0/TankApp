import { SplashScreen } from "expo-router";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import "@/app/globals.css"
import { Colors } from '@/constants/Colors';
import { FontSizes } from "@/constants/FontSizes";
import { SQLiteProvider } from "expo-sqlite";
import { CarProvider } from "@/context/carContext";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsBarDrawer from "@/components/common/Drawer";
import { DatabaseProvider } from "@/database/databaseContext";
import { initializeDemoDatabase } from "@/database/init";

SplashScreen.preventAutoHideAsync();

export type FontSizeKey = keyof typeof FontSizes;

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
        initializeDemoDatabase();
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
            <DatabaseProvider>
                <ThemeProvider>
                    <CarProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <DrawerWithTheme />
                        </GestureHandlerRootView>
                    </CarProvider>
                </ThemeProvider>
            </DatabaseProvider>
        </SQLiteProvider>
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