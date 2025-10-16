'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function useAutoSignOut() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.error === 'RefreshAccessTokenError') {
            console.warn("Token refresh failed — logging out");
            signOut({ callbackUrl: '/auth/login' });
        }
    }, [session, status]);
}
