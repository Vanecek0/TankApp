import React from 'react';
import { View } from 'react-native';
import ScaledText from '@/components/common/ScaledText';
import Card from '@/components/common/Card';
import Icon from '@/components/Icon';
import BadgeComponent from '@/components/Badge';
import { spacing, getScaleFactor } from '@/utils/SizeScaling';
import { ThemeColors as Colors } from '@/constants/Colors';
import { getDate } from '@/utils/getDate';
import { Tanking } from '@/models/Tanking';
import { Badge, Badge as BadgeType } from '@/models/Badge';

interface TankingItemProps {
    item: {
        month: string;
        tankings: (Tanking & {
            station?: any;
            fuel?: any;
            station_fuel?: any;
            badges?: Badge[];
        })[];
    };
    isDark: boolean;
}

export const TankingItem = React.memo(({ item, isDark }: TankingItemProps) => (

    <View>
        <ScaledText size='xl' className='font-bold capitalize' style={{ color: isDark ? Colors.text.primary_dark : Colors.text.primary, ...spacing.my(12) }}>{getDate(item.month).monthLong} {getDate(item.month).year}</ScaledText>
        {item.tankings.map((item) => (
            <Card key={item.id}>
                <View style={{ ...spacing.gap(12), ...spacing.mb(12) }} className=' flex-row items-center w-full'>
                    <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='lg'>{item.station?.provider?.slice(0, 2).toUpperCase() ?? '-'}</ScaledText>
                    <View className='flex-row justify-between flex-1'>
                        <View style={{ ...spacing.gap(4) }} className='flex items-start w-2/4'>
                            <ScaledText isThemed={true} size="xl" className='font-bold'>{item.station?.name}</ScaledText>
                            <View style={{ ...spacing.gap(2) }} className='flex-row items-center'>
                                <Icon name="map_pin" color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 15} />
                                <ScaledText numberOfLines={1} ellipsizeMode="tail" className='text-ellipsis overflow-visible' isThemed={true} size="base">{item.station?.address}</ScaledText> 
                            </View>
                        </View>
                        <View style={{ ...spacing.gap(4) }} className='flex items-end'>
                            <ScaledText isThemed={true} size="xl" className='font-bold'>{item.price} Kč</ScaledText>
                            <ScaledText isThemed={true} size="base" className='text-xs'>{item.amount} l</ScaledText>
                        </View>
                    </View>
                </View>
                <View style={{ ...spacing.gap(12) }} className='flex'>
                    <View style={{ ...spacing.gap(12) }} className='flex-row'>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold' >Datum a čas</ScaledText>
                            <ScaledText isThemed={true} size="base" >{new Date(item.tank_date).toLocaleDateString("cs-CZ")}, {new Date(item.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</ScaledText>
                        </View>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold'>Stav tachometru</ScaledText>
                            <ScaledText isThemed={true} size="base" >{item.tachometer} km</ScaledText>
                        </View>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold'>Typ paliva</ScaledText>
                            <ScaledText isThemed={true} size="base" >{item.fuel?.trademark}</ScaledText>
                        </View>
                    </View>
                    <View style={{ ...spacing.gap(12) }} className='flex-row'>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold'>Cena za jednotku</ScaledText>
                            <ScaledText isThemed={true} size="base" >{item.price_per_unit} Kč/l</ScaledText>
                        </View>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold'>Ujeto od posl.</ScaledText>
                            <ScaledText isThemed={true} size="base" >{item.mileage} km</ScaledText>
                        </View>
                        <View className='basis-1/3'>
                            <ScaledText isThemed={true} size="sm" className='font-bold'>Spotřeba</ScaledText>
                            <ScaledText isThemed={true} size="base" >{((item.amount! / item.mileage!) * 100).toFixed(2)} l/100km</ScaledText>
                        </View>
                    </View>
                </View>
                {item.badges?.length != 0 && (
                    <View style={{ ...spacing.gap(8), ...spacing.mt(12) }} className='flex-row'>
                        {item.badges?.map((badge: BadgeType) => (
                            <BadgeComponent
                                key={badge.id}
                                badgeColor={badge.color}
                                textColor={Colors.base.white}
                                size='xs'
                                style={{
                                    ...spacing.borderRadius(12),
                                }}
                                value={badge.name}
                            />
                        ))}
                    </View>
                )}

            </Card>
        ))}
    </View>

));