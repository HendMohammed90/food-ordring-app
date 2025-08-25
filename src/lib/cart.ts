
import { CartItem } from '@/redux/cartSlice'


export const deliveryFee = 15;


export const getItemQuantity = (id: string, cart: CartItem[]) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
};


export const getCartQuantity = (cartData: CartItem[]) => {
    return cartData.reduce((acc, item) => item.quantity! + acc, 0)
}

export const getSubTotal = (cart: CartItem[]) => {
    return cart.reduce((total, cartItem) => {
        // item.basePrice + item.size.price + extra prices
        const extrasTotal = cartItem.extraIngredients?.reduce(
            (sum, extra) => sum + (extra.price || 0),
            0
        );

        const itemTotal =
            cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0);

        return total + itemTotal * cartItem.quantity!;
    }, 0);

}


export const getTotalAmount = (cart: CartItem[]) => {
    return getSubTotal(cart) + deliveryFee;
};