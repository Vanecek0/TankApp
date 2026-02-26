import { useSelector } from "react-redux";
import { useTankForm } from "./useTankForm";
import { RootState } from "@/store";
import { TankFormValues } from "./schema/tankForm.schema";
import { ScrollView } from "react-native";
import { OdometerSection } from "./sections/OdometerSection";
import { spacing } from "@/utils/SizeScaling";
import CustomButton from "@/components/common/Buttons";
import { ThemeColors as Colors } from "@/constants/Colors";

export default function TankForm() {
    const { control, handleSubmit, formState: { errors } } = useTankForm();

    const { car } = useSelector((s: RootState) => s.car);

    const onSubmit = (data: TankFormValues) => {
        console.log("test");
    };

    return (
        <ScrollView style={{ ...spacing.p(24) }}>
            <OdometerSection control={control} car={car} errors={errors}/>

            <CustomButton
                className='w-[48%]'
                onPress={handleSubmit(
                    onSubmit,
                    (errors) => {
                        console.log("❌ VALIDATION ERRORS", errors);
                    }
                )}
                label="Přidat záznam" labelSize='base' labelClassName='text-center' labelStyle={{ color: Colors.base.white }} style={{ ...spacing.p(12), ...spacing.borderRadius(12), ...spacing.borderWidth(1), borderColor: Colors.base.primary }} backgroundColor={Colors.base.primary} />
        </ScrollView>
    );
}