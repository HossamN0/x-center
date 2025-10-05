import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

function InputPhone({
    title,
    dataName,
    control,
    required = true
}: {
    title: string;
    dataName: string;
    control: any;
    required?: boolean;
}) {

    const t = useTranslations("form");

    return (
        <div>
            <Label htmlFor={dataName} className="mb-4">{title}</Label>
            <Controller
                name={dataName}
                control={control}
                rules={{ required: { value: required, message: t("required", { field: title }) } }}
                render={({ field }) => (
                    <PhoneInput
                        country={'eg'}
                        value={field.value}
                        onChange={field.onChange}
                        onlyCountries={['eg', 'sa']}
                    />
                )}
            />
        </div>
    )
}

export default InputPhone
