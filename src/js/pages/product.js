import { renderProductCard } from "../components/renderProductCard.js";
import { API } from "../../../endpoints.js";

export async function renderProducts(containerSelector) {
  const container = document.querySelector(containerSelector);
  // clear existing content 
  container.innerHTML = "";
  try {
    const response = await fetch(API.PRODUCT);

    if(!response.ok) throw new Error("Failed to fetch products.");

    const products = await response.json();

    for(const product of products){
      const card = await renderProductCard({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image_url,
      })
      container.appendChild(card);
    }
  } catch (error) {
    console.error("Error loading products : ", error);
    container.innerHTML = "<p class='text-red-600'>Failed to load products. Please try again later.</p>"
  }
}