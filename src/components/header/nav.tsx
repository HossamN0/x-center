'use client'

import { Pages, Routes } from "@/constants/enum"
import Link from "../link"
import { Button, buttonVariants } from "../ui/button"
import { useState } from "react"
import { Logs, X } from "lucide-react"


const items = [
    { id: crypto.randomUUID(), title: "Home", href: Routes.HOME },
    { id: crypto.randomUUID(), title: 'Centers', href: Routes.CENTERS },
    { id: crypto.randomUUID(), title: "About Us", href: Routes.ABOUT },
    { id: crypto.randomUUID(), title: "Contact Us", href: Routes.CONTACT },
]

function Navbar() {

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <nav>
            <Button
                onClick={() => setOpenMenu(true)}
                className="md:hidden w-fit"
                variant={"ghost"}>
                <Logs className="!w-6 !h-6" />
            </Button>
            <ul
                className={`px-2 transition-all shadow-md md:shadow-none ease-in-out fixed md:static w-full top-0 bg-primary-foreground py-7 md:py-0 flex items-center flex-col md:flex-row xl:gap-16 gap-10 text-[0.95rem] font-medium
                    ${openMenu ? 'left-0 z-50' : '-left-full'}`}
            >
                <Button
                    onClick={() => setOpenMenu(false)}
                    className="md:hidden self-end mb-0 w-fit flex-center"
                    variant={"ghost"}>
                    <X className="!w-6 !h-6" />
                </Button>
                {items.map((item) =>
                    <li key={item.id}>
                        <Link href={`/${item.href}`}>{item.title}</Link>
                    </li>
                )}

                <div className="flex items-center gap-4 *:cursor-pointer">
                    <Link
                        className={`${buttonVariants({ size: "sm" })}`}
                        href={`/${Routes.AUTH}/${Pages.LOGIN}`}
                    >
                        Log in
                    </Link>
                    <Link
                        className={`${buttonVariants({ size: "sm" })}`}
                        href={`/${Routes.AUTH}/${Pages.SIGNUP}`}
                    >
                        Sign up
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
