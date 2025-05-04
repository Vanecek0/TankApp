import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

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
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: isDark ? Colors.dark.background : Colors.light.background}} className={`flex-1 ${isDark ? 'dark' : ''}`}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}