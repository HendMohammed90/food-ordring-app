'use client'

import { selectCartItems } from '@/redux/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image'
import { formatCurrency } from '@/lib/formatters'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/redux/hooks';
import { removeFromCart } from '@/redux/cartSlice';
import React from 'react';
import { deliveryFee, getTotalAmount } from "@/lib/cart"

const CartItems = () => {
    const cartData = useAppSelector(selectCartItems);
    const dispatch = useAppDispatch();
    const subTotal = getTotalAmount(cartData);

    // console.log("Cart Data:", cartData);
    return (
        <div>
            {cartData && cartData.length > 0 ? (
                <>
                    <ul>
                        {cartData.map((item) => (
                            <li key={item.id}>
                                <div className='flex flex-col md:flex-row gap-6 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='relative w-24 h-24'>
                                            <Image
                                                src={item.image}
                                                className='object-contain'
                                                alt={item.name}
                                                fill
                                            />
                                        </div>
                                        <div>
                                            <h4 className='text-primary font-semibold md:text-lg'>{item.name}</h4>
                                            <div className='relative'>
                                                {item.size && (
                                                    <span className='text-sm text-primary'>
                                                        Size: {item.size.name}
                                                    </span>
                                                )}
                                                {item.extraIngredients && item.extraIngredients.length > 0 && (
                                                    <div className='flex gap-1'>
                                                        <span>Extras:</span>
                                                        <ul>
                                                            {item.extraIngredients.map((extra) => (
                                                                <li key={extra.id}>
                                                                    <span className='text-sm text-primary'>
                                                                        {extra.name} {formatCurrency(extra.price)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <span className='absolute right-0 top-0 text-sm text-primary'>
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-4 justify-end'>
                                        <strong className='text-primary '>
                                            {formatCurrency(item.basePrice)}
                                        </strong>
                                        <Button
                                            onClick={() =>
                                                dispatch(removeFromCart({ id: item.id }))
                                            }
                                            variant='secondary'
                                            className='border'
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col justify-end items-end pt-6'>
                        <span className='text-primary font-medium'>
                            Subtotal:
                            <strong className='text-black'>{formatCurrency(subTotal)}</strong>
                        </span>
                        <span className='text-primary font-medium'>
                            Delivery:
                            <strong className='text-black'>
                                {formatCurrency(deliveryFee)}
                            </strong>
                        </span>
                        <span className='text-primary font-medium'>
                            Total:
                            <strong className='text-black'>
                                {formatCurrency(subTotal + deliveryFee)}
                            </strong>
                        </span>
                    </div>
                </>

            ) : (
                <p>Your cart is empty 🛒</p>
            )
            }
        </div >

    )
}

export default CartItems