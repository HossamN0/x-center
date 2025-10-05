'use client';

import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeClosed } from "lucide-react";

function InputPassword({
    placeholder,
    label,
    name,
    register,
    required = true,
}: {
    placeholder: string;
    label: string;
    name: string;
    register: any;
    required?: boolean;
}) {

    const t = useTranslations("form");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <Label htmlFor={name} className="mb-4">{label}</Label>
            <div className="relative">
                <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="p-2 rounded-md border border-gray-300 w-full"
                    {...register(name, {
                        required: { value: required, message: t("required", { field: label }) },
                        minLength: { value: 6, message: t("minlength", { length: 6 }) },
                    })}
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-2">
                    <Button
                        variant={"ghost"}
                        size="icon"
                        type="button"
                        className="hover:bg-transparent hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InputPassword
