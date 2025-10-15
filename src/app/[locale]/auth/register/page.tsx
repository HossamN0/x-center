'use client'

import { RegisterAction } from "@/app/api/routes/auth";
import FormFields from "@/components/form-fields";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Forms, Pages, Routes } from "@/constants/enum";
import useFormFields from "@/hooks/useFormFields";
import { useMutationHook } from "@/hooks/useMutation";
import { RegisterRequest } from "@/types/api";
import { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function RegisterPage() {

    const t = useTranslations('form')
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<RegisterRequest>({
        defaultValues: {
            role: 'student'
        }
    });
    const { getFormFields } = useFormFields({ form: Forms.SIGNUP })
    const router = useRouter();
    const regiterMutation = useMutationHook<AxiosResponse, any, { data: RegisterRequest }>({
        mutationFn: RegisterAction,
        onSuccess: () => { router.replace(`/${Routes.AUTH}/${Pages.LOGIN}`) },
    })
    const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
        regiterMutation.mutate({ data })
    };
    useEffect(() => {
        if (regiterMutation?.error?.response?.data?.errors) {
            const errors = regiterMutation?.error?.response?.data?.errors;
            Object.entries(errors).forEach(([field, messages]) => {
                const msgArray = messages as string[];
                setError(field as keyof RegisterRequest, {
                    type: 'server',
                    message: msgArray?.[0] || errors
                });
            })
        }
    }, [regiterMutation.error])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <h2 className="text-xl md:text-2xl font-bold text-center">{t('welcomeBack')}</h2>
            {getFormFields().map((field, index) => (
                <FormFields key={index} {...field} register={register} control={control} errors={errors} />
            ))}
            {regiterMutation?.error?.message &&
                <Label className="text-red-500 mt-3 font-normal">{regiterMutation?.error?.message}</Label>
            }
            <Button type="submit" disabled={regiterMutation.isPending}>{regiterMutation.isPending ? <Loader /> : t('submit')}</Button>
        </form>
    )
}

export default RegisterPage
