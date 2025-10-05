import { useTranslations } from "next-intl";
import { Label } from "../ui/label";

function Input({
    type = "text",
    placeholder,
    label,
    name,
    register,
    required = true,
    errors
}: {
    type?: string;
    placeholder: string;
    label: string;
    name: string;
    register: any;
    required?: boolean;
    errors?: any
}) {

    const t = useTranslations("form");

    return (
        <div>
            <Label htmlFor={name} className="mb-4">{label}</Label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="p-2 rounded-md border border-gray-300 w-full"
                {...register(name, {
                    required: { value: required, message: t("required", { field: label }) },
                    pattern: type === "email" ? { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: t('invalidemail') } : undefined,
                })}
            />
            {errors[name] && <Label className="text-red-500 mt-3 font-normal">{errors[name].message}</Label>}
        </div>
    )
}

export default Input
