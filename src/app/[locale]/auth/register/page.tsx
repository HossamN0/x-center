'use client'

import FormFields from "@/components/form-fields";
import { Button } from "@/components/ui/button";
import { Forms } from "@/constants/enum";
import useFormFields from "@/hooks/useFormFields";
import { RegisterTypes } from "@/types/form";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

function RegisterPage() {

    const t = useTranslations('form')
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<RegisterTypes>();
    const onSubmit: SubmitHandler<RegisterTypes> = data => console.log(data);
    const { getFormFields } = useFormFields({ form: Forms.SIGNUP })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <h2 className="text-xl md:text-2xl font-bold text-center">{t('welcomeBack')}</h2>
            {getFormFields().map((field, index) => (
                <FormFields key={index} {...field} register={register} control={control} errors={errors} />
            ))}
            <Button type="submit">{t('submit')}</Button>
        </form>
    )
}

export default RegisterPage
