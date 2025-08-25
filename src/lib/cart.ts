
import { CartItem } from '@/redux/cartSlice'




export const getCartQuantity = (cartData: CartItem[]) => {
    return cartData.reduce((acc, item) => item.quantity! + acc, 0)
}