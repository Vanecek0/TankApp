import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React from 'react';
import { View, ScrollView } from 'react-native';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';

export default function AboutAppModal() {
    const { hideModal } = useModal();
    const { isDark } = useTheme();

    return (
        <View className='max-h-full' style={{ ...spacing.borderRadius(12) }}>
            <View className="border-b-[1px] sticky flex-row justify-between items-center" style={{ ...spacing.borderTopRadius(12), borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, backgroundColor: isDark ? Colors.dark.secondary : Colors.light.background, ...spacing.p(24)}}>
                <View className="flex-row items-center" style={{ ...spacing.gap(8) }}>
                    <View className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <Icon name='tank' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size='xl' isThemed={true} className="text-xl font-semibold">TankApp</ScaledText>
                        <ScaledText size='sm' isThemed={true} >Verze 0.0.1</ScaledText>
                    </View>
                </View>
                <View onTouchEnd={() => hideModal()} className='justify-center items-center'>
                    <Icon name='cross' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.px(24), ...spacing.mb(24), ...spacing.gap(12) }} className='flex'>
                <View className='border-b-[1px]' style={{borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, ...spacing.gap(8), ...spacing.py(24) }}>
                    <ScaledText size='xl' className='font-bold' isThemed={true}>O aplikaci</ScaledText>
                    <ScaledText size='sm' className='font-light' isThemed={true}>
                        TankApp je komplexní aplikace pro sledování a správu vašich vozidel. Pomáhá vám kontrolovat náklady na palivo, plánovat servisní prohlídky a mít přehled o všech důležitých termínech souvisejících s vaším vozidlem.
                    </ScaledText>
                </View>

                <View style={{...spacing.pt(24), ...spacing.gap(8)}}>
                    <ScaledText size='sm' isThemed={true} className='text-center'>
                        Vytvořeno s ♥ v České republice
                    </ScaledText>
                    <ScaledText size='xs' isThemed={true} style={{color: isDark ? Colors.dark.secondary_lighter : Colors.light.text}} className='text-center'>© 2025 Pavel Vaněček. Všechna práva vyhrazena.</ScaledText>
                </View>

            </ScrollView>
        </View>
    );
}