class UI {
    displayProducts(products) {
        let result = '';

        // Add html items from the storage to offer page
        products.forEach(products => {
            result += `
            <div class="shop__singleProduct">
                <div class="shop__imgContainer">
                    <img src=${products.image}>
                    <button class="shop__cartButton" data-id="${products.id}">
                        <div></div>Add to cart
                    </button>
                </div>
                <h2>${products.title}</h2>
                <p>Price $${products.price}</p>
            </div>
            `;
        });

        productDOM.innerHTML = result;
    }
    getBagButtons() {
        const btns = [...document.querySelectorAll(".shop__cartButton")];
        btnsDOM = btns;
        btns.forEach(button => {
            let id = button.dataset.id;
            let inCart = cartItems.find(item => item.id == id);
            if (inCart) {
                button.innerText = `in Cart`;
                button.disabled = true;
            }

            button.addEventListener('click', (event) => {
                event.target.innerText = `in Cart`;
                event.target.disabled = true;

                //To get single product from list
                let cartItem = { ...Storage.getProducts(id), amount: 1 };

                // add product to the customer cart
                cartItems = [...cartItems, cartItem];

                // save in storage (local)
                Storage.saveCustomerCart(cartItems);

                //set values
                this.setCartValues(cartItems);
                
                // display item in cart
                this.addCartItem(cartItem);
                
                // show items in customer cart
                this.customerCart();
            });

        })
    }

    setCartValues(cartItems) {
        let temoraryTotal = 0;
        let itemsTotal = 0;
        cartItems.map(item => {
            temoraryTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })

        cartTotal.innerText = parseFloat(temoraryTotal.toFixed(2))
        navAmmout.innerText = itemsTotal;
    }

    // Add html items to the card 
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart__content--entity');

        div.innerHTML = `
                    <img src="${item.image}" alt=" " />
                    <div class="cart__content--detail">
                        <h4>${item.title}</h4>
                        <h5>$${item.price}</h5>
                        <span class="cart__removeItem" data-id=${item.id}>remove</span>
                    </div>
                    <div class="cart__content-ammoutController">
                        <div class="button__arrowUp" data-id=${item.id}></div>
                        <p class="cart__content--itemAmount">
                            ${item.amount}
                        </p>
                        <div class="button__arrowDown" data-id=${item.id}></div>
                    </div>`;
        cartContent.appendChild(div);
    }

    customerCart() {
        if (cart.classList.contains('showCustomerCartContainer') == false) {
            cart.classList.add('showCustomerCartContainer');
            cartDOM.classList.add('showCustomerCart');
        }
        else {
            cart.classList.remove('showCustomerCartContainer');
            cartDOM.classList.remove('showCustomerCart');
        }
    }

    scrollToShop() {
        const element = document.getElementById('shop');
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center"
        });
    }

    scrollToBanner() {
        const element = document.getElementById('banner');
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center"
        });
    }


    setupAPP() {
        cartItems = Storage.getCart();
        this.setCartValues(cartItems);
        this.poppulate(cartItems);
        cartBtn.addEventListener('click', this.customerCart);
        closeBtn.addEventListener('click', this.customerCart);
        bannerBtn.addEventListener('click', this.scrollToShop);
        titleBtn.addEventListener('click', this.scrollToBanner);
    }

    poppulate(cartItems) {
        cartItems.forEach(item => this.addCartItem(item));
    }

    cartLogic() {
        clearCartItems.addEventListener('click', () => {
            this.clearCart();
        });

        //remove single element from cart
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('cart__removeItem')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                this.removeItem(id);
                cartContent.removeChild(removeItem.parentElement.parentElement);

            }
            // set up amout value
            else if (event.target.classList.contains('button__arrowUp')) {
                let addItemAmount = event.target;
                let id = addItemAmount.dataset.id;

                let tempItem = cartItems.find(item => item.id === id);

                tempItem.amount = tempItem.amount + 1;

                Storage.saveCustomerCart(cartItems);
                this.setCartValues(cartItems);
                addItemAmount.nextElementSibling.innerText = tempItem.amount;

            }
            // set down amout value
            else if (event.target.classList.contains('button__arrowDown')) {
                let dropItemAmount = event.target;
                let id = dropItemAmount.dataset.id;

                let tempItem = cartItems.find(item => item.id === id);

                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCustomerCart(cartItems);
                    this.setCartValues(cartItems);
                    dropItemAmount.previousElementSibling.innerText = tempItem.amount;
                }
                else {
                    cartContent.removeChild(dropItemAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })

    }

    // Clear all items from the page (normaly this button will be change to payment section)
    clearCart() {
        let itemsInCart = cartItems.map(item => item.id);
        itemsInCart.forEach(id => this.removeItem(id));

        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }

        this.customerCart();
    }

    // Removing items from cart and change back button to adding in offer page
    removeItem(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        this.setCartValues(cartItems);
        Storage.saveCustomerCart(cartItems);
        let button = this.getSingleButton(id);
        button.disabled = false;

        button.innerHTML = `<div></div>Add to cart`;
    }


    // return single item button with the specific ID
    getSingleButton(id) {
        return btnsDOM.find(button => button.dataset.id === id);
    }
}