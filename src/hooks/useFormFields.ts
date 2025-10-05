import { Forms, InputsType } from "@/constants/enum"
import { IFormField } from "@/types/app"
import { useTranslations } from "next-intl"

const useFormFields = ({ form }: { form: string }) => {
    const t = useTranslations('form')
    const LoginFields = (): IFormField[] => [
        {
            name: 'email',
            type: InputsType.EMAIL,
            label: t('email.label'),
            placeholder: t('email.placeholder'),
            required: true,
            autoFocus: true
        },
        {
            name: 'password',
            type: InputsType.PASSWORD,
            label: t('password.label'),
            placeholder: t('password.placeholder'),
            required: true
        }
    ]

    const RegisterFields = (): IFormField[] => [
        {
            name: 'first_name',
            type: InputsType.TEXT,
            label: t('firstName.label'),
            placeholder: t('firstName.placeholder'),
            required: true,
            autoFocus: true
        },
        {
            name: 'second_name',
            type: InputsType.TEXT,
            label: t('secondName.label'),
            placeholder: t('secondName.placeholder'),
            required: true
        },
        {
            name: 'phone',
            type: InputsType.PHONE,
            label: t('phone.label'),
            placeholder: t('phone.placeholder'),
            required: true
        },
        {
            name: 'email',
            type: InputsType.EMAIL,
            label: t('email.label'),
            placeholder: t('email.placeholder'),
            required: true
        },
        {
            name: 'password',
            type: InputsType.PASSWORD,
            label: t('password.label'),
            placeholder: t('password.placeholder'),
            required: true
        },
        {
            name: 'confirm_password',
            type: InputsType.PASSWORD,
            label: t('confirmPassword.label'),
            placeholder: t('confirmPassword.placeholder'),
            required: true
        }
    ]

    const getFormFields = (): IFormField[] => {
        switch (form) {
            case Forms.LOGIN:
                return LoginFields()
            case Forms.SIGNUP:
                return RegisterFields()
            default:
                return []
        }
    }

    return { getFormFields }
}

export default useFormFields