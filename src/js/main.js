import { loadLayout } from "./layout.js";
import { setupCartEvents, updateCartPill } from "./cartEvents.js";
import { renderCart } from "./cart.js";
import { renderProducts } from "./product.js";

document.addEventListener("DOMContentLoaded", () => {
  loadLayout().then(updateCartPill); // Navbar/footer, then update pill

  // Home or Store page
  if (document.querySelector(".product-grid")) {
    renderProducts(".product-grid");
  }

  // Cart page
  if (document.getElementById("cart-items")) {
    renderCart();
  }

  setupCartEvents(); // Listen for "Add to Cart"
});
