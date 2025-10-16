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

export interface CourseData {
    id: number;
    instructor_id: number;
    title: string;
    subtitle: string;
    price: number;
    image: string;
    description: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    instructor: ApiUser;
    enroll?: 'pending' | 'accepted' | 'rejected' | null;
    reviews?: Review[];
    chapters?: Chapter[];
}

export interface Chapter {
    id: number;
    course_id: number;
    title: string;
    content: string;
}

export interface ApiUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface Review {
    id?: number;
    review_num?: number;
    description?: string;
    student?: ApiUser;
}

export interface PaginationType {
    current_page: number,
    last_page: number,
    total: number,
    per_page: number
}

export interface ReviewFormProps {
    course_id: number;
    description: string;
    review_num: number;
}