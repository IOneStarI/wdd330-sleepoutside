import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const productList = document.querySelector(".product-list");
    const footer = document.querySelector(".list-footer");
    const totalDisplay = document.querySelector(".list-total");

    if (cartItems.length > 0) {

        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        productList.innerHTML = htmlItems.join("");

        footer.classList.remove("hide");

        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        productList.innerHTML = "<p>Your cart is empty.</p>";
        footer.classList.add("hide");
    }
}

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();