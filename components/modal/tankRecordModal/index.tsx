import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { useForm, useController, useWatch, useFormState } from 'react-hook-form';
import ScaledText from '@/components/other/scaledText';
import { DTO } from '@/DTO/mapper';
import { Tanking, TankingModel } from '@/models/Tanking';
import Dropdown from '@/components/other/dropdown';
import Icon from '@/components/ui/Icon';
import FormNumberInput from '@/components/other/form/formNumberInput';
import { Station, StationModel } from '@/models/Station';
import { Fuel, FuelModel } from '@/models/Fuel';
import { StationFuelModel } from '@/models/StationFuel';
import { useDatabase } from '@/database/databaseContext';
import { stationFuelRepository } from '@/repositories/stationFuelRepository';

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideModal } = useModal();
  const { isDark } = useTheme();
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const { touchedFields } = useFormState({ control });
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station>();
  const {db} = useDatabase();

  const [fuels, setFuels] = useState<Fuel[]>([]);

  const price = useWatch({ control, name: 'price' });
  const amount = useWatch({ control, name: 'amount' });
  const pricePerLtr = useWatch({ control, name: 'price_per_litre' });

  const loadAllStationsFuels = async () => {
    const allStations = await StationModel.all();
    setStations(allStations);
  };

  const loadSelectedStationFuels = async (stationID: number) => {
    const selectedStationFuels = await stationFuelRepository.getFuelsByStationId(stationID)
    setFuels(selectedStationFuels);
  }

  useEffect(() => {
    loadAllStationsFuels();
  }, []);

  useEffect(() => {
    loadSelectedStationFuels(selectedStation?.id ?? 0);
  }, [selectedStation])

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
      const result = await TankingModel.create(db,myModel);
      await TankingModel.updateSnapshot(db,1);
      console.log('Záznam úspěšně uložen:', result);
      return result;
    } catch (error) {
      console.error('Chyba při ukládání záznamu:', error);
      throw error;
    }
  };

  type StationItemProps = {
    item: Station;
    isSelected: boolean;
  };

  const StationItem = ({ item, isSelected }: StationItemProps) => (
    <View
      style={{
        ...spacing.gap(4),
        ...spacing.p(12),
        ...spacing.px(12)
      }}
    >
      <View className="flex-row justify-between" style={{ ...spacing.gap(32) }}>
        <View className="flex-1" style={{ ...spacing.gap(4) }}>
          <View className="flex-row items-center" style={{ ...spacing.gap(8) }}>
            <ScaledText size="lg" className="flex-initial font-bold text-ellipsis overflow-visible" numberOfLines={1} ellipsizeMode="tail" isThemed>
              {item.name}
            </ScaledText>
          </View>
          {item.address && (
            <View style={{ ...spacing.gap(4) }} className="flex-row items-center">
              <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
              <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                {item.address}
              </ScaledText>
            </View>
          )}
        </View>
      </View>

      {item.phone && (
        <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
          <Icon name="phone" color={Colors.hidden_text} size={getScaleFactor() * 15} />
          <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
            {item.phone}
          </ScaledText>
        </View>
      )}

      {item.opening_hrs && item.closing_hrs && (
        <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
          <Icon name="clock" color={Colors.hidden_text} size={getScaleFactor() * 15} />
          <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
            {new Date(item.opening_hrs).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })} -{' '}
            {new Date(item.closing_hrs).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
          </ScaledText>
        </View>
      )}

    </View>
  )

  return (

    <View className="max-h-full h-full" style={{ ...spacing.borderRadius(12) }}>
      <View
        className="border-b-[1px] sticky flex-row justify-between items-center"
        style={{
          ...spacing.borderTopRadius(12),
          borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
          backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
          ...spacing.p(24),
        }}
      >
        <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
          <View
            style={{
              ...spacing.borderRadius(8),
              ...spacing.width(48),
              ...spacing.height(48),
              backgroundColor: Colors.primary,
            }}
            className="flex items-center justify-center"
          >
            <Icon name="tank" color={Colors.dark.text} size={getScaleFactor() * 20} />
          </View>
          <View>
            <ScaledText size="xl" isThemed className="text-xl font-semibold">
              Přidat tankování
            </ScaledText>
            <ScaledText size="sm" isThemed>
              Vyplňte údaje o tankování
            </ScaledText>
          </View>
        </View>
        <View
          onTouchEnd={() => hideModal()}
          style={{ ...spacing.p(36), ...spacing.me(-12) }}
          className="justify-center items-center absolute right-0"
        >
          <Icon name="cross" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
        </View>
      </View>
      <ScrollView style={{ ...spacing.p(24) }} className="">
        <View style={{ ...spacing.gap(12), ...spacing.pb(52) }}>
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

            <Dropdown<Station>
              placeholder='Vyberte stanici'
              data={stations}
              onChange={(station) => setSelectedStation(station)}
              getItemLabel={(station) => station.name}
              getItemValue={(station) => station.id?.toString() ?? ''}
              renderItem={(item, isSelected) => (<StationItem item={item} isSelected={isSelected} />)}
            ></Dropdown>
          </View>


          <View className='flex-row justify-between'>
            <View className='w-[48%]'>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                <Icon name='tank' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Palivo</ScaledText>
              </View>

              <Dropdown<Fuel>
                placeholder='Typ paliva'
                data={fuels}
                onChange={console.log}
                getItemLabel={(fuel) => fuel.trademark}
                getItemValue={(fuel) => fuel.id?.toString() ?? ''}
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
      </ScrollView>
      <View style={{ ...spacing.p(20), ...spacing.gap(8), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }} className='flex-row justify-between'>
        <CustomButton className='w-[48%]' onPress={() => hideModal()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.white : ''} style={{ ...spacing.p(12), ...spacing.borderWidth(1), borderColor: isDark ? Colors.dark.secondary_lighter : Colors.hidden_text, ...spacing.borderRadius(12) }} backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary} />
        <CustomButton className='w-[48%]' onPress={handleSubmit((data) => { onFormSubmit(data); hideModal() })} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={Colors.white} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.primary }} backgroundColor={Colors.primary} />
      </View>
    </View>
  );
}