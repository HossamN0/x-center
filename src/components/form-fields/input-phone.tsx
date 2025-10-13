import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
            <div dir="ltr">
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: { value: required, message: t("required", { field: label }) }, minLength: { value: 5, message: t("required", { field: label }) } }}
                    render={({ field }) => (
                        <PhoneInput
                            country={'eg'}
                            value={field.value}
                            onChange={field.onChange}
                            onlyCountries={['eg', 'sa']}
                            specialLabel=""
                            inputClass="!rounded-md !border !border-gray-300 !w-full !bg-transparent"
                            buttonClass="!bg-transparent !border-r !border-gray-300 !rounded-l-md"
                            dropdownClass="!text-black !border !border-gray-300 !rounded-md"
                        />
                    )}
                />
            </div>
            {errors[name] && <Label className="text-red-500 mt-3 font-normal">{errors[name].message}</Label>}
        </div>
    )
}

export default InputPhone
