import { useTranslations } from "next-intl";
import { Label } from "../ui/label";

function Input({
    type = "text",
    placeholder,
    title,
    dataName,
    register,
    required = true,
}: {
    type?: string;
    placeholder: string;
    title: string;
    dataName: string;
    register: any;
    required?: boolean;
}) {

    const t = useTranslations("form");

    return (
        <div>
            <Label htmlFor={dataName} className="mb-4">{title}</Label>
            <input
                id={dataName}
                type={type}
                placeholder={placeholder}
                className="p-2 rounded-md border border-gray-300 w-full"
                {...register(dataName, {
                    required: { value: required, message: t("required", { field: title }) },
                    pattern: type === "email" ? { value: /^\S+@\S+$/i, message: t('invalidemail') } : undefined,
                })}
            />
        </div>
    )
}

export default Input
