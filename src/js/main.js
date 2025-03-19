import { loadComponent } from "./loadComponent.js";


// Load navbar and footer on all pages
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("./src/components/navbar.html", "navbar");
    loadComponent("./src/components/footer.html", "footer");
});
