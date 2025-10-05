'use client';

import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeClosed } from "lucide-react";

function InputPassword({
    placeholder,
    title,
    dataName,
    register,
    required = true,
}: {
    placeholder: string;
    title: string;
    dataName: string;
    register: any;
    required?: boolean;
}) {

    const t = useTranslations("form");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <Label htmlFor={dataName} className="mb-4">{title}</Label>
            <div className="relative">
                <input
                    id={dataName}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="p-2 rounded-md border border-gray-300 w-full"
                    {...register(dataName, {
                        required: { value: required, message: t("required", { field: title }) },
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
