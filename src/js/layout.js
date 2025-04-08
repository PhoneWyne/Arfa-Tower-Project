import { loadComponent } from "./loadComponent.js";

export function loadLayout() {
  return Promise.all([
    loadComponent("./src/components/navbar.html", "navbar"),
    loadComponent("./src/components/footer.html", "footer"),
  ]);
}
