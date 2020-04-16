
class Storage {
    static saveProduct(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProducts(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(products => products.id == id);
    }

    static saveCustomerCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // check localstorage after refresh the page (or fresh load)
    static getCart() {
        // if there is item in localstorage: then return storage : else empty array []
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}