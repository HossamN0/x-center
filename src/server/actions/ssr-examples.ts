'use server';

import { get, post, put, del, patch } from '../ssr-utils';

// Example server actions using SSR utilities
export async function getUsers(page: number = 1, limit: number = 10) {
    try {
        const users = await get('/api/users', { 
            page: page.toString(), 
            limit: limit.toString() 
        });
        return { success: true, data: users };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch users' 
        };
    }
}

export async function createUser(userData: { name: string; email: string }) {
    try {
        const newUser = await post('/api/users', userData);
        return { success: true, data: newUser };
    } catch (error) {
        console.error('Error creating user:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to create user' 
        };
    }
}

export async function updateUser(id: string, userData: Partial<{ name: string; email: string }>) {
    try {
        const updatedUser = await put(`/api/users/${id}`, userData);
        return { success: true, data: updatedUser };
    } catch (error) {
        console.error('Error updating user:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to update user' 
        };
    }
}

export async function deleteUser(id: string) {
    try {
        await del(`/api/users/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to delete user' 
        };
    }
}

export async function patchUser(id: string, updates: Partial<{ name: string; email: string }>) {
    try {
        const patchedUser = await patch(`/api/users/${id}`, updates);
        return { success: true, data: patchedUser };
    } catch (error) {
        console.error('Error patching user:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to patch user' 
        };
    }
}
