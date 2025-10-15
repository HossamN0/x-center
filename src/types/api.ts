export interface RegisterRequest {
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    password: string;
    role: 'student' | 'admin' | 'instructor';
}

export interface RegisterResponse {
    message: string;
}

export interface LoginRequest {
    email: string;
    password: string;
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
