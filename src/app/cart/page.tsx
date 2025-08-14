'use client'

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart, removeFromCart, selectCartItems } from '@/redux/cartSlice';
import { Routes } from '@/constants/enums';
import MainHeading from '@/components/main-heading';
import CartItems from './_components/CartItems';
import CheckoutForm from './_components/CheckoutForm';
import { useAppSelector } from '@/redux/hooks';

const CartPage = () => {
    // const dispatch = useDispatch<AppDispatch>();
    return (
        <main>
            <section className='section-gap' id={Routes.CART}>
                <div className='container'>
                    <MainHeading subTitle="your order is here" title="Shopping Cart" />
                    {/* {cartData.length === 0 ? (
                        <p>Your cart is empty 🛒</p>
                    ) : (
                        <>
                            {cartData.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border-b py-2"
                                >
                                    <div>
                                        {item.name} x {item.quantity}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>${item.basePrice * (item.quantity ?? 1)}</span>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-red-500"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => dispatch(clearCart())}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Clear Cart
                            </button>
                        </>
                    )} */}
                    <p>Your cart is empty 🛒</p>
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