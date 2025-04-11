import { loadLayout } from "./layout.js";
import { setupCartEvents, updateCartPill } from "./cartEvents.js";
import { renderCart } from "./pages/cart.js";
import { renderProducts } from "./pages/product.js";

document.addEventListener("DOMContentLoaded", () => {
  // ensure navbar+footer is loaded, then update cart pill 
  loadLayout().then(updateCartPill); 

  // render store page, if there's `product-grid`
  if (document.querySelector(".product-grid")) {
    renderProducts(".product-grid");
  }

  // render cart if there is `cart-items`
  if (document.getElementById("cart-items")) {
    renderCart();
  }
  // Listen for "Add to Cart"
  setupCartEvents(); 
});
