export async function renderProductCard(product) {
    const res = await fetch("./src/components/productCard.html");
    let html = await res.text();
  

    html = html.replace(/{{id}}/g, product.id)
               .replace(/{{name}}/g, product.name)
               .replace(/{{price}}/g, product.price)
               .replace(/{{image}}/g, product.image);
  
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    return wrapper.firstElementChild;
}
  