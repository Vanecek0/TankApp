import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from "@/theme/ThemeProvider";
import { DatabaseProvider } from "@/database/databaseContext";
import { SQLiteProvider } from "expo-sqlite";
import { ModalProvider } from "@/providers/modalProvider";
import { CarProvider } from "@/context/carContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "@/database/database";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await AsyncStorage.getItem('user-theme');
                console.log('Theme loaded');
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
                console.log('App is ready');
            }
        }
        prepare();
    }, []);

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

    if (!isReady) return null;

    return (
        /*<DatabaseProvider>
            <SQLiteProvider databaseName="database.db">
                <ThemeProvider>
                    <CarProvider>
                        <ModalProvider>
                            <SafeAreaProvider>
                                    <Stack>
                                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                        <Stack.Screen name="+not-found" />
                                    </Stack>
                                    <StatusBar style="dark" />
                            </SafeAreaProvider>
                        </ModalProvider>
                    </CarProvider>
                </ThemeProvider>
            </SQLiteProvider>
        </DatabaseProvider>*/
        <View className="flex-1 items-center justify-center bg-gray-600">
            <Text className="text-yellow-200 text-3xl">Hey! Welcome2.</Text>
            <StatusBar style="light" />
        </View>
    );
}