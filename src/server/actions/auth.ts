'use server';

import { post } from "../ssr-utils";
import { ActionResult, isApiErrorObject } from "@/types/api";
import { LoginTypes, RegisterTypes } from "@/types/form";

export async function RegisterAction(data: RegisterTypes): Promise<ActionResult<unknown>> {
    try {
        const res = await post('/register', data);
        return { success: true, data: res };
    } catch (error: unknown) {
        if (isApiErrorObject(error)) {
            return {
                success: false,
                error: error.message,
                errors: error.errors,
                status: error.status
            };
        }
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Registration failed' };
    }
}


export async function LoginAction(data: LoginTypes): Promise<ActionResult<unknown>> {
    try {
        const res = await post('/login', data);
        return { success: true, data: res };
    } catch (error: unknown) {
        if (isApiErrorObject(error)) {
            return {
                success: false,
                error: error.message,
            };
        }
        return { success: false, error: 'Login failed' };
    }
}