'use client'

import { Routes, Pages } from "@/constants/enums"
import Link from "../link"
import { Button, buttonVariants } from "../ui/button"
import { useState } from "react"
import { Menu, XIcon } from "lucide-react"
import CartButton from "./cart-button"

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const links = [
        { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
        { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
        { id: crypto.randomUUID(), title: "Contact", href: Routes.CONTACT },
        {
            id: crypto.randomUUID(),
            title: "Login",
            href: `${Routes.AUTH}/${Pages.LOGIN}`,
        }
    ]
    return (
        <nav className="flex gap-4 justify-center items-center">
            <Button
                variant={'secondary'}
                size={'sm'}
                className="lg:hidden hover:cursor-pointer"
                onClick={() => setOpenMenu(!openMenu)}
            >
                <Menu className="!w-6 !h-6" />
            </Button>
            <ul className={`fixed lg:static ${openMenu ? "left-0 z-50" : "-left-full"
                } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-center justify-center lg:items-center lg:justify-start gap-10`}
            >
                <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-10 right-10 lg:hidden hover:cursor-pointer"
                    onClick={() => setOpenMenu(false)}
                >
                    <XIcon className="!w-6 !h-6" />
                </Button>
                {links.map((link) => (
                    <li key={link.id}>
                        <Link href={`/${link.href}`} className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ? `${buttonVariants({ size: 'lg', variant: 'outline' })} !px-8 !rounded-full bg-chart-5 text-background hover:text-background hover:bg-chart-1` : "text-chart-5 hover:text-chart-1  duration-200 transition-colors"} font-semibold`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <CartButton />
        </nav>
    )
}

export default Navbar