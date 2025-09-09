'use client'

import { Routes } from "@/constants/enums"
import Link from "../link"
import { Button } from "../ui/button"
import { useState } from "react"
import { Menu, XIcon } from "lucide-react"
import CartButton from "./cart-button"
import AuthButton from "./AuthButton"

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const links = [
        { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
        { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
        { id: crypto.randomUUID(), title: "Contact", href: Routes.CONTACT },
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
                        <Link href={`/${link.href}`} className="text-chart-5 hover:text-chart-1 duration-200 transition-colors font-semibold">
                            {link.title}
                        </Link>
                    </li>
                ))}
                <li>
                    <AuthButton />
                </li>
            </ul>
            <CartButton />
        </nav>
    )
}

export default Navbar