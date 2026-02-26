import { Tabs } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import Icon from '../../components/Icon';
import { FontSizes } from '@/utils/fontScaling';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsBar from '@/components/SettingsBar';
import { StatusBar } from 'expo-status-bar';
import { ModalProvider } from '@/hooks/useModal';


export const unstable_settings = {
    initialRouteName: 'home/index',
};

export default function TabsLayout() {
    const { isDark } = useTheme();

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} className={`flex-1 ${isDark ? 'dark' : ''}`} style={{ flex: 1, backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }}>
            <ModalProvider>
                <SettingsBar />
                <Tabs
                    initialRouteName="home/index"
                    screenOptions={{
                        tabBarActiveTintColor: Colors.base.primary,
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
                            ...spacing.height(75),
                            borderTopWidth: 0,
                            paddingBottom: 5,
                            paddingTop: 5,
                        },
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
                        name="statistics/index"
                        options={{
                            title: 'Statistiky',
                            tabBarLabelStyle: {
                                fontSize: FontSizes["base"].size
                            },
                            tabBarIcon: ({ color }: { color: string }) => <Icon name="average" color={color} style={{ ...spacing.width(24), ...spacing.height(24) }} />,
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
                <StatusBar style={"light"} />
            </ModalProvider>
        </SafeAreaView>
    );
}