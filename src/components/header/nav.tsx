'use client'

import { Pages, Routes } from "@/constants/enum"
import Link from "../link"
import { Button, buttonVariants } from "../ui/button"
import { useState } from "react"
import { Logs, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { LangSwitcher } from "./lang-switcher"


const items = [
    { title: "home", href: Routes.HOME },
    { title: 'centers', href: Routes.CENTERS },
    { title: "about", href: Routes.ABOUT },
    { title: "contact", href: Routes.CONTACT },
]

function Navbar() {

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const t = useTranslations('');

    return (
        <nav>
            <Button
                onClick={() => setOpenMenu(true)}
                className="lg:hidden w-fit"
                variant={"ghost"}>
                <Logs className="!w-6 !h-6" />
            </Button>
            <ul
                className={`px-2 transition-all shadow-md lg:shadow-none duration-300 ease-in-out fixed lg:static w-full h-full top-0 bg-primary-foreground py-7 lg:py-0 flex items-center flex-col lg:flex-row xl:gap-16 gap-8 text-[0.95rem] font-medium
                    ${openMenu ? 'ltr:left-0 rtl:right-0 z-50' : 'ltr:-left-full rtl:-right-full'}`}
            >
                <Button
                    onClick={() => setOpenMenu(false)}
                    className="lg:hidden self-end mb-0 w-fit flex-center"
                    variant={"ghost"}>
                    <X className="!w-6 !h-6" />
                </Button>
                {items.map((item, index) =>
                    <li key={index}>
                        <Link href={`/${item.href}`}>{t(item.title)}</Link>
                    </li>
                )}

                <div className="flex items-center gap-4 *:cursor-pointer">
                    <Link
                        className={`${buttonVariants({ size: "sm" })}`}
                        href={`/${Routes.AUTH}/${Pages.LOGIN}`}
                    >
                        {t('login')}
                    </Link>
                    <Link
                        className={`${buttonVariants({ size: "sm" })}`}
                        href={`/${Routes.AUTH}/${Pages.SIGNUP}`}
                    >
                        {t('register')}
                    </Link>
                </div>
                <LangSwitcher />
            </ul>
        </nav>
    )
}

export default Navbar
