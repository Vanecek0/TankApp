import CustomButton from '@/components/other/customButton';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/providers/modalProvider';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import React from 'react';
import { View, ScrollView } from 'react-native';
import ScaledText from '@/components/other/scaledText';
import Icon from '@/components/ui/Icon';
import Badge from '@/components/ui/badge';

export default function StationsModal() {
    const { hideModal } = useModal();
    const { isDark } = useTheme();

    return (
        <View className='max-h-full' style={{ ...spacing.borderRadius(12) }}>
            <View className="border-b-[1px] sticky flex-row justify-between items-center" style={{ ...spacing.borderTopRadius(12), borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background, ...spacing.p(24) }}>
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View style={{ ...spacing.borderRadius(8), ...spacing.width(48), ...spacing.height(48), backgroundColor: Colors.primary }} className="flex items-center justify-center">
                        <Icon name="map_pin" color={Colors.dark.text} size={getScaleFactor() * 20} />
                    </View>
                    <View style={{}}>
                        <ScaledText size='xl' isThemed={true} className="text-xl font-semibold">Čerpací a dobíjecí stanice</ScaledText>
                        <ScaledText size='sm' isThemed={true}>Spravujte své přidané stanice</ScaledText>
                    </View>
                </View>
                <View onTouchEnd={() => hideModal()} style={{ ...spacing.p(36), ...spacing.me(-12) }} className='justify-center items-center absolute right-0'>
                    <Icon name='cross' color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>

            <ScrollView style={{ ...spacing.px(24), ...spacing.mb(24), ...spacing.gap(12) }} className='flex'>

                <View style={{ ...spacing.gap(12), ...spacing.py(24) }}>
                    <View className='flex-row items-start justify-between' style={{ ...spacing.borderRadius(6), ...spacing.p(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }}>
                        <View style={{ ...spacing.px(5), ...spacing.gap(8) }} className="justify-center"> {/*Edit*/}
                            <View className='flex-row justify-between'>
                                <View>
                                    <View className='flex-row items-center' style={{ ...spacing.gap(8) }}>
                                        <ScaledText size='lg' className='font-bold' isThemed={true}>Tank ONO Domažlická</ScaledText>
                                        <Badge size='xs' value='ONO' className='uppercase' badgeColor={Colors.inactive_icon}></Badge>
                                    </View>
                                    <View style={{ ...spacing.gap(2) }} className='w-4/5 flex-row items-center justify-start'>
                                        <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                                        <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">Domažlická 674/160, 318 00 Plzeň</ScaledText>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ ...spacing.gap(2) }} className='flex-row items-center justify-start'>
                                        <Icon name="edit" color={Colors.hidden_text} size={getScaleFactor() * 20} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ ...spacing.gap(2) }} className='w-4/5 flex-row items-center justify-start'>
                                <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                                <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">Domažlická 674/160, 318 00 Plzeň</ScaledText>
                            </View>
                            <View style={{ ...spacing.gap(2) }} className='w-4/5 flex-row items-center justify-start'>
                                <Icon name="map_pin" color={Colors.hidden_text} size={getScaleFactor() * 15} />
                                <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="sm">Domažlická 674/160, 318 00 Plzeň</ScaledText>
                            </View>
                            <View style={{ ...spacing.gap(8) }}>
                                <ScaledText size='base' className='font-bold' isThemed={true}>Typy paliv:</ScaledText>
                                <View className='flex-row' style={{ ...spacing.gap(8) }}>
                                    <Badge size='sm' value='Natural' className='uppercase border-[1px]' style={{ ...spacing.borderRadius(12), borderColor: Colors.hidden_text }} badgeColor=''></Badge>
                                    <Badge size='sm' value='Natural' className='uppercase border-[1px]' style={{ ...spacing.borderRadius(12), borderColor: Colors.hidden_text }} badgeColor=''></Badge>
                                    <Badge size='sm' value='Natural' className='uppercase border-[1px]' style={{ ...spacing.borderRadius(12), borderColor: Colors.hidden_text }} badgeColor=''></Badge>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}