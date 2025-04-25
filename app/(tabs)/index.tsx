import { useColorScheme, Appearance, Text, View, Switch } from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/ui/Icon';
import Dashboard from '../components/ui/dashboard';

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
    const newScheme = colorScheme === 'light' ? 'light' : 'dark';
    setColorScheme(newScheme);
    Appearance.setColorScheme(newScheme);
  };

  return (
    <SafeAreaView>
      <View>
        <Dashboard />
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={toggleSwitch} />
          <Icon name="car" color={"white"} style={{width: 24, height: 24 }} />
      </View>
    </SafeAreaView>
  );
}