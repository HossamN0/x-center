import { useTranslations } from "next-intl";
import { Label } from "../ui/label";

function Textarea({
    placeholder,
    label,
    name,
    register,
    required = true,
    errors,
    text
}: {
    placeholder: string;
    label: string;
    name: string;
    register: any;
    required?: boolean;
    errors?: any;
    text?: string;
}) {

    const t = useTranslations("form");

    return (
        <div>
            <Label htmlFor={name} className={`${text} mb-4`}>{label}</Label>
            <textarea
                id={name}
                placeholder={placeholder}
                className="p-2 rounded-md border border-gray-300 w-full h-38 resize-none"
                {...register(name, {
                    required: { value: required, message: t("required", { field: label }) },
                })}
            ></textarea>
            {errors[name] && <Label className="text-red-500 mt-3 font-normal">{errors[name].message}</Label>}
        </div>
    )
}

export default Textarea
