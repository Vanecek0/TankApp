import { FormSection } from "../../components/FormSection";
import Icon from "@/components/Icon";
import FormNumberInput from "../../inputs/FormNumberInput";
import { FormField } from "../../components/FormField";
import ScaledText from "@/components/common/ScaledText";
import { View } from "react-native";
import getScaleFactor, { spacing } from "@/utils/SizeScaling";
import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";
import { FieldErrors } from "react-hook-form";
import { TankFormValues } from "../schema/tankForm.schema";

type Props = {
    control: any;
    car: any;
    errors: FieldErrors<TankFormValues>;
};

export function OdometerSection({ control, car, errors }: Props) {
    const { isDark } = useTheme();
    return (
        <FormSection>
            <FormField
                label={
                    <View className="flex-row items-center" style={{ ...spacing.gap(6) }}>
                        <Icon name='speedometer' color={isDark ? Colors.icon.primary_dark : Colors.icon.primary} size={getScaleFactor() * 16} />
                        <ScaledText size="base" style={{ color: isDark ? Colors.base.white : Colors.base.black }}>Stav tachometru</ScaledText>
                    </View>
                }
                error={errors?.tachometer?.message}
                hint={car?.odometer ? `Poslední hodnota: ${car.odometer} km` : undefined}
            >
                <FormNumberInput
                    name="tachometer"
                    control={control}
                />
            </FormField>
        </FormSection>
    );
}