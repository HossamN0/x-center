'use client'

import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import Link from '../link'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Routes } from '@/constants/enum'

function SearchComponent() {
    const params = useSearchParams();
    const [search, setSearch] = useState<string>(params.get('search') || '');
    const t = useTranslations();
    const linkRef = useRef<HTMLAnchorElement>(null)

    const newParams = new URLSearchParams(params.toString());
    if (search) newParams.set('search', search);
    else newParams.delete('search');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            linkRef.current?.click()
        }
    }

    return (
        <div className="border-input border rounded-2xl text-white flex items-center py-2">
            <Input onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder={t('search.placeholder')} className="placeholder:text-white/80 focus:ring-0 border-0 !text-xl" />
            <Link ref={linkRef} href={`/${Routes.COURSES}?${newParams.toString()}`} className="text-white mx-3"><Search /></Link>
        </div>
    )
}

export default SearchComponent
