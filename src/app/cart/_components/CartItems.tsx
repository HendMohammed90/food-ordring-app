import { selectCartItems } from '@/redux/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import React from 'react'

const CartItems = () => {
    const cartData = useAppSelector(selectCartItems);

    return (
        <div>CartItems</div>
    )
}

export default CartItems