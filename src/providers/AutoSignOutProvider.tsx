'use client';

import { useAutoSignOut } from '@/hooks/useAutoSignOut';

export default function AutoSignOutProvider() {
    useAutoSignOut();
    return null;
}
