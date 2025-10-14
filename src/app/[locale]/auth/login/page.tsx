'use client'

import FormFields from "@/components/form-fields"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Forms, Routes } from "@/constants/enum"
import useFormFields from "@/hooks/useFormFields"
import { LoginTypes } from "@/types/form";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function LoginPage() {

    const t = useTranslations('form')
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const { getFormFields } = useFormFields({ form: Forms.LOGIN })
    const { register, handleSubmit, control, formState: { errors } } = useForm<LoginTypes>();
    const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
        setLoading(true)
        setErrorMsg('')
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            });
            if (!res || !res.ok) {
                return setErrorMsg(res?.error || 'An unknown error occurred');
            }
            toast.success('Logged in successfully')
            return router.replace(`/${Routes.HOME}`)
        } catch (error) {
            toast.error('Something went wrong');
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <h2 className="text-xl md:text-2xl font-bold text-center">{t('welcomeBack')}</h2>
            {getFormFields().map((field, index) => (
                <FormFields key={index} {...field} register={register} control={control} errors={errors} />
            ))}
            {errorMsg &&
                <Label className="text-red-500 mt-3 font-normal">{errorMsg}</Label>
            }
            <Button type="submit" disabled={loading}>{loading ? <Loader /> : t('submit')}</Button>
        </form>
    )
}

export default LoginPage