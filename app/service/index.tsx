import ScaledText from '@/components/other/scaledText';
import Badge from '@/components/ui/badge';
import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import { usePathname } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <ScrollView style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
      <View className='mx-5 mb-5 mt-3'>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 mb-3 rounded-lg`}>
          <View className='flex-row justify-between mb-2'>
            <View>
              <ScaledText size='lg' className='font-bold' isThemed={true}>Audi TT</ScaledText>
              <ScaledText size='base' isThemed={true}>2.0 TFSI Coupe</ScaledText>
            </View>
            <View className='p-3 rounded-full aspect-square flex justify-center items-center' style={{ borderColor: "lightgray", borderWidth: 5 }}>
              <ScaledText size='base' style={{ fontWeight: "bold", color: isDark ? Colors.dark.text : Colors.light.text }}>BA</ScaledText>
              <ScaledText size='xs' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>E10</ScaledText>
            </View>
          </View>
          <View onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
          }}>
            <Image
              style={{ width: containerWidth, height: containerWidth * 9 / 16, borderRadius: 8}}
              resizeMode='cover'
              source={require('@/assets/images/car_image.png')}>
            </Image>
          </View>

        </View>

        <View className='flex-row flex-wrap justify-between mb-3'>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
            <View className='flex-row items-center gap-1'>
              <Icon name="speedometer" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Stav tachometru</ScaledText>
            </View>
            <View className='flex justify-between gap-3 mt-4'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>135 000 km</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] mb-3 rounded-lg`}>
            <View className='flex-row items-center gap-1'>
              <Icon name="calendar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Příští STK</ScaledText>
            </View>
            <View className='flex justify-between gap-3 mt-4'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>01.02.2027</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] rounded-lg`}>
            <View className='flex-row items-center gap-1'>
              <Icon name="average" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Průměrné roční náklady</ScaledText>
            </View>
            <View className='flex justify-between gap-3 mt-4'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>30 500 Kč</ScaledText>
            </View>
          </View>
          <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 basis-[48.5%] rounded-lg`}>
            <View className='flex-row items-center gap-1'>
              <Icon name="dollar" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 15, height: 15 }} />
              <ScaledText size='xs' className='font-bold' isThemed={true}>Celkové náklady</ScaledText>
            </View>
            <View className='flex justify-between gap-3 mt-4'>
              <ScaledText size='lg' className='font-bold' isThemed={true}>320 340 Kč</ScaledText>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? Colors.dark.secondary_light : Colors.white }} className={`p-5 mb-3 basis-[48.5%] rounded-lg`}>
          <ScaledText size='lg' className='font-bold mb-3' isThemed={true}>Servisní záznam</ScaledText>
          <View className='my-2 flex-row items-center border-b-[0.5px]' style={{ borderBottomColor: Colors.hidden_text }}>
            <View className='flex-row items-center justify-between gap-3 mb-3 w-full'>
              <View className='flex gap-3'>
                <Badge size='sm' textClassName='font-bold' value='01.05.2025' badgeColor='#ddd'></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Výměna oleje + výměna brzdových kotoučů</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Autoservis Stejskal</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
            </View>
          </View>
          <View className='my-2 flex-row items-center border-b-[0.5px]' style={{ borderBottomColor: Colors.hidden_text }}>
            <View className='flex-row items-center justify-between gap-3 mb-3 w-full'>
              <View className='flex gap-3'>
                <Badge size='sm' textClassName='font-bold' value='18.02.2025' badgeColor={'#eee'}></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Výměna vzduchového filtru</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Porsche Plzeň</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
            </View>
          </View>
          <View className='my-2 flex-row items-center'>
            <View className='flex-row items-center justify-between gap-3 w-full'>
              <View className='flex gap-3'>
                <Badge size='sm' textClassName='font-bold' value='10.11.2024' badgeColor='#ddd'></Badge>
                <ScaledText size='sm' className='font-bold' isThemed={true}>Zimní pneumatiky, kontrola brzd</ScaledText>
                <View className='flex-row'>
                  <ScaledText size='sm' isThemed={true}>Servis: </ScaledText>
                  <ScaledText size='sm' className='font-bold' isThemed={true}>Pneuservis Rychlý</ScaledText>
                </View>
              </View>
            </View>
            <View className='-mx-3'>
              <Icon name="chevron_right" color={isDark ? Colors.dark.text : Colors.light.text} style={{ width: 18, height: 18 }} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}