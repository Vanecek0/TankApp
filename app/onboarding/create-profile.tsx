import FormTextInput from '@/components/forms/FormTextInput';
import ScaledText from '@/components/common/ScaledText';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Button } from 'react-native';

export default function CreateProfile() {
    const [name, setName] = useState('');
    const router = useRouter();
    const { isDark } = useTheme();
    const { control, handleSubmit, formState } = useForm();


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <ScaledText size='lg' className='font-bold'>Základní informace o vozidle</ScaledText>
            <ScaledText size='base'>Zadejte základní údaje o vašem automobilu</ScaledText>

            <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Značka vozidla</ScaledText>
                </View>

                <FormTextInput name="manufacturer" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

             <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Model</ScaledText>
                </View>

                <FormTextInput name="model" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

             <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Přezdívka</ScaledText>
                </View>

                <FormTextInput name="car_nickname" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

            <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Palivo</ScaledText>
                </View>

                <FormTextInput name="fuel" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

            <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Tachometr</ScaledText>
                </View>

                <FormTextInput name="tachometer" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

            <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Rok výroby</ScaledText>
                </View>

                <FormTextInput name="manufacturer_year" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

            <View>
                <View className='flex-row items-center' style={{ ...spacing.mb(6), ...spacing.gap(8) }}>
                    <ScaledText size='base' style={{ color: isDark ? Colors.white : '' }}>Datum registrace</ScaledText>
                </View>

                <FormTextInput name="registration_date" defaultValue={''} control={control} style={{ padding: 8, color: isDark ? Colors.white : '' }}></FormTextInput>
            </View>

        
            <Button title="Pokračovat" onPress={() => router.push('/home')} />
        </View>
    );
}