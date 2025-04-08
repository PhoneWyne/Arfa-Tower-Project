import { getCartCount, addToCart } from "./cartStorage.js";

export function setupCartEvents() {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const btn = e.target;
      const item = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
      };
      addToCart(item);
      updateCartPill();
    }
  });
}

export function updateCartPill() {
  const pill = document.getElementById("cart-pill");
  if (pill) pill.textContent = getCartCount();
}
