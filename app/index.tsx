import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
//import { isFirstLaunch } from '../lib/storage';
//import { initDatabase } from '../lib/database';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            //const firstLaunch = await isFirstLaunch();
            //await initDatabase();

            if (true) {
                //router.replace('/onboarding/welcome');
                router.replace('/(tabs)/home');
            } else {
                router.replace('/(tabs)/home');
            }

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return null;
}