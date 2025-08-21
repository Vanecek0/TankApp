import CustomButton from '@/components/common/Buttons';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React from 'react';
import { View, ScrollView } from 'react-native';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';

export default function AboutAppModal() {
    const { hideModal } = useModal();
    const { isDark } = useTheme();

    return (
        <View className='max-h-full' style={{ ...spacing.borderRadius(12) }}>
            <View className="border-b-[1px] sticky flex-row justify-between items-center" style={{ ...spacing.borderTopRadius(12), borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, ...spacing.p(24) }}>
                <View className="flex-row items-center" style={{ ...spacing.gap(8) }}>
                    <View style={{ ...spacing.borderRadius(8), ...spacing.width(48), ...spacing.height(48), backgroundColor: Colors.primary }} className="flex items-center justify-center">
                        <Icon name='tank' color={Colors.dark.text} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size='xl' isThemed={true} className="text-xl font-semibold">TankApp</ScaledText>
                        <ScaledText size='sm' isThemed={true} >Verze 0.0.1</ScaledText>
                    </View>
                </View>
                <View onTouchEnd={() => hideModal()} style={{ ...spacing.p(36), ...spacing.me(-12) }} className='justify-center items-center absolute right-0'>
                    <Icon name='cross' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.px(24), ...spacing.mb(24), ...spacing.gap(12) }} className='flex'>
                <View style={{ ...spacing.gap(8), ...spacing.py(24) }}>
                    <ScaledText size='xl' className='font-bold' isThemed={true}>O aplikaci</ScaledText>
                    <ScaledText size='sm' className='font-light' isThemed={true}>
                        TankApp je komplexní aplikace pro sledování a správu vašich vozidel. Pomáhá vám kontrolovat náklady na palivo, plánovat servisní prohlídky a mít přehled o všech důležitých termínech souvisejících s vaším vozidlem.
                    </ScaledText>
                </View>

                <View style={{ ...spacing.gap(12), ...spacing.py(24) }}>
                    <ScaledText size='xl' className='font-bold' isThemed={true}>Klíčové funkce</ScaledText>
                    <View className='flex-row items-start' style={{ ...spacing.borderRadius(6), ...spacing.p(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="tank" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="justify-center">
                            <ScaledText size='base' className='font-bold' isThemed={true}>Historie tankování</ScaledText>
                            <ScaledText size='sm' isThemed={true} style={{ color: Colors.hidden_text }}>Veškeré záznamy z takování</ScaledText>
                        </View>
                    </View>
                    <View className='flex-row items-start' style={{ ...spacing.borderRadius(6), ...spacing.p(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="average" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="justify-center">
                            <ScaledText size='base' className='font-bold' isThemed={true}>Detailní statistiky</ScaledText>
                            <ScaledText size='sm' isThemed={true} style={{ color: Colors.hidden_text }}>Analýza spotřeby, cen a další...</ScaledText>
                        </View>
                    </View>
                    <View className='flex-row items-start' style={{ ...spacing.borderRadius(6), ...spacing.p(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }}>
                        <View className="justify-center items-center" style={{ width: getScaleFactor() * 35, height: getScaleFactor() * 35 }}>
                            <Icon name="car_repair" color={Colors.inactive_icon} size={getScaleFactor() * 25} />
                        </View>
                        <View style={{ ...spacing.px(5) }} className="justify-center">
                            <ScaledText size='base' className='font-bold' isThemed={true}>Servis vozidla</ScaledText>
                            <ScaledText size='sm' isThemed={true} style={{ color: Colors.hidden_text }}>Servisní záznamy, kontroly ...</ScaledText>
                        </View>
                    </View>
                </View>

                <View style={{ ...spacing.gap(12), ...spacing.py(24) }}>
                    <ScaledText size='xl' className='font-bold ' isThemed={true}>Vývojář</ScaledText>
                    <View className="flex-row items-start" style={{ ...spacing.gap(8) }}>
                        <View style={{ backgroundColor: Colors.badge.orange, ...spacing.borderRadius(8) }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Icon name='tank' color={Colors.dark.text} size={getScaleFactor() * 20} />
                        </View>
                        <View style={{...spacing.gap(8)}}>
                            <ScaledText size='xl' isThemed={true} className="text-xl font-semibold">Pavel Vaněček</ScaledText>
                            <ScaledText size='sm' isThemed={true} style={{ color: Colors.hidden_text }} >Volnočasový vývojář webových a mobilních aplikací, který se nebojí experimentovat a zkoušet nové technologie. ☺️</ScaledText>
                            <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                                <View className="flex items-center justify-center">
                                    <Icon name='github' color={Colors.hidden_text} size={getScaleFactor() * 20} />
                                </View>
                                <View>
                                    <ScaledText size='base' isThemed={true} style={{ color: Colors.hidden_text }}>GitHub</ScaledText>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ ...spacing.gap(12), ...spacing.py(24) }}>
                    <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                        <View className="flex items-center justify-center">
                            <Icon name='external_link' color={Colors.hidden_text} size={getScaleFactor() * 20} />
                        </View>
                        <View>
                            <ScaledText size='base' isThemed={true} style={{ color: Colors.hidden_text }}>Podmínky použití</ScaledText>
                        </View>
                    </View>
                </View>

                <View className='border-t-[1px]' style={{ borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, ...spacing.pt(24), ...spacing.gap(8) }}>
                    <ScaledText size='sm' isThemed={true} className='text-center'>
                        Vytvořeno s ♥ v České republice
                    </ScaledText>
                    <ScaledText size='xs' isThemed={true} style={{ color: Colors.hidden_text }} className='text-center'>© 2025 Pavel Vaněček. Všechna práva vyhrazena.</ScaledText>
                </View>

            </ScrollView>
        </View>
    );
}