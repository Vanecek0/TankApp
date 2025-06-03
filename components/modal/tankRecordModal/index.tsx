import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideModal } = useModal();
  const [value, setValue] = useState('');
  const { isDark } = useTheme();

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10, color: isDark ? Colors.white : '' }}>Nové tankování</Text>
      {/*<TextInput
        placeholder="Zadej něco"
        value={value}
        onChangeText={setValue}
        style={{ padding: 8, color: isDark ? Colors.white : '' }}
      />*/}
      <CustomButton onPress={() => { onSubmit(value); hideModal(); }} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(16), ...spacing.borderRadius(12) }} backgroundColor={Colors.primary} />
      <CustomButton onPress={() => hideModal()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(16), ...spacing.borderRadius(12) }} backgroundColor={Colors.dark.secondary} />
    </View>
  );
}