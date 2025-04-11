import { getCart, saveCart } from "../utils/cartStorage.js";
import {API} from '../../../endpoints.js';

export function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("cart-subtotal");

    cartContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        cartContainer.innerHTML += `
            <div class="flex items-center border-b py-4">
                <button class="text-red-500 mr-4 remove-item" data-index="${index}">✖</button>
                <img src="${item.image}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1 ml-4">
                    <h3 class="font-bold">${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center">
                    <button class="px-2 py-1 border quantity-decrease" data-index="${index}">-</button>
                    <span class="px-4">${item.quantity}</span>
                    <button class="px-2 py-1 border quantity-increase" data-index="${index}">+</button>
                </div>
                <p class="w-24 text-right">$${itemSubtotal.toFixed(2)}</p>
            </div>
        `;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    attachEventListeners(cart);
}

function updateQuantity(index, change, cart) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveCart(cart);
    renderCart();
}

function removeItem(index, cart) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function attachEventListeners(cart) {
    document.querySelectorAll(".quantity-increase").forEach(btn => {
        btn.addEventListener("click", (e) => updateQuantity(e.target.dataset.index, 1, cart));
    });

    document.querySelectorAll(".quantity-decrease").forEach(btn => {
        btn.addEventListener("click", (e) => updateQuantity(e.target.dataset.index, -1, cart));
    });

    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => removeItem(e.target.dataset.index, cart));
    });

    document.getElementById("checkout-btn").addEventListener("click", async () => {
        const cart = getCart();
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.id) {
            alert("Please login to proceed with checkout.");
            return;
        }
    
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const order = {
            user_id: user.id,
            items: cart,
            total: total.toFixed(2),
        };
        console.log("order payload for cart : ", order);
        try {
            const res = await fetch(API.CART, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            });
    
            if (res.ok) {
                alert("Order placed successfully!");
                saveCart([]); // Clear cart
                renderCart();
            } else {
                alert("Failed to place order.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        }
    });
    
}
