// utils/cookieCart.ts
import { getCookie, setCookie } from "cookies-next";

export function loadCart() {
    try {
        const cookie = getCookie("cart");
        return cookie ? JSON.parse(cookie as string) : [];
    } catch (err) {
        console.error("Invalid cart cookie data:", err);
        return []; // fallback to empty cart
    }
}

export function saveCart(cart: any) {
    // Always stringify before saving
    setCookie("cart", JSON.stringify(cart));
}
