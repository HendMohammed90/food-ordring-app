'use client'

import React from 'react'
import { Routes } from '@/constants/enums';
import MainHeading from '@/components/main-heading';
import CartItems from './_components/CartItems';
import CheckoutForm from './_components/CheckoutForm';

const CartPage = () => {
    return (
        <main>
            <section className='section-gap' id={Routes.CART}>
                <div className='container'>
                    <MainHeading subTitle="your order is here" title="Shopping Cart" />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <CartItems />
                        <CheckoutForm />
                    </div>
                </div>
            </section>
        </main >
    )
}

export default CartPage