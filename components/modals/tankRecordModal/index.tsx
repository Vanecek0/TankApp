import CustomButton from '@/components/common/Buttons';
import { ThemeColors as Colors } from '@/constants/Colors';
import { useModal } from '@/hooks/useModal';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm, useWatch, useFormState } from 'react-hook-form';
import ScaledText from '@/components/common/ScaledText';
import { DTO } from '@/DTO/mapper';
import Dropdown from '@/components/common/Dropdown';
import Icon from '@/components/Icon';
import FormNumberInput from '@/components/forms/FormNumberInput';
import { Fuel } from '@/models/Fuel';
import { stationFuelRepository } from '@/repositories/stationFuelRepository';
import { Station } from '@/models/Station';
import { stationRepository } from '@/repositories/stationRepository';
import { Tanking } from '@/models/Tanking';
import { tankingRepository } from '@/repositories/tankingRepository';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loadCarFromStorage } from '@/store/slices/car.slice';
import FormDateTimeInput from '@/components/forms/FormDateTimeInput';
import FormCheckboxItem from '@/components/forms/FormCheckboxItem';
import FormToggleInput from '@/components/forms/FormToggleInput';
import FormTextArea from '@/components/forms/FormTextArea';

export default function AddTankRecordModal({ onSubmit }: any) {
  const { hideAllModals } = useModal();
  const { isDark } = useTheme();
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station>();
  const { car } = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch<AppDispatch>();

  const [fuels, setFuels] = useState<Fuel[]>([]);

  const price = useWatch({ control, name: 'price' });
  const amount = useWatch({ control, name: 'amount' });
  const pricePerLtr = useWatch({ control, name: 'price_per_litre' });

  useEffect(() => {
    dispatch(loadCarFromStorage());
  }, [dispatch]);

  const loadAllStationsFuels = async () => {
    const allStations = await stationRepository.getAll();
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
      const result = await tankingRepository.create(myModel);
      //await tankingRepository.updateSnapshot(db,1);
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
              <Icon name="map_pin" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
              <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
                {item.address}
              </ScaledText>
            </View>
          )}
        </View>
      </View>

      {item.phone && (
        <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
          <Icon name="phone" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
          <ScaledText numberOfLines={1} ellipsizeMode="tail" className="text-ellipsis overflow-visible" isThemed size="sm">
            {item.phone}
          </ScaledText>
        </View>
      )}

      {item.opening_hrs && item.closing_hrs && (
        <View style={{ ...spacing.gap(4) }} className="w-4/5 flex-row items-center">
          <Icon name="clock" color={Colors.icon.disabled} size={getScaleFactor() * 15} />
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
          borderColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
          backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
          ...spacing.p(24),
        }}
      >
        <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
          <View
            style={{
              ...spacing.borderRadius(8),
              ...spacing.width(48),
              ...spacing.height(48),
              backgroundColor: Colors.base.primary,
            }}
            className="flex items-center justify-center"
          >
            <Icon name="tank" color={Colors.base.white} size={getScaleFactor() * 20} />
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
          onTouchEnd={() => hideAllModals()}
          style={{ ...spacing.p(36), ...spacing.me(-12) }}
          className="justify-center items-center absolute right-0"
        >
          <Icon name="cross" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 20} />
        </View>
      </View>
      <ScrollView style={{ ...spacing.p(24) }}>
        <View style={{ ...spacing.gap(12), ...spacing.borderBottomWidth(1), ...spacing.pb(12), borderColor: isDark ? Colors.border.muted_dark : Colors.border.muted }}>
          <View>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
              <Icon name='speedometer' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Stav tachometru (km)</ScaledText>
            </View>

            <FormNumberInput name="tachometer" placeholder="Stav tachometru (km)" control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormNumberInput>
            <ScaledText style={{ color: isDark ? Colors.text.disabled_dark : Colors.text.disabled, ...spacing.ms(2), ...spacing.mt(2) }} size='base'>Poslední hodnota: {car?.odometer} km</ScaledText>
          </View>

          <View>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
              <Icon name='map_pin' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Stanice</ScaledText>
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


          <View style={{...spacing.gap(12), ...spacing.mt(6)}}>
            <View className='flex-row justify-between'>
            <View className='w-[48%]' style={{ ...spacing.mb(3) }}>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='tank' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Palivo</ScaledText>
              </View>

              <Dropdown<Fuel>
                placeholder='Typ paliva'
                data={fuels}
                onChange={console.log}
                getItemLabel={(fuel) => fuel.trademark}
                getItemValue={(fuel) => fuel.id?.toString() ?? ''}
              ></Dropdown>

            </View>

            <View className='w-[48%]' style={{ ...spacing.mb(3) }}>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='droplet' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Počet jednotek (l)</ScaledText>
              </View>

              <FormNumberInput name="amount" placeholder="Počet jedn. (l)" control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormNumberInput>
            </View>
          </View>

          <View className='flex-row justify-between'>
            <View className='w-[48%]' style={{ ...spacing.mb(6) }}>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='calc' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size="base" style={{ color: isDark ? Colors.base.white : '' }}>Cena za jedn. (kč/l)</ScaledText>
              </View>

              <FormNumberInput name="price_per_litre" placeholder="Cena za jedn. (kč/l)" control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormNumberInput>
            </View>

            <View className='w-[48%]' style={{ ...spacing.mb(6) }}>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='dollar' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Celková cena (kč)</ScaledText>
              </View>

              <FormNumberInput name="price" placeholder="Celková cena (kč)" control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormNumberInput>
            </View>
          </View>
          </View>
        </View>
        <View style={{ ...spacing.gap(12), ...spacing.borderBottomWidth(1), ...spacing.py(12), borderColor: isDark ? Colors.border.muted_dark : Colors.border.muted }}>
          <View className='flex-row justify-between'>
            <View className='w-[48%]'>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='calendar' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Datum</ScaledText>
              </View>
              <FormDateTimeInput mode="date" name="opening" defaultValue={new Date()} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormDateTimeInput>
            </View>
            <View className='w-[48%]'>
              <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
                <Icon name='clock' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Čas</ScaledText>
              </View>
              <FormDateTimeInput name="closing" defaultValue={new Date()} control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormDateTimeInput>
            </View>
          </View>
        </View>
        <View style={{ ...spacing.gap(12), ...spacing.borderBottomWidth(1), ...spacing.py(12), borderColor: isDark ? Colors.border.muted_dark : Colors.border.muted }}>
          <ScaledText style={{...spacing.mb(6)}} className='font-bold' size='lg' isThemed>Doplňující</ScaledText>
          <View className='flex-row items-center' style={{ ...spacing.gap(6) }}>
            <FormToggleInput
              name="test"
              control={control}
              value="yes"
              label={(
                <View className='flex-row items-center' style={{ ...spacing.gap(6) }}>
                  <Icon name="tank" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                  <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Plná nádrž</ScaledText>
                </View>
              )}
              labelPosition='left'
              style={{
                justifyContent: "space-between",
                width: "100%"
              }}
            />
          </View>
        </View>
        <View style={{...spacing.mt(12), ...spacing.mb(48)}}>
          <ScaledText style={{...spacing.mb(6)}} className='font-bold' size='lg' isThemed>Volitelné</ScaledText>
          <View>
            <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(6) }}>
              <Icon name="document" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
              <ScaledText size='base' style={{ color: isDark ? Colors.base.white : '' }}>Poznámka</ScaledText>
            </View>
            <FormTextArea name="note" control={control} style={{ padding: 8, color: isDark ? Colors.base.white : '' }}></FormTextArea>
          </View>
        </View>

      </ScrollView>
      <View style={{ ...spacing.p(20), ...spacing.gap(6), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light }} className='flex-row justify-between'>
        <CustomButton className='w-[48%]' onPress={() => hideAllModals()} label="Zrušit" labelSize='base' labelClassName='text-center' labelColor={isDark ? Colors.base.white : ''} style={{ ...spacing.p(12), ...spacing.borderWidth(1), borderColor: isDark ? Colors.text.primary_dark : Colors.text.muted, ...spacing.borderRadius(12) }} backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light} />
        <CustomButton className='w-[48%]' onPress={handleSubmit((data) => { onFormSubmit(data); hideAllModals() })} label="Přidat záznam" labelSize='base' labelClassName='text-center' labelColor={Colors.base.white} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.base.primary }} backgroundColor={Colors.base.primary} />
      </View>
    </View>
  );
}