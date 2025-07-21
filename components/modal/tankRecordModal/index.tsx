import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React, { useEffect } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { useForm, useController, useWatch, useFormState } from 'react-hook-form';
import ScaledText from '@/components/other/scaledText';
import { DTO } from '@/DTO/mapper';
import { Tanking, TankingModel } from '@/models/Tanking';
import { useDatabase } from '@/database/databaseContext';
import Dropdown from '@/components/other/dropdown';
import Icon from '@/components/ui/Icon';
import FormNumberInput from '@/components/other/form/formNumberInput';

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideModal } = useModal();
  const { isDark } = useTheme();
  const { initTankings } = useDatabase();
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const { touchedFields } = useFormState({ control });

  const price = useWatch({ control, name: 'price' });
  const amount = useWatch({ control, name: 'amount' });
  const pricePerLtr = useWatch({ control, name: 'price_per_litre' });

  useEffect(() => {
    const ppl = parseFloat(pricePerLtr);
    const p = parseFloat(price);
    if (!isNaN(ppl) && !isNaN(p)) {
      setValue('amount', (price / pricePerLtr).toFixed(3).toString());
    } else {
      setValue('amount', '');
    }
  }, [pricePerLtr, price, setValue]);

  const onFormSubmit = async (data: any) => {
    try {
      const myModel = DTO<Tanking, typeof data>(data);
      const result = await TankingModel.create(myModel);
      await TankingModel.updateSnapshot(1);
      console.log('Záznam úspěšně uložen:', result);
      await initTankings();
      return result;
    } catch (error) {
      console.error('Chyba při ukládání záznamu:', error);
      throw error;
    }
  };

  return (
    <ScrollView style={{ ...spacing.borderBottomRadius(12) }}>
      <View className='flex-row items-center' style={{ ...spacing.mb(12), ...spacing.px(20), ...spacing.py(16), ...spacing.gap(8), ...spacing.borderTopRadius(12), backgroundColor: Colors.primary }}>
        <Icon name='tank' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
        <ScaledText size='lg' style={{ color: isDark ? Colors.white : '' }}>Nové tankování</ScaledText>
      </View>

      <View style={{ ...spacing.px(20), ...spacing.mt(12), ...spacing.mb(20), ...spacing.gap(12) }} className='flex'>
        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='speedometer' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Stav tachometru</ScaledText>
          </View>

          <FormNumberInput name="tachometer" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormNumberInput>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='map_pin' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Stanice</ScaledText>
          </View>

          <Dropdown
            placeholder='Vyberte stanici'
            data={[
              { value: 'test1', label: 'test' },
              { value: 'test2', label: 'test' },
              { value: 'test3', label: 'test' },
              { value: 'test4', label: 'test' },
              { value: 'test5', label: 'test' },
              { value: 'test6', label: 'test' },
              { value: 'test7', label: 'test' },
              { value: 'test8', label: 'test' },
              { value: 'test9', label: 'test' },
              { value: 'test10', label: 'test' },
              { value: 'test11', label: 'test' },
              { value: 'test12', label: 'test' },
              { value: 'test13', label: 'test' },
              { value: 'test14', label: 'test' },
              { value: 'test15', label: 'test' },
              { value: 'test16', label: 'test' },
            ]}
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

            <Dropdown
              placeholder='Typ paliva'
              name='fuel_type'
              data={[
                { value: 'test1', label: 'test' },
                { value: 'test2', label: 'test' },
                { value: 'test3', label: 'test' },
                { value: 'test4', label: 'test' },
                { value: 'test5', label: 'test' },
                { value: 'test6', label: 'test' },
                { value: 'test7', label: 'test' },
                { value: 'test8', label: 'test' },
                { value: 'test9', label: 'test' },
                { value: 'test10', label: 'test' },
                { value: 'test11', label: 'test' },
                { value: 'test12', label: 'test' },
                { value: 'test13', label: 'test' },
                { value: 'test14', label: 'test' },
                { value: 'test15', label: 'test' },
                { value: 'test16', label: 'test' },
              ]}
              onChange={console.log}
              dropdownStyle={{ ...spacing.borderRadius(12), ...spacing.borderWidth(0.5), ...spacing.px(12), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.secondary }}
            ></Dropdown>
          </View>

          <View className='w-[48%]'>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
              <Icon name='calc' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Cena za jednotku</ScaledText>
            </View>

            <FormNumberInput name="price_per_litre" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormNumberInput>
          </View>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <Icon name='dollar' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Cena (bez slev)</ScaledText>
          </View>

          <FormNumberInput name="price" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormNumberInput>
        </View>

        <View>
          <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
            <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Počet litrů</ScaledText>
          </View>

          <FormNumberInput name="amount" control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormNumberInput>
        </View>

      </View>

      <View style={{ ...spacing.p(20), ...spacing.gap(8), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background, borderTopColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, ...spacing.borderWidth(0.5) }} className='flex-row justify-between'>
        <CustomButton className='w-[48%]' onPress={() => hideModal()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderWidth(0.5), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.light.secondary, ...spacing.borderRadius(12) }} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
        <CustomButton className='w-[48%]' onPress={handleSubmit((data) => { onFormSubmit(data); hideModal() })} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderRadius(12) }} backgroundColor={Colors.primary} />
      </View>
    </ScrollView>
  );
}