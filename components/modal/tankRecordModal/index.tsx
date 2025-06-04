import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller, useController } from 'react-hook-form';
import ScaledText from '@/components/other/scaledText';
import { DTO } from '@/DTO/mapper';
import { Tanking, TankingModel } from '@/models/Tanking';

const Input = ({ name, control }: any) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })
  return (
    <TextInput value={field.value} onChangeText={field.onChange} />
  )
}

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideModal } = useModal();
  const { isDark } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (data: any) => {
    try {
      const myModel = DTO<Tanking, typeof data>(data);
      const result = await TankingModel.create(myModel);
      console.log('Záznam úspěšně uložen:', result);
      return result;
    } catch (error) {
      console.error('Chyba při ukládání záznamu:', error);
      throw error;
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10, color: isDark ? Colors.white : '' }}>Nové tankování</Text>
      <ScaledText size='base'>Stav tachometru:</ScaledText>
      <Input name="tachometer" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>

      <ScaledText size='base'>Palivo:</ScaledText>
      <Input name="fuel_type" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>

      <ScaledText size='base'>Cena:</ScaledText>
      <Input name="price" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>

      <ScaledText size='base'>Počet:</ScaledText>
      <Input name="amount" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>

      <ScaledText size='base'>Ujetá vzdálenost:</ScaledText>
      <Input name="mileage" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>

      <CustomButton onPress={handleSubmit((data) => {onFormSubmit(data);hideModal()})} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(16), ...spacing.borderRadius(12) }} backgroundColor={Colors.primary} />
      <CustomButton onPress={() => hideModal()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(16), ...spacing.borderRadius(12) }} backgroundColor={Colors.dark.secondary} />
    </View>
  );
}