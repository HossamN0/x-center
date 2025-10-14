'use server';

import { post } from "../ssr-utils";
import { ActionResult, isApiErrorObject } from "@/types/api";
import { RegisterTypes } from "@/types/form";

export async function RegisterAction(data: RegisterTypes): Promise<ActionResult<unknown>> {
    try {
        const res = await post('/register', data);
        return { success: true, data: res };
    } catch (error: unknown) {
        if (isApiErrorObject(error)) {
            return {
                success: false,
                error: error.error.message,
                errors: error.error.errors,
                status: error.error.status
            };
        }
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Registration failed' };
    }
}