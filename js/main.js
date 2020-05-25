const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "y6wf7h5q39xe",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "jVHUxBKvSyn0vCu2VTtPPUzrTDO2JVaF9fjZ-zSjzRg"
  });

// main cart 
let cartItems = [];

// other vars
const cartBtn = document.querySelector('.nav__cartBtn'); 
const closeBtn = document.querySelector('.closeBtn'); 
const removeItem = document.querySelector('.cart__removeItem');
const clearCartItems = document.querySelector('.cart__summary--btnClear'); 
const cartDOM = document.querySelector('.cart__customerCart'); 
const cart = document.querySelector('.cart'); 
const navAmmout = document.querySelector('.nav__ammout'); 
const cartTotal = document.querySelector('.cart__summary--total'); 
const cartContent = document.querySelector('.cart__content'); 
const productDOM = document.querySelector('.shop__productContainer'); 
const shopInfo = document.querySelector('.shop__info'); 
const popupCloseBtn = document.querySelector('.shop__popupClose'); 
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
        ui.getInfoButtons();
        ui.cartLogic();
    });
});