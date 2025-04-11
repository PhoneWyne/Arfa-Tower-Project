import { getCartCount, addToCart } from "./utils/cartStorage.js";

export function setupCartEvents() {
  // set up event to trigger on clicking "Add to Cart" button
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const btn = e.target;
      // payload for item to be added to cart
      const item = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
      };
      // add to cart / update cart within localStorage
      addToCart(item);
      // update the cart pill icon
      updateCartPill();
    }
  });
}

export function updateCartPill() {
  const pill = document.getElementById("cart-pill");
  if (pill) pill.textContent = getCartCount();
}
