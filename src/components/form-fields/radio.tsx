"use client";

import clsx from "clsx";
import "@/styles/inputs.css";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

export default function Radio({
    name,
    value,
    label,
    register,
    watch,
    required = true,
}: {
    name: string;
    value: string | number;
    label: string;
    register: any;
    watch: any;
    required?: boolean;
}) {
    const t = useTranslations("form");
    const selected = watch(name);

    return (
        <>
            <Label
                key={value}
                className="flex items-center my-6 cursor-pointer select-none"
            >
                <input
                    type="radio"
                    value={value}
                    {...register(name, {
                        required: required ? t("required", { field: label }) : false,
                    })}
                    className="hidden"
                />
                <span
                    className={clsx(
                        "relative w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center mr-[18px] transition-all duration-300 ease-out border-primary-foreground",
                        selected == value &&
                        "border-primary scale-90 shadow-[0_0_30px_#00a6ff,0_0_80px_rgba(0,166,255,0.2)]"
                    )}
                >
                    <span
                        className={clsx(
                            "absolute w-[10px] h-[10px] bg-primary-foreground rounded-full scale-0 transition-transform duration-300 ease-out",
                            selected == value && "bg-primary scale-100"
                        )}
                    ></span>
                    <span
                        className={clsx(
                            "absolute w-[34px] h-[34px] border-2 border-transparent rounded-full border-t-[#037cbd] opacity-0 scale-75 transition-all duration-500 ease-in-out",
                            selected == value &&
                            "opacity-100 scale-[1.3] animate-[orbit_2.5s_linear_infinite]"
                        )}
                    ></span>
                </span>
                <span
                    className={clsx(
                        "text-[1.1rem] font-medium text-primary-foreground transition-colors duration-300",
                        selected == value && "text-primary font-bold"
                    )}
                >
                    {label}
                </span>
            </Label>
        </>
    );
}
