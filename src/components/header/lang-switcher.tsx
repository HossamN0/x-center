"use client"

import { useLocale, useTranslations } from "next-intl"
import { Languages } from "@/constants/enum";
import { Button } from "../ui/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const languages = [
    { code: Languages.EN, label: 'English' },
    { code: Languages.AR, label: 'العربية' },
]

export function LangSwitcher() {

    const locale = useLocale();
    const t = useTranslations('languages');
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [_, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleChangeLanguage = (lang: string) => {
        setOpenMenu(false);
        if (lang === locale) return;
        const path = pathname.replace(`/${locale}`, `/${lang}`);
        startTransition(() => {
            router.push(path, { scroll: false });
        });
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])


    return (
        <div ref={menuRef}>
            <Button onClick={() => setOpenMenu(!openMenu)} className="w-full lg:w-fit">
                {locale === Languages.AR ? t('ar') : t('en')} <ChevronDown className={`!w-4 !h-4 transition-all duration-100 ease-in-out ${openMenu ? 'rotate-180' : ''}`} />
            </Button>

            {openMenu &&
                <ul className="lg:absolute bg-primary-foreground/70 shadow-md rounded-md overflow-hidden mt-2 min-w-[120px] z-50 p-1 space-y-3">
                    {languages.map((language, index) =>
                        <li key={index}>
                            <Button onClick={() => handleChangeLanguage(language.code)} className="w-full">
                                {language.label}
                            </Button>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
}


