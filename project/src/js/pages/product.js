import { renderProductCard } from "../components/renderProductCard.js";
import { API } from "../../../endpoints.js";

export async function renderProducts(containerSelector, search= "", sort= "") {
  const container = document.querySelector(containerSelector);
  // clear existing content 
  container.innerHTML = "";
  try {
    const response = await fetch(API.PRODUCT);

    if(!response.ok) throw new Error("Failed to fetch products.");

    let products = await response.json();
    // Filter by search term
    if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by price
    if (sort === "low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      products.sort((a, b) => b.price - a.price);
    }
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