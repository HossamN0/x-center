'use client'

import FormFields from "@/components/form-fields"
import { Button } from "@/components/ui/button";
import { Forms } from "@/constants/enum"
import useFormFields from "@/hooks/useFormFields"
import { LoginTypes } from "@/types/form";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

function LoginPage() {

    const { getFormFields } = useFormFields({ form: Forms.LOGIN })
    const { register, handleSubmit, control, formState: { errors } } = useForm<LoginTypes>();
    const onSubmit: SubmitHandler<LoginTypes> = data => console.log(data);
    const t = useTranslations('form')

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

export default LoginPage