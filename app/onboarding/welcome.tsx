import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Vítej!</Text>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                Aplikace ti pomůže sledovat výdaje na palivo. Nejprve si vytvoříme profil.
            </Text>
        </View>
    );
}