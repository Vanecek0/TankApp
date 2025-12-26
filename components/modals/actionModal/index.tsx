import CustomButton from '@/components/common/Buttons';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/hooks/useModal';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import React from 'react';
import { View } from 'react-native';

export default function ActionModal({ children }: { children: React.ReactNode }) {
    const { hidePlainModal } = useModal();
    const { isDark } = useTheme()

    return (
        <View className='flex h-full justify-end items-end relative'
            style={{
                backgroundColor: isDark ? '#000000df' : "#ffffffdf",
                zIndex: 10
            }}
            onTouchEnd={() => hidePlainModal()}
        >
            <View style={{
                ...spacing.right(20),
                ...spacing.mb(12),
                ...spacing.gap(12),
                ...spacing.pb(168)
            }}
                className='items-end absolute'
            >
                {children}
            </View>

            <CustomButton
                onPress={() => hidePlainModal()}
                style={{
                    ...spacing.borderRadius(90),
                    ...spacing.my(87),
                    ...spacing.right(20),
                    ...spacing.width(80)
                }}
                className={`flex justify-center items-center aspect-square`}
                label='+'
                labelSize='xl'
                labelStyle={{ color: Colors.white }}
                backgroundColor={Colors.primary}
            />
        </View>
    )
}