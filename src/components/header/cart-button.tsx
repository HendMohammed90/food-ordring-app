import { Routes } from '@/constants/enums'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartButton = () => {
    return (
        <Link href={`/${Routes.CART}`} className='relative block group'>
            <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-chart-1 rounded-full text-accent text-center'>3</span>
            <ShoppingCart className="!w-6 !h-6 text-primary group-hover:text-chart-1 duration-200 transition-colors" />
        </Link>
    )
}

export default CartButton