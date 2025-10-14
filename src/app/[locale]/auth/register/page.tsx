'use client'

import FormFields from "@/components/form-fields";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Forms, Pages, Routes } from "@/constants/enum";
import useFormFields from "@/hooks/useFormFields";
import { RegisterAction } from "@/server/actions/auth";
import { RegisterTypes } from "@/types/form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function RegisterPage() {

    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslations('form')
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<RegisterTypes>({
        defaultValues: {
            role: 'student'
        }
    });
    const { getFormFields } = useFormFields({ form: Forms.SIGNUP })
    const router = useRouter()
    const onSubmit: SubmitHandler<RegisterTypes> = async (data) => {
        setLoading(true)
        try {
            const res = await RegisterAction(data);

            if (res.success) {
                setErrorMsg('');
                const msg = (res.data as any)?.message || t('success');
                toast.success(msg);
                router.push(`/${Routes.AUTH}/${Pages.LOGIN}`);
            } else {
                if (res.errors) {
                    if (res.error) setErrorMsg(res.error);
                    Object.entries(res.errors).forEach(([field, messages]) => {
                        const msgArray = messages as string[];
                        setError(field as keyof RegisterTypes, {
                            type: 'server',
                            message: msgArray?.[0] || res.error
                        });
                    });
                } else if (res.error) {
                    toast.error(res.error);
                }
            }
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

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

export default RegisterPage
