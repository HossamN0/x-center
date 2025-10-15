import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

client.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session?.access_token}`;
        }
        return config;
    }
)

export default function request<T = unknown>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const onSuccess = (response: AxiosResponse<T>): AxiosResponse<T> => {
        return response;
    };

    const onError = (error: AxiosError): never => { throw error; };

    return client(options).then(onSuccess).catch(onError);
}
