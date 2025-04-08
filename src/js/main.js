import { loadComponent } from "./loadComponent.js";
import { getCartCount, addToCart } from "./cartStorage.js";
import { renderCart } from "./cart.js";
import { renderProductCard } from "./renderProductCard.js";

const products = [
    {
      id: 1,
      name: "Ajax Home Kit",
      price: 79.99,
      image: "./src/images/product/jersey1.png"
    },
    {
      id: 2,
      name: "Albania Away Kit",
      price: 79.99,
      image: "./src/images/product/jersey2.jpeg"
    }
];

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".product-grid");
    for (const product of products) {
      const card = await renderProductCard(product);
      container.appendChild(card);
    }
});

// Load navbar and footer on all pages
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("./src/components/navbar.html", "navbar");
    loadComponent("./src/components/footer.html", "footer");
    renderCart();  // Load cart items
});


document.addEventListener("DOMContentLoaded", () => {
    loadComponent("./src/components/navbar.html", "navbar").then(() => {
        updateCartPill(); // after navbar loads
    });
    loadComponent("./src/components/footer.html", "footer");

    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const btn = e.target;
            const item = {
                id: parseInt(btn.dataset.id),
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                image: btn.dataset.image
            };
            addToCart(item);
            updateCartPill();
        }
    });
});

export function updateCartPill() {
    const pill = document.getElementById("cart-pill");
    if (pill) pill.textContent = getCartCount();
}