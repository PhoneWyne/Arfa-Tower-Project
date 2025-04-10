import { renderProductCard } from "../components/renderProductCard.js";

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

export async function renderProducts(containerSelector) {
  const container = document.querySelector(containerSelector);
  for (const product of products) {
    const card = await renderProductCard(product);
    container.appendChild(card);
  }
}
