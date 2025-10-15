import { LoginRequest, RegisterRequest } from "@/types/api";
import request from "@/lib/utils/axios-utils";

export const RegisterAction = ({ data }: { data: RegisterRequest }) => {
    return request({ url: '/register', method: 'POST', data });
}

export const LoginAction = ({ data }: { data: LoginRequest }) => {
    return request({ url: '/login', method: 'POST', data });
}