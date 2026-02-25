import { useController } from "react-hook-form";
import Dropdown from "../../common/Dropdown";

type FormSelectInputProps<T> = {
    name: string;
    control: any;
    data: T[];
    placeholder?: string;
    getItemLabel?: (item: T) => string;
    getItemValue?: (item: T) => string;
};

export default function FormSelectInput<T>({
    name,
    control,
    data,
    placeholder,
    getItemLabel = (item) => (item as any).label,
    getItemValue = (item) => (item as any).value,
}: FormSelectInputProps<T>) {
    const { field } = useController({
        name,
        control,
        defaultValue: '',
    });

    const selectedItem =
        data.find(item => getItemValue(item) === field.value) ?? null;

    return (
        <Dropdown<T>
            data={data}
            value={selectedItem}
            placeholder={placeholder}
            getItemLabel={getItemLabel}
            getItemValue={getItemValue}
            onChange={(item) => {
                field.onChange(getItemValue(item));
            }}
        />
    );
}