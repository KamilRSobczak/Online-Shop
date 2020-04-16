// main cart 
let cartItems = [];

// other vars
const cartBtn = document.querySelector('.nav__cartBtn'); // cart-btn
const closeBtn = document.querySelector('.cart__closeBtn'); // close-cart
const removeItem = document.querySelector('.cart__removeItem');
const clearCartItems = document.querySelector('.cart__summary--btnClear'); // clear-cart
const cartDOM = document.querySelector('.cart__customerCart'); //cart
const cart = document.querySelector('.cart'); //cart-overley
const navAmmout = document.querySelector('.nav__ammout'); //cart-items
const cartTotal = document.querySelector('.cart__summary--total'); //cart-total
const cartContent = document.querySelector('.cart__content'); //cart-content
const productDOM = document.querySelector('.shop__productContainer'); //products-center
const bannerBtn = document.querySelector('.banner__button');
const titleBtn = document.querySelector('.nav__title');

let btnsDOM = [];

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    const ui = new UI();

    ui.setupAPP();

    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProduct(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
});