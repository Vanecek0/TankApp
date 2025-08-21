import { View } from 'react-native';
import { useRouter } from 'expo-router';
import ScaledText from '@/components/common/ScaledText';
import getScaleFactor, { spacing } from '@/utils/SizeScaling';
import Icon from '@/components/Icon';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/common/Buttons';
import { useTheme } from '@/theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
    const router = useRouter();
    const { isDark } = useTheme();

    return (
        <SafeAreaView
            style={{
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                flex: 1
            }}
            className={`${isDark ? 'dark' : ''}`}
        >
            <View className='flex-1' style={{ ...spacing.mx(26), ...spacing.my(26) }}>
                <View style={{ ...spacing.gap(16), ...spacing.mb(26) }} className='justify-center items-center'>
                    <View style={{
                        backgroundColor: Colors.primary,
                        ...spacing.borderRadius(8),
                        ...spacing.borderRadius(9999),
                        ...spacing.width(80),
                        ...spacing.height(80)
                    }}
                        className="rounded-full flex items-center justify-center"
                    >
                        <Icon name='tank' color={Colors.dark.text} size={getScaleFactor() * 36} />
                    </View>
                    <ScaledText size='2xl' className='text-center font-bold' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Vítejte v TankApp!</ScaledText>
                    <ScaledText size="lg" className='text-center' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>
                        Aplikace, která vám pomáhá kontrolovat náklady na tankování, spravovat servisní záznamy a mít přehled o důležitých termínech.
                    </ScaledText>
                </View>

                <View className='flex-col' style={{ ...spacing.gap(16) }}>
                    <View style={{ ...spacing.gap(4) }} className='justify-center items-center'>
                        <View style={{ backgroundColor: Colors.primary, ...spacing.borderRadius(8) }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Icon name='tank' color={Colors.dark.text} size={getScaleFactor() * 20} />
                        </View>
                        <ScaledText size='lg' className='font-bold' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Sledování tankováni</ScaledText>
                        <ScaledText size='base' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Zaznamenávejte každé tankování a sledujte spotřebu</ScaledText>
                    </View>
                    <View style={{ ...spacing.gap(4) }} className='justify-center items-center'>
                        <View style={{ backgroundColor: Colors.primary, ...spacing.borderRadius(8) }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Icon name='car_repair' color={Colors.dark.text} size={getScaleFactor() * 20} />
                        </View>
                        <ScaledText size='lg' className='font-bold' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Servisní záznamy</ScaledText>
                        <ScaledText size='base' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Plánujte a evidujte všechny servisní úkony</ScaledText>
                    </View>
                    <View style={{ ...spacing.gap(4) }} className='justify-center items-center'>
                        <View style={{ backgroundColor: Colors.primary, ...spacing.borderRadius(8) }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Icon name='bars' color={Colors.dark.text} size={getScaleFactor() * 20} />
                        </View>
                        <ScaledText size='lg' className='font-bold' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Statistiky</ScaledText>
                        <ScaledText size='base' style={{ color: isDark ? Colors.dark.text : Colors.light.text }}>Přehledné grafy a analýzy vašich výdajů</ScaledText>
                    </View>
                </View>

                <View className='flex-1 justify-end' style={{ ...spacing.pb(20), ...spacing.gap(12) }}>
                    <ScaledText size='sm' className='text-center' style={{ color: Colors.inactive_icon }}>Začněte nastavením profilu v dalším kroku</ScaledText>
                    <CustomButton
                        onPress={() => router.push('/onboarding/create-profile')}
                        label={"Začínáme"}
                        labelSize='lg'
                        labelClassName='text-center'
                        labelColor={Colors.white}
                        style={{
                            ...spacing.p(12),
                            ...spacing.borderRadius(12),
                            ...spacing.borderWidth(1),
                            borderColor: Colors.primary
                        }}
                        backgroundColor={Colors.primary}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}