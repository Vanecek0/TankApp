import ScaledText from '@/components/common/ScaledText';
import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { View, ScrollView } from 'react-native';
import CustomButton, { ActionButton } from '@/components/common/Buttons';
import { useModal } from '@/providers/modalProvider';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { AddStationRecordModal } from '@/components/modals/stationsModal';
import AddTankRecordModal from '@/components/modals/tankRecordModal';
import Card from '@/components/common/Card';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { showModal } = useModal();

  return (
    <>
      <ScrollView style={{ backgroundColor: isDark ? Colors.background.dark : Colors.background.light }}>
        <View style={{ ...spacing.mx(20), ...spacing.mb(96), ...spacing.mt(12) }}>
          <Card>
            <View style={{ ...spacing.mb(8) }} className='flex-row justify-between'>
              <View>
                <ScaledText size='lg' className='font-bold' isThemed>Audi TT</ScaledText>
                <ScaledText size='base' isThemed>2.0 TFSI Coupe</ScaledText>
              </View>
              <View className='rounded-full aspect-square flex justify-center items-center' style={{ borderColor: "lightgray", ...spacing.borderWidth(5), ...spacing.p(12) }}>
                <ScaledText size='base' style={{ fontWeight: "bold", color: isDark ? Colors.text.primary_dark : Colors.text.primary }}>BA</ScaledText>
                <ScaledText size='xs' style={{ color: isDark ? Colors.text.primary_dark : Colors.text.primary }}>E10</ScaledText>
              </View>
            </View>
            <ResponsiveImage source={require('@/assets/images/car_image.png')} ratio={9 / 16} />
          </Card>
          <View className='flex-row flex-wrap justify-between'>
            <Card className={`basis-[48.5%]`}>
              <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
                <Icon name="speedometer" color={Colors.icon.primary} size={getScaleFactor() * 15} />
                <ScaledText size='xs' className='font-bold' isThemed>Stav tachometru</ScaledText>
              </View>
              <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                <ScaledText size='lg' className='font-bold' isThemed>135 000 km</ScaledText>
              </View>
            </Card>
            <Card className={`basis-[48.5%]`}>
              <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
                <Icon name="calendar" color={Colors.icon.primary} style={{ ...spacing.width(15), ...spacing.height(15) }} />
                <ScaledText size='xs' className='font-bold' isThemed>Příští STK</ScaledText>
              </View>
              <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                <ScaledText size='lg' className='font-bold' isThemed>01.02.2027</ScaledText>
              </View>
            </Card>
            <Card className={`basis-[48.5%]`}>
              <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
                <Icon name="average" color={Colors.icon.primary} style={{ ...spacing.width(15), ...spacing.height(15) }} />
                <ScaledText size='xs' className='font-bold' isThemed>Průměrné roční náklady</ScaledText>
              </View>
              <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                <ScaledText size='lg' className='font-bold' isThemed>30 500 Kč</ScaledText>
              </View>
            </Card>
            <Card className={`basis-[48.5%]`}>
              <View style={{ ...spacing.gap(4) }} className='flex-row items-center'>
                <Icon name="dollar" color={Colors.icon.primary} style={{ ...spacing.width(15), ...spacing.height(15) }} />
                <ScaledText size='xs' className='font-bold' isThemed>Celkové náklady</ScaledText>
              </View>
              <View style={{ ...spacing.gap(12), ...spacing.mt(16) }} className='flex justify-between'>
                <ScaledText size='lg' className='font-bold' isThemed>320 340 Kč</ScaledText>
              </View>
            </Card>
          </View>
          <Card className={`basis-[48.5%]`}>
            <ScaledText style={{ ...spacing.mb(12) }} size='lg' className='font-bold' isThemed>Servisní záznam</ScaledText>

            {/* Service item */}
            <View className='flex-row justify-between items-center'>
              <View style={{ ...spacing.mb(12), ...spacing.gap(8) }}>
                <Badge size='sm' textClassName='font-bold' value='01.05.2025' badgeColor='#ddd'></Badge>
                <ScaledText size='base' className='font-bold' isThemed>Výměna oleje + výměna brzdových kotoučů</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed>Autoservis Stejskal</ScaledText>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      <ActionButton>
        <View onTouchEnd={
          () => { showModal(AddTankRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.white : ''} className='font-bold'>Přidat tankování</ScaledText>
          <CustomButton
            labelClassName='aspect text-center'
            style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="tank"
                color={Colors.primary}
                style={{ ...spacing.width(20), ...spacing.height(20) }}
              />
            }
            labelSize='xl'
            labelColor={isDark ? Colors.white : ''}
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
          />
        </View>
        <View onTouchEnd={
          () => { showModal(AddStationRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.white : ''} className='font-bold'>Přidat stanici</ScaledText>
          <CustomButton
            labelClassName='aspect-square text-center'
            style={{
              ...spacing.borderRadius(90),
              ...spacing.p(16),
              ...spacing.width(60)
            }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="map_pin"
                color={Colors.primary}
                style={{ ...spacing.width(20), ...spacing.height(20) }}
              />
            }
            labelSize='xl'
            labelColor={isDark ? Colors.white : ''}
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
          />
        </View>
      </ActionButton>
    </>
  );
}