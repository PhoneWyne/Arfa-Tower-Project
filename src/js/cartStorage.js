export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item) {
    const cart = getCart();
    const index = cart.findIndex(p => p.id === item.id);
    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
}

export function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}