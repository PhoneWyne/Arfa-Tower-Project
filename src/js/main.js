import { loadLayout } from "./layout.js";
import { setupCartEvents, updateCartPill } from "./cartEvents.js";
import { renderCart } from "./pages/cart.js";
import { renderProducts } from "./pages/product.js";
import { handleLogin, handleSignup} from "./pages/auth.js";
import { API } from "../../endpoints.js";

document.addEventListener("DOMContentLoaded", () => {
  // ensure navbar+footer is loaded, then update cart pill 
  loadLayout().then(() => {
    updateCartPill();
    attachAuthHandlers();
    updateNavbarAuth();
  }); 

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

  if (window.location.pathname.includes("account.html")) {
    renderAccountPage(); 
  }
});

function attachAuthHandlers() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
}

function updateNavbarAuth() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const links = navbar.querySelectorAll("a");
  const loginLink = [...links].find(link => link.textContent.trim() === "Login");
  const accountLink = [...links].find(link => link.textContent.trim() === "Account");
  console.log("user : ", user);
  if (user) {
    if (loginLink) loginLink.style.display = "none";
    if (accountLink) accountLink.style.display = "inline";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "hover:text-blue-500";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload();
    });

    navbar.querySelector(".md\\:flex").appendChild(logoutBtn);
  } else {
    if (loginLink) loginLink.style.display = "inline";
    if (accountLink) accountLink.style.display = "none";
  }
}


function renderAccountPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.querySelector(".flex-grow");

  if (!user) {
    container.innerHTML = `<p class="text-center mt-8 text-red-500">You must be logged in to view your account.</p>`;
    return;
  }

  fetch(`${API.CART}/${user.id}`)
    .then(res => res.json())
    .then(orders => {
      
      const orderList = orders.map(order => {
        console.log("order : ", order);
        const items = (order.items).map(item => `${item.name} x${item.quantity}`).join(", ");
        return `
          <div class="bg-white p-4 rounded shadow mb-4">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Items:</strong> ${items}</p>
            <p><strong>Total:</strong> $${order.total}</p>
          </div>
        `;
      }).join("");

      container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-8">
          <h2 class="text-xl font-bold mb-4">Welcome, ${user.name}</h2>
          <h3 class="text-lg font-semibold mb-2">Your Orders:</h3>
          ${orderList || `<p>No orders found.</p>`}
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p class="text-center mt-8 text-red-500">Failed to load order history.</p>`;
    });
}