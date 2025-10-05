import { Forms } from "@/constants/enum"
import useFormFields from "@/hooks/useFormFields"

function LoginPage() {

    const { getFormFields } = useFormFields({ form: Forms.LOGIN })
    console.log(getFormFields())

    return (
        <form>

        </form>
    )
}

export default LoginPage
