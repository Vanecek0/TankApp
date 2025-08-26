import { SplashScreen } from "expo-router";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import "@/app/globals.css"
import { ThemeColors as Colors } from '@/constants/Colors';
import { FontSizes } from "@/utils/fontScaling";
import { SQLiteProvider } from "expo-sqlite";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsBarDrawer from "@/components/common/Drawer";
import { DatabaseProvider } from "@/database/databaseContext";
import { initializeDemoDatabase } from "@/database/init";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

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
        <ReduxProvider store={store}>
            <SQLiteProvider databaseName="database.db">
                <DatabaseProvider>
                    <ThemeProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <DrawerWithTheme />
                        </GestureHandlerRootView>
                    </ThemeProvider>
                </DatabaseProvider>
            </SQLiteProvider>
        </ReduxProvider>
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
                    backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light
                }
            }}
        />
    );
}