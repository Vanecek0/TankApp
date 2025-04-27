import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <AppContent/>
    </ThemeProvider>
  );

}

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'dark' : ''}`}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor={isDark ? "#140f0a" : "#EBF0F5"} style={isDark ? "light" : "dark"} />
    </SafeAreaView>
  );
}