'use server'

import { authOptions } from "@/app/api/auth";
import { Routes } from "@/constants/enum";
import { ReviewFormProps } from "@/types/api";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const enrollInCourse = async ({ course_id }: { course_id: number }) => {
    const session = await getServerSession(authOptions);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/enroll`, {
            method: 'POST',
            body: JSON.stringify({ course_id: course_id }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${session?.access_token}`,
            },
        })
        if (!res.ok) {
            throw new Error(res?.statusText);
        }
        const result = await res.json();
        revalidatePath(`/${Routes.COURSES}/${course_id}`);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export const courseReview = async ({ data }: { data: ReviewFormProps }) => {
    const session = await getServerSession(authOptions);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/review`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${session?.access_token}`,
            },
        })
        if (!res.ok) {
            throw new Error(res?.statusText);
        }
        const result = await res.json();
        revalidatePath(`/${Routes.COURSES}/${data.course_id}`);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}