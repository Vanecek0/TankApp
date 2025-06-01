import ScaledText from '@/components/other/scaledText';
import ActionButton from '@/components/ui/actionButton';
import Badge from '@/components/ui/badge';
import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import { usePathname } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <>
    <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
      <View style={{...spacing.mx(20), ...spacing.mb(96), ...spacing.mt(12)}}>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8)}}>
          <View style={{...spacing.mb(8)}} className='flex-row justify-between'>
            <View>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Audi TT</ScaledText>
              <ScaledText size='base' isThemed={true}>2.0 TFSI Coupe</ScaledText>
            </View>
            <View className='rounded-full aspect-square flex justify-center items-center' style={{ borderColor: "lightgray", ...spacing.borderWidth(5), ...spacing.p(12) }}>
              <ScaledText size='base' style={{ fontWeight: "bold", color: isDark ? Colors.dark.text : Colors.light.text }}>BA</ScaledText>
              <ScaledText size='xs' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>E10</ScaledText>
            </View>
          </View>
          <View onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
          }}>
            <Image
              style={{ width: containerWidth, height: containerWidth * 9 / 16, ...spacing.borderRadius(8)}}
              resizeMode='cover'
              source={require('@/assets/images/car_image.png')}>
            </Image>
          </View>

        </View>

        <View className='flex-row flex-wrap justify-between'>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8)}} className={`basis-[48.5%]`}>
            <View style={{...spacing.gap(4)}} className='flex-row items-center'>
              <Icon name="speedometer" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Stav tachometru</ScaledText>
            </View>
            <View style={{...spacing.gap(12), ...spacing.mt(16)}} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>135 000 km</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%] `}>
            <View style={{...spacing.gap(4)}} className='flex-row items-center'>
              <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Příští STK</ScaledText>
            </View>
            <View style={{...spacing.gap(12), ...spacing.mt(16)}} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>01.02.2027</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{...spacing.gap(4)}} className='flex-row items-center'>
              <Icon name="average" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrné roční náklady</ScaledText>
            </View>
            <View style={{...spacing.gap(12), ...spacing.mt(16)}} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>30 500 Kč</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
            <View style={{...spacing.gap(4)}} className='flex-row items-center'>
              <Icon name="dollar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(15), ...spacing.height(15) }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Celkové náklady</ScaledText>
            </View>
            <View style={{...spacing.gap(12), ...spacing.mt(16)}} className='flex justify-between'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>320 340 Kč</ScaledText>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white, ...spacing.p(20), ...spacing.mb(12), ...spacing.borderRadius(8) }} className={`basis-[48.5%]`}>
          <ScaledText style={{...spacing.mb(12)}} size='lg' className='font-bold' isThemed={true}>Servisní záznam</ScaledText>
          <View className='flex-row items-center' style={{ borderBottomColor: Colors.hidden_text, ...spacing.my(8), ...spacing.borderBottomWidth(0.5) }}>
            <View style={{...spacing.gap(12), ...spacing.mb(12)}} className='flex-row items-center justify-between w-full'>
              <View style={{...spacing.gap(12)}} className='flex'>
                <Badge size='sm' textClassName='font-bold' value='01.05.2025' badgeColor='#ddd'></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Výměna oleje + výměna brzdových kotoučů</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Autoservis Stejskal</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
            </View>
          </View>
          <View className='flex-row items-center' style={{ borderBottomColor: Colors.hidden_text, ...spacing.my(8), ...spacing.borderBottomWidth(0.5) }}>
            <View style={{...spacing.gap(12), ...spacing.mb(12)}} className='flex-row items-center justify-between w-full'>
              <View style={{...spacing.gap(12)}} className='flex'>
                <Badge size='sm' textClassName='font-bold' value='18.02.2025' badgeColor={'#eee'}></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Výměna vzduchového filtru</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Porsche Plzeň</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} style={{ ...spacing.width(18), ...spacing.height(18) }} />
            </View>
          </View>
          <View style={{...spacing.my(8)}} className='flex-row items-center'>
            <View style={{...spacing.gap(12)}} className='flex-row items-center justify-between w-full'>
              <View style={{...spacing.gap(12)}} className='flex'>
                <Badge size='sm' textClassName='font-bold' value='10.11.2024' badgeColor='#ddd'></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Zimní pneumatiky, kontrola brzd</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Pneuservis Rychlý</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor()*18} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    <ActionButton />
    </>
  );
}