export type ApiFieldErrors = Record<string, string[]>;
export interface ApiErrorObject {
    status?: number;
    message: string;
    errors?: ApiFieldErrors;
    body?: unknown;
}

export type ActionResult<TData> =
    | { success: true; data: TData }
    | { success: false; error: string; errors?: ApiFieldErrors; status?: number };

export function isApiErrorObject(value: unknown): value is ApiErrorObject {
    if (!value || typeof value !== 'object') return false;
    const maybe = value as any;
    return (
        typeof maybe.status === 'number' &&
        typeof maybe.message === 'string'
    );
}


export interface LoginResponse {
    message: string,
    user: User,
    access_token: string,
    refresh_token: string
}

export interface Roles {
    id: number,
    name: string
}

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    status: string,
    created_at: string,
    updated_at: string,
    roles: Roles[]
}