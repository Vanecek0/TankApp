import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Colors } from '@/constants/Colors';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import Icon from '../../components/Icon';
import { FontSizes } from '@/constants/FontSizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsBar from '@/components/SettingsBar';
import { StatusBar } from 'expo-status-bar';
import { ModalProvider } from '@/providers/modalProvider';


export const unstable_settings = {
    initialRouteName: 'home/index',
};

export default function TabsLayout() {
    const { isDark } = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background, flex: 1 }} className={`flex-1 ${isDark ? 'dark' : ''}`}>
            <ModalProvider>
                <SettingsBar />
                <Tabs
                    initialRouteName="home/index"
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
                                ...spacing.height(75),
                                borderTopWidth: 0,
                                paddingBottom: 5,
                                paddingTop: 5,
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
                        name="tank/tabs/statistics"
                        options={{
                            href: null,
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
                  
                </Tabs>
                <StatusBar style={isDark ? "light" : "dark"} />
            </ModalProvider>
        </SafeAreaView>
    );
}