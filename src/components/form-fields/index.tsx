import { InputsType } from "@/constants/enum";
import Input from "./input";
import InputPassword from "./input-password";
import InputPhone from "./input-phone";
import React from "react";
import '@/styles/inputs.css';

const FormFields = (props: any) => {
    const { type } = props;

    const renderField = (): React.ReactNode => {
        switch (type) {
            case InputsType.TEXT:
            case InputsType.EMAIL:
                return <Input {...props} />;
            case InputsType.PASSWORD:
                return <InputPassword {...props} />;
            case InputsType.PHONE:
                return <InputPhone {...props} />;
            default:
                return <></>
        }
    }

    return <>{renderField()}</>
}

export default FormFields