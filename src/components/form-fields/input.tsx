import { useTranslations } from "next-intl";
import { Label } from "../ui/label";

function Input({
    type = "text",
    placeholder,
    label,
    name,
    register,
    required = true,
}: {
    type?: string;
    placeholder: string;
    label: string;
    name: string;
    register: any;
    required?: boolean;
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
                    pattern: type === "email" ? { value: /^\S+@\S+$/i, message: t('invalidemail') } : undefined,
                })}
            />
        </div>
    )
}

export default Input
