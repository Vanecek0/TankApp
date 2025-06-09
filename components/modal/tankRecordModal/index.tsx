import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller, useController } from 'react-hook-form';
import ScaledText from '@/components/other/scaledText';
import { DTO } from '@/DTO/mapper';
import { Tanking, TankingModel } from '@/models/Tanking';
import { useDatabase } from '@/database/databaseContext';
import Dropdown from '@/components/other/dropdown';
import Icon from '@/components/ui/Icon';

const Input = ({ name, control }: any) => {
  const { isDark } = useTheme();

  const { field } = useController({
    control,
    defaultValue: '',
    name,
  })
  return (
    <TextInput placeholder='Test' placeholderTextColor={isDark ? Colors.dark.secondary_lighter : Colors.light.text} style={{ ...spacing.borderRadius(12), ...spacing.borderWidth(0.5), ...spacing.px(12), ...spacing.py(12), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary, color: isDark ? Colors.dark.text : Colors.light.text }} value={field.value} onChangeText={field.onChange} />
  )
}

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideModal } = useModal();
  const { isDark } = useTheme();
  const { initTankings } = useDatabase();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (data: any) => {
    try {
      const myModel = DTO<Tanking, typeof data>(data);
      const result = await TankingModel.create(myModel);
      console.log('Záznam úspěšně uložen:', result);
      await initTankings();
      return result;
    } catch (error) {
      console.error('Chyba při ukládání záznamu:', error);
      throw error;
    }
  };

  return (
    <View>
      <View className='flex-row items-center' style={{ ...spacing.mb(12), ...spacing.px(20), ...spacing.py(10), ...spacing.gap(8), ...spacing.borderTopRadius(12), backgroundColor: Colors.primary }}>
        <Icon name='tank' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
        <ScaledText size='lg' style={{ color: isDark ? Colors.white : '' }}>Nové tankování</ScaledText>
      </View>

      <View style={{ ...spacing.px(20), ...spacing.mt(12), ...spacing.mb(20), ...spacing.gap(12) }} className='flex'>
        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='speedometer' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Stav tachometru</ScaledText>
          </View>

          <Input name="tachometer" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='map_pin' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Stanice</ScaledText>
          </View>

          <Dropdown
            placeholder='Vyberte stanici'
            data={[{ value: 'test', label: 'test' }]}
            onChange={console.log}
            dropdownStyle={{ ...spacing.borderRadius(12), ...spacing.borderWidth(0.5), ...spacing.px(12), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary }}
          ></Dropdown>
        </View>


        <View className='flex-row justify-between'>
          <View className='w-[48%]'>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
              <Icon name='tank' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Palivo</ScaledText>
            </View>

            <Input name="fuel_type" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
          </View>

          <View className='w-[48%]'>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
              <Icon name='dollar' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Cena za jednotku</ScaledText>
            </View>

            <Input name="price_per_litre" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
          </View>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='dollar' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Cena</ScaledText>
          </View>

          <Input name="price" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Počet litrů</ScaledText>
          </View>

          <Input name="amount" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Ujetá vzdálenost</ScaledText>
          </View>

          <Input name="mileage" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></Input>
        </View>

      </View>

      <View style={{ ...spacing.p(20), ...spacing.gap(8), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background, borderTopColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, ...spacing.borderWidth(0.5) }} className='flex-row justify-between'>
        <CustomButton className='w-[48%]' onPress={() => hideModal()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderWidth(0.5), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, ...spacing.borderRadius(12) }} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
        <CustomButton className='w-[48%]' onPress={handleSubmit((data) => { onFormSubmit(data); hideModal() })} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderRadius(12) }} backgroundColor={Colors.primary} />
      </View>
    </View>
  );
}