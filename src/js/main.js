import { loadComponent } from "./loadComponent.js";

import { renderCart } from "./cart.js";
// Load navbar and footer on all pages
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("./src/components/navbar.html", "navbar");
    loadComponent("./src/components/footer.html", "footer");
    renderCart();  // Load cart items
});
