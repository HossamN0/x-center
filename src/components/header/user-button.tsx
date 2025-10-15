'use client'

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button"
import { truncateText } from "../ui/truncateText"
import { ChevronDown } from "lucide-react";
import Link from "../link";
import { Pages, Roles, Routes } from "@/constants/enum";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";

function UserButton({ session }: { session: any }) {

    const t = useTranslations('isAuth')
    const [profileMenu, setProfileMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const handleMenu = () => {
        setProfileMenu((prev) => !prev)
    }
    const route = session?.data?.role === Roles.STUDENT ? Routes.STUDENT : session?.data?.role === Roles.INSTRUCTOR && Routes.INSTRUCTOR
    const menu = [
        { label: 'dashboard', route: `/${route}/${Pages.DASHBOARD}` },
        { label: 'myCourses', route: `/${route}/${Pages.COURSES}` },
        { label: 'profile', route: `/${route}/${Pages.PROFILE}` },
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setProfileMenu(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])
    return (
        <div ref={menuRef} className="relative lg:rtl:ml-10 lg:ltr:mr-10 flex items-center flex-col ">
            <Button onClick={handleMenu}>
                {truncateText(session?.data?.name!, 8)}
                <ChevronDown className={`!w-4 !h-4 transition-all duration-100 ease-in-out ${profileMenu ? 'rotate-180' : ''}`} />
            </Button>
            {profileMenu &&
                <>
                    <ul className="lg:absolute z-50 top-[calc(100%+7px)] lg:left-1/2 lg:-translate-x-1/2 lg:bg-primary-foreground min-w-40 rounded-md py-3 text-center lg:text-start">
                        {menu.map((item, index) =>
                            <li key={index}><Link href={item.route} className="hover:bg-primary lg:px-5 py-2 cursor-pointer block">{t(item.label)}</Link></li>
                        )}
                        <li><button onClick={() => signOut()} className="hover:bg-primary lg:px-5 py-2 cursor-pointer w-full lg:text-start">{t('logout')}</button></li>
                    </ul>
                </>
            }
        </div>
    )
}

export default UserButton
