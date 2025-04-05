import { useColorScheme, Appearance, Text, View, Switch } from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const currentScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(currentScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleSwitch = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
    Appearance.setColorScheme(newScheme);
  };

  return (
    <SafeAreaView>
      <View className='flex-row items-center'>
        <Text className='text-white'>Theme switch: </Text>
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={toggleSwitch} />
      </View>
    </SafeAreaView>
  );
}