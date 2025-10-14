export type ApiFieldErrors = Record<string, string[]>;

export interface ApiErrorResponse {
    status: number;
    message: string;
    errors?: ApiFieldErrors;
    raw?: {
        message?: string;
        errors?: ApiFieldErrors;
        [key: string]: any;
    };
}

export interface ApiErrorObject {
    body?: unknown;
    error: ApiErrorResponse;
}

export type ActionResult<TData> =
    | { success: true; data: TData }
    | { success: false; error: string; errors?: ApiFieldErrors; status?: number };

export function isApiErrorObject(value: unknown): value is ApiErrorObject {
    if (!value || typeof value !== 'object') return false;
    const maybe = value as any;
    const err = maybe.error;
    return !!err && typeof err.status === 'number' && typeof err.message === 'string';
}
