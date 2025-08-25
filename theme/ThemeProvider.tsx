import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, useColorScheme as useNativeColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const THEME_STORAGE_KEY = 'user-theme';
const MINIMUM_LOADING_TIME = 500;
type ColorSchemeName = 'light' | 'dark';
type ThemeContextType = {
    colorScheme: ColorSchemeName;
    isDark: boolean;
    toggleColorScheme: () => void;
    setColorScheme: (scheme: ColorSchemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const systemColorScheme = useNativeColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorSchemeName | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        async function loadTheme() {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setColorScheme(savedTheme as ColorSchemeName);
                } else {
                    const defaultTheme = (systemColorScheme as ColorSchemeName) || 'light';
                    setColorScheme(defaultTheme as ColorSchemeName);
                }
            } catch (error) {
                console.error('Chyba při načítání tématu:', error);
                const defaultTheme = (systemColorScheme as ColorSchemeName) || 'light';
                setColorScheme(defaultTheme as ColorSchemeName);
            } finally {
                setIsDataLoaded(true);
            }
        }

        loadTheme();
    }, []);

    useEffect(() => {
        if (isDataLoaded) {
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, MINIMUM_LOADING_TIME);
          
          return () => clearTimeout(timer);
        }
      }, [isDataLoaded]);

    useEffect(() => {
        if (isDataLoaded && !colorScheme && systemColorScheme) {
            setColorScheme(systemColorScheme as ColorSchemeName);
        }
    }, [systemColorScheme, colorScheme]);

    useEffect(() => {
        if (colorScheme) {
            setColorScheme(colorScheme as ColorSchemeName);
            AsyncStorage.setItem(THEME_STORAGE_KEY, colorScheme).catch(error => {
            });
        }
    }, [colorScheme]);


    const toggleColorScheme = () => {
        setColorScheme(prev => {
            const newScheme = prev === 'dark' ? 'light' : 'dark';
            return newScheme;
        });
    };

    const setThemeColorScheme = (scheme: ColorSchemeName) => {
        setColorScheme(scheme);
    };

    const isDark = colorScheme === 'dark';

    if (isLoading || colorScheme === null) {
        return (
            <SafeAreaView className={`flex flex-1 justify-center items-center ${isDark ? 'bg-background_dark' : 'bg-background'}`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    const contextValue: ThemeContextType = {
        colorScheme,
        isDark,
        toggleColorScheme,
        setColorScheme: setThemeColorScheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};