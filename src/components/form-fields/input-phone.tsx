import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

function InputPhone({
    label,
    name,
    control,
    required = true,
    errors
}: {
    label: string;
    name: string;
    control: any;
    required?: boolean;
    errors?: any
}) {

    const t = useTranslations("form");

    return (
        <div>
            <Label htmlFor={name} className="mb-4">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={{ required: { value: required, message: t("required", { field: label }) } }}
                render={({ field }) => (
                    <PhoneInput
                        country={'eg'}
                        value={field.value}
                        onChange={field.onChange}
                        onlyCountries={['eg', 'sa']}
                    />
                )}
            />
            {errors[name] && <Label className="text-red-500 mt-3 font-normal">{errors[name].message}</Label>}
        </div>
    )
}

export default InputPhone
