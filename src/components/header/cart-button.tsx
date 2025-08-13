import { Routes } from '@/constants/enums'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartButton = () => {
    return (
        <Link href={`/${Routes.CART}`} className='relative block group'>
            {/* <button className="bg-chart-5 text-background px-4 py-2 rounded hover:bg-chart-1 hover:text-background">
                View Cart
            </button> */}
            <span>3</span>
            <ShoppingCart className="!w-6 !h-6" />
        </Link>
    )
}

export default CartButton