/* =========================================================
   BISMI MART - FINAL APP JAVASCRIPT
   Matched with index.html + style.css
========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id:1,
        name:"Vivo Y17s (4GB • 128GB)",
        price:32999,
        old:38999,
        cat:"Mobiles",
        icon:"📱",
        rating:4.6
    },

    {
        id:2,
        name:"Samsung Galaxy A14",
        price:36999,
        old:42999,
        cat:"Mobiles",
        icon:"📱",
        rating:4.5
    },

    {
        id:3,
        name:"Infinix Hot 30",
        price:31999,
        old:35999,
        cat:"Mobiles",
        icon:"📱",
        rating:4.4
    },

    {
        id:4,
        name:"Xiaomi Redmi 12",
        price:34999,
        old:39999,
        cat:"Mobiles",
        icon:"📱",
        rating:4.5
    },

    {
        id:5,
        name:"Wireless Headphones",
        price:2499,
        old:3499,
        cat:"Electronics",
        icon:"🎧",
        rating:4.7
    },

    {
        id:6,
        name:"Smart Watch",
        price:3999,
        old:5999,
        cat:"Electronics",
        icon:"⌚",
        rating:4.3
    },

    {
        id:7,
        name:"Men Casual Shirt",
        price:1299,
        old:1999,
        cat:"Fashion",
        icon:"👕",
        rating:4.5
    },

    {
        id:8,
        name:"Women Handbag",
        price:2499,
        old:3499,
        cat:"Fashion",
        icon:"👜",
        rating:4.6
    },

    {
        id:9,
        name:"LED Table Lamp",
        price:1799,
        old:2499,
        cat:"Home",
        icon:"💡",
        rating:4.4
    },

    {
        id:10,
        name:"Home Decoration Set",
        price:3499,
        old:4999,
        cat:"Home",
        icon:"🏠",
        rating:4.5
    },

    {
        id:11,
        name:"Beauty Care Kit",
        price:2199,
        old:2999,
        cat:"Beauty",
        icon:"💄",
        rating:4.6
    },

    {
        id:12,
        name:"Grocery Essentials",
        price:1599,
        old:1899,
        cat:"Grocery",
        icon:"🛒",
        rating:4.7
    }

];


/* =========================================================
   APP DATA
========================================================= */

let cart = loadData("bm_cart", []);
let wishlist = loadData("bm_wish", []);
let orders = loadData("bm_orders", []);

let currentProduct = null;

let selectedPayment = "Cash on Delivery";

let currentCategory = null;


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadData(key, fallback){

    try{

        const saved =
            localStorage.getItem(key);

        if(!saved){
            return fallback;
        }

        const data =
            JSON.parse(saved);

        return data;

    }catch(error){

        return fallback;

    }

}


function saveData(){

    localStorage.setItem(
        "bm_cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "bm_wish",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "bm_orders",
        JSON.stringify(orders)
    );

    updateBadges();

}


/* =========================================================
   MONEY
========================================================= */

function money(value){

    return "Rs. " +
        Number(value).toLocaleString("en-PK");

}


/* =========================================================
   TOAST
========================================================= */

function toast(message){

    const element =
        document.getElementById("toast");

    if(!element){
        return;
    }

    element.textContent =
        message;

    element.classList.add("show");

    clearTimeout(
        window.bmToastTimer
    );

    window.bmToastTimer =
        setTimeout(function(){

            element.classList.remove("show");

        },1800);

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id){

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen){

        screen.classList.remove("active");

    });


    const target =
        document.getElementById(id);

    if(!target){

        toast("Screen not available");

        return;

    }


    target.classList.add("active");


    updateBottomNav(id);

    updateBadges();


    if(id === "home"){
        renderHome();
    }

    if(id === "products"){
        renderProducts();
    }

    if(id === "cart"){
        renderCart();
    }

    if(id === "wishlist"){
        renderWishlist();
    }

    if(id === "orders"){
        renderOrders();
    }

    if(id === "account"){
        renderAccount();
    }


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* =========================================================
   BOTTOM NAV
========================================================= */

function updateBottomNav(screenId){

    const navButtons =
        document.querySelectorAll(
            ".nav-btn"
        );

    navButtons.forEach(function(button){

        button.classList.remove("active");

        if(
            button.dataset.screen ===
            screenId
        ){

            button.classList.add("active");

        }

    });

}


/* =========================================================
   HOME
========================================================= */

function goHome(){

    showScreen("home");

}


/* =========================================================
   HOME PRODUCTS
========================================================= */

function renderHome(){

    const container =
        document.getElementById(
            "homeProducts"
        );

    if(!container){
        return;
    }

    container.innerHTML =
        products
            .slice(0,4)
            .map(productCard)
            .join("");

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product){

    const liked =
        wishlist.includes(product.id);

    return `

        <article class="product">

            <button
                class="heart-btn"
                onclick="
                    event.stopPropagation();
                    toggleWishlist(${product.id});
                ">

                ${liked ? "❤️" : "♡"}

            </button>


            <div
                class="product-image"
                onclick="openProduct(${product.id})">

                ${product.icon}

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <div class="rating">

                    ⭐⭐⭐⭐⭐
                    ${product.rating}

                </div>


                <div class="price">

                    ${money(product.price)}

                    <span class="old-price">

                        ${money(product.old)}

                    </span>

                </div>


                <div class="product-actions">

                    <button
                        class="add-btn"
                        onclick="
                            addToCart(${product.id});
                        ">

                        Add to Cart

                    </button>


                    <button
                        class="add-btn view-btn"
                        onclick="
                            openProduct(${product.id});
                        ">

                        View

                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   ALL PRODUCTS
========================================================= */

function renderProducts(list){

    const container =
        document.getElementById(
            "productList"
        );

    if(!container){
        return;
    }


    if(!list){

        list = products;

    }


    const title =
        document.getElementById(
            "productsTitle"
        );


    if(title){

        if(currentCategory){

            title.textContent =
                currentCategory;

        }else{

            title.textContent =
                "All Products";

        }

    }


    if(!list.length){

        container.innerHTML = `

            <div
                class="empty"
                style="grid-column:1/-1">

                <div class="empty-icon">
                    🔍
                </div>

                <h2>
                    No Products Found
                </h2>

                <p>
                    Products in this category
                    will be available soon.
                </p>

                <button
                    class="primary-btn"
                    onclick="showScreen('categories')">

                    Browse Categories

                </button>

            </div>

        `;

        return;

    }


    container.innerHTML =
        list
            .map(productCard)
            .join("");

}


/* =========================================================
   CATEGORY
========================================================= */

function openCategory(name){

    currentCategory = name;

    const result =
        products.filter(function(product){

            return (
                product.cat.toLowerCase() ===
                name.toLowerCase()
            );

        });


    renderProducts(result);

    showScreen("products");

}


/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(id){

    const product =
        products.find(function(item){

            return item.id === Number(id);

        });


    if(!product){

        toast("Product not found");

        return;

    }


    currentProduct =
        product;


    const image =
        document.getElementById(
            "detailImage"
        );

    const name =
        document.getElementById(
            "detailName"
        );

    const price =
        document.getElementById(
            "detailPrice"
        );

    const oldPrice =
        document.getElementById(
            "detailOldPrice"
        );

    const rating =
        document.getElementById(
            "detailRating"
        );


    if(image){
        image.textContent =
            product.icon;
    }

    if(name){
        name.textContent =
            product.name;
    }

    if(price){
        price.textContent =
            money(product.price);
    }

    if(oldPrice){
        oldPrice.textContent =
            money(product.old);
    }

    if(rating){

        rating.textContent =
            "⭐ ⭐ ⭐ ⭐ ⭐ " +
            product.rating;

    }


    showScreen("detail");

}


/* =========================================================
   CURRENT PRODUCT
========================================================= */

function addCurrentProduct(){

    if(!currentProduct){

        toast("Please select a product");

        return;

    }


    addToCart(
        currentProduct.id
    );

}


function buyCurrentProduct(){

    if(!currentProduct){

        toast("Please select a product");

        return;

    }


    addToCart(
        currentProduct.id
    );


    openCheckout();

}


/* =========================================================
   CART
========================================================= */

function addToCart(id){

    id = Number(id);


    const product =
        products.find(function(item){

            return item.id === id;

        });


    if(!product){

        toast("Product not found");

        return;

    }


    const existing =
        cart.find(function(item){

            return item.id === id;

        });


    if(existing){

        existing.qty += 1;

    }else{

        cart.push({
            id:id,
            qty:1
        });

    }


    saveData();

    toast(
        product.name +
        " added to cart 🛒"
    );

}


function changeQty(id, amount){

    id = Number(id);

    const item =
        cart.find(function(product){

            return product.id === id;

        });


    if(!item){
        return;
    }


    item.qty += Number(amount);


    if(item.qty <= 0){

        cart =
            cart.filter(function(product){

                return product.id !== id;

            });

    }


    saveData();

    renderCart();

}


function removeFromCart(id){

    id = Number(id);

    cart =
        cart.filter(function(item){

            return item.id !== id;

        });


    saveData();

    renderCart();

    toast("Removed from cart");

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart(){

    const list =
        document.getElementById(
            "cartList"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );


    if(!list || !summary){
        return;
    }


    if(!cart.length){

        list.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Add products to your cart
                    to continue shopping.
                </p>

                <button
                    class="primary-btn"
                    onclick="showScreen('products')">

                    Start Shopping

                </button>

            </div>

        `;

        summary.innerHTML = "";

        return;

    }


    let subtotal = 0;


    list.innerHTML =
        cart.map(function(item){

            const product =
                products.find(function(p){

                    return p.id === item.id;

                });


            if(!product){
                return "";
            }


            subtotal +=
                product.price *
                item.qty;


            return `

                <div class="cart-item">

                    <div class="cart-img">
                        ${product.icon}
                    </div>


                    <div class="cart-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${money(product.price)}
                        </p>


                        <div class="qty">

                            <button
                                onclick="
                                    changeQty(
                                        ${product.id},
                                        -1
                                    );
                                ">

                                −

                            </button>


                            <b>
                                ${item.qty}
                            </b>


                            <button
                                onclick="
                                    changeQty(
                                        ${product.id},
                                        1
                                    );
                                ">

                                +

                            </button>


                            <button
                                class="remove"
                                onclick="
                                    removeFromCart(
                                        ${product.id}
                                    );
                                ">

                                ✕

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");


    summary.innerHTML = `

        <div class="cart-summary">

            <div class="summary-row">

                <span>
                    Subtotal
                </span>

                <b>
                    ${money(subtotal)}
                </b>

            </div>


            <div class="summary-row">

                <span>
                    Delivery
                </span>

                <b>
                    FREE
                </b>

            </div>


            <div class="summary-row summary-total">

                <span>
                    Total
                </span>

                <span>
                    ${money(subtotal)}
                </span>

            </div>


            <button
                class="checkout-btn"
                onclick="openCheckout()">

                Proceed to Checkout →

            </button>

        </div>

    `;

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id){

    id = Number(id);


    if(
        wishlist.includes(id)
    ){

        wishlist =
            wishlist.filter(function(item){

                return item !== id;

            });

        toast(
            "Removed from wishlist"
        );

    }else{

        wishlist.push(id);

        toast(
            "Added to wishlist ❤️"
        );

    }


    saveData();

    renderHome();

    renderWishlist();

}


function renderWishlist(){

    const container =
        document.getElementById(
            "wishlistList"
        );


    if(!container){
        return;
    }


    const items =
        products.filter(function(product){

            return wishlist.includes(
                product.id
            );

        });


    if(!items.length){

        container.innerHTML = `

            <div
                class="empty"
                style="grid-column:1/-1">

                <div class="empty-icon">
                    ❤️
                </div>

                <h2>
                    Wishlist is Empty
                </h2>

                <p>
                    Save products you love here.
                </p>

                <button
                    class="primary-btn"
                    onclick="showScreen('products')">

                    Browse Products

                </button>

            </div>

        `;

        return;

    }


    container.innerHTML =
        items
            .map(productCard)
            .join("");

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

    if(!cart.length){

        toast("Your cart is empty");

        showScreen("products");

        return;

    }


    let screen =
        document.getElementById(
            "checkout"
        );


    if(!screen){

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "checkout";

        screen.className =
            "screen";

        document.querySelector(
            ".app"
        ).insertBefore(
            screen,
            document.querySelector(
                ".bottom-nav"
            )
        );

    }


    let total = 0;

    cart.forEach(function(item){

        const product =
            products.find(function(p){

                return p.id === item.id;

            });


        if(product){

            total +=
                product.price *
                item.qty;

        }

    });


    screen.innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showScreen('cart')">

                ←

            </button>

            <div>

                <span class="page-kicker">
                    ORDER
                </span>

                <h1>
                    Checkout
                </h1>

            </div>

        </div>


        <div class="form-card">

            <h2>
                Delivery Address
            </h2>

            <p>
                Enter your delivery details.
            </p>


            <input
                class="form-input"
                id="checkoutName"
                type="text"
                placeholder="Full Name"
            >


            <input
                class="form-input"
                id="checkoutPhone"
                type="tel"
                placeholder="Phone Number"
            >


            <input
                class="form-input"
                id="checkoutAddress"
                type="text"
                placeholder="Complete Address"
            >


            <h2 style="margin-top:18px;">
                Payment Method
            </h2>


            <button
                class="account-item"
                onclick="
                    selectPayment(
                        'Cash on Delivery'
                    );
                ">

                💵 Cash on Delivery

            </button>


            <button
                class="account-item"
                onclick="
                    selectPayment('JazzCash');
                ">

                🔴 JazzCash

            </button>


            <button
                class="account-item"
                onclick="
                    selectPayment('Easypaisa');
                ">

                🟢 Easypaisa

            </button>


            <button
                class="account-item"
                onclick="
                    selectPayment(
                        'Credit / Debit Card'
                    );
                ">

                💳 Credit / Debit Card

            </button>


            <div class="cart-summary">

                <div class="summary-row">

                    <span>
                        Items
                    </span>

                    <b>
                        ${cart.reduce(
                            function(total,item){
                                return total +
                                    item.qty;
                            },0
                        )}
                    </b>

                </div>


                <div class="summary-row">

                    <span>
                        Payment
                    </span>

                    <b id="selectedPaymentText">
                        ${selectedPayment}
                    </b>

                </div>


                <div class="summary-row">

                    <span>
                        Delivery
                    </span>

                    <b>
                        FREE
                    </b>

                </div>


                <div
                    class="summary-row summary-total">

                    <span>
                        Total
                    </span>

                    <span>
                        ${money(total)}
                    </span>

                </div>


                <button
                    class="checkout-btn"
                    onclick="placeOrder()">

                    Place Order 🎉

                </button>

            </div>

        </div>

    `;


    showScreen("checkout");

}


/* =========================================================
   PAYMENT
========================================================= */

function selectPayment(method){

    selectedPayment =
        method;


    const text =
        document.getElementById(
            "selectedPaymentText"
        );


    if(text){

        text.textContent =
            method;

    }


    toast(
        method +
        " selected ✓"
    );

}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder(){

    if(!cart.length){

        toast("Your cart is empty");

        return;

    }


    const name =
        document.getElementById(
            "checkoutName"
        )?.value.trim();


    const phone =
        document.getElementById(
            "checkoutPhone"
        )?.value.trim();


    const address =
        document.getElementById(
            "checkoutAddress"
        )?.value.trim();


    if(!name || !phone || !address){

        toast(
            "Please enter delivery details"
        );

        return;

    }


    const order = {

        id:
            "BM" +
            Date.now()
                .toString()
                .slice(-7),

        date:
            new Date()
                .toLocaleDateString(
                    "en-PK"
                ),

        status:
            "Processing",

        payment:
            selectedPayment,

        customer:{
            name:name,
            phone:phone,
            address:address
        },

        items:
            cart.map(function(item){

                return {
                    id:item.id,
                    qty:item.qty
                };

            })

    };


    orders.unshift(order);

    cart = [];

    saveData();


    toast(
        "Order placed successfully 🎉"
    );


    setTimeout(function(){

        showScreen("orders");

    },600);

}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders(){

    const container =
        document.getElementById(
            "ordersList"
        );


    if(!container){
        return;
    }


    if(!orders.length){

        container.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    📦
                </div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    Your orders will appear here.
                </p>

                <button
                    class="primary-btn"
                    onclick="showScreen('products')">

                    Start Shopping

                </button>

            </div>

        `;

        return;

    }


    container.innerHTML =
        orders.map(function(order){

            const first =
                order.items?.[0];


            const product =
                first
                    ? products.find(
                        function(p){
                            return p.id === first.id;
                        }
                    )
                    : null;


            return `

                <div class="order-card">

                    <div class="order-top">

                        <b>
                            Order #${order.id}
                        </b>

                        <span class="status">
                            ${order.status}
                        </span>

                    </div>


                    <div class="order-date">

                        Placed on ${order.date}

                    </div>


                    ${
                        product
                        ?
                        `

                            <div class="order-product">

                                <div class="order-product-icon">

                                    ${product.icon}

                                </div>


                                <div
                                    class="order-product-info">

                                    <b>
                                        ${product.name}
                                    </b>

                                    <p>
                                        Qty:
                                        ${first.qty}
                                    </p>

                                </div>

                            </div>

                        `
                        :
                        ""
                    }


                    <button
                        class="track-btn"
                        onclick="
                            openTracking(
                                '${order.id}'
                            );
                        ">

                        Track Order →

                    </button>

                </div>

            `;

        }).join("");

}


/* =========================================================
   TRACKING
========================================================= */

function openTracking(orderId){

    const order =
        orders.find(function(item){

            return item.id === orderId;

        });


    if(!order){

        toast("Order not found");

        return;

    }


    let screen =
        document.getElementById(
            "tracking"
        );


    if(!screen){

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "tracking";

        screen.className =
            "screen";

        document.querySelector(
            ".app"
        ).insertBefore(
            screen,
            document.querySelector(
                ".bottom-nav"
            )
        );

    }


    screen.innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showScreen('orders')">

                ←

            </button>

            <div>

                <span class="page-kicker">
                    ORDER
                </span>

                <h1>
                    Track Order
                </h1>

            </div>

        </div>


        <div class="order-card">

            <div class="order-top">

                <b>
                    Order #${order.id}
                </b>

                <span class="status">
                    ${order.status}
                </span>

            </div>


            <div class="order-date">

                Placed on ${order.date}

            </div>


            <div style="margin-top:18px;">

                <div class="tracking-step">

                    <div class="tracking-dot">
                        ✓
                    </div>

                    <div>

                        <strong>
                            Order Placed
                        </strong>

                        <p>
                            Your order has been received.
                        </p>

                    </div>

                </div>


                <div class="tracking-step">

                    <div class="tracking-dot">
                        🔄
                    </div>

                    <div>

                        <strong>
                            Processing
                        </strong>

                        <p>
                            Seller is preparing your order.
                        </p>

                    </div>

                </div>


                <div class="tracking-step">

                    <div class="tracking-dot">
                        🚚
                    </div>

                    <div>

                        <strong>
                            Shipped
                        </strong>

                        <p>
                            Your package will be shipped.
                        </p>

                    </div>

                </div>


                <div class="tracking-step">

                    <div class="tracking-dot">
                        🛵
                    </div>

                    <div>

                        <strong>
                            Out for Delivery
                        </strong>

                        <p>
                            Rider will deliver your order.
                        </p>

                    </div>

                </div>


                <div class="tracking-step">

                    <div class="tracking-dot">
                        🏠
                    </div>

                    <div>

                        <strong>
                            Delivered
                        </strong>

                        <p>
                            Your order will be delivered.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    `;


    showScreen("tracking");

}


/* =========================================================
   ACCOUNT
========================================================= */

function getUser(){

    try{

        const data =
            localStorage.getItem(
                "bm_user_data"
            );

        return data
            ? JSON.parse(data)
            : null;

    }catch(error){

        return null;

    }

}


function renderAccount(){

    const container =
        document.getElementById(
            "accountContent"
        );


    if(!container){
        return;
    }


    const user =
        getUser();


    if(user){

        container.innerHTML = `

            <div class="account-card">

                <div class="avatar">
                    👤
                </div>

                <h2>
                    ${escapeHTML(user.name)}
                </h2>

                <p>
                    ${escapeHTML(user.email)}
                </p>

            </div>


            <div class="account-menu">

                <button
                    class="account-item"
                    onclick="
                        showScreen('orders');
                    ">

                    📦
                    <span>My Orders</span>

                </button>


                <button
                    class="account-item"
                    onclick="
                        showScreen('wishlist');
                    ">

                    ❤️
                    <span>Wishlist</span>

                </button>


                <button
                    class="account-item"
                    onclick="
                        openSeller();
                    ">

                    🏪
                    <span>Seller Center</span>

                </button>


                <button
                    class="account-item"
                    onclick="
                        toast(
                            'Address management coming soon'
                        );
                    ">

                    📍
                    <span>My Addresses</span>

                </button>


                <button
                    class="account-item"
                    onclick="
                        toast(
                            'Payment methods coming soon'
                        );
                    ">

                    💳
                    <span>Payment Methods</span>

                </button>


                <button
                    class="account-item"
                    onclick="
                        toast(
                            'Settings coming soon'
                        );
                    ">

                    ⚙️
                    <span>Settings</span>

                </button>


                <button
                    class="account-item"
                    onclick="logoutUser()">

                    🚪
                    <span>Logout</span>

                </button>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="account-card">

            <div class="avatar">
                👤
            </div>

            <h2>
                Welcome to BismiMart
            </h2>

            <p>
                Login or create an account
                to manage your shopping.
            </p>


            <button
                class="login-btn"
                onclick="openLogin()">

                🔐 Login

            </button>


            <button
                class="account-item"
                style="
                    margin-top:10px;
                    border-radius:13px;
                "
                onclick="openSignup()">

                ✨
                <span>
                    Create New Account
                </span>

            </button>

        </div>


        <div class="account-menu">

            <button
                class="account-item"
                onclick="
                    showScreen('orders');
                ">

                📦
                <span>My Orders</span>

            </button>


            <button
                class="account-item"
                onclick="
                    showScreen('wishlist');
                ">

                ❤️
                <span>Wishlist</span>

            </button>


            <button
                class="account-item"
                onclick="
                    openSeller();
                ">

                🏪
                <span>Seller Center</span>

            </button>

        </div>

    `;

}


/* =========================================================
   LOGIN
========================================================= */

function openLogin(){

    let screen =
        document.getElementById(
            "login"
        );


    if(!screen){

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "login";

        screen.className =
            "screen";

        document.querySelector(
            ".app"
        ).insertBefore(
            screen,
            document.querySelector(
                ".bottom-nav"
            )
        );

    }


    screen.innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showScreen('account')">

                ←

            </button>

            <div>

                <span class="page-kicker">
                    ACCOUNT
                </span>

                <h1>
                    Login
                </h1>

            </div>

        </div>


        <div class="form-card">

            <h2>
                Welcome Back 👋
            </h2>

            <p>
                Login to continue shopping
                on BismiMart.
            </p>


            <input
                class="form-input"
                id="loginEmail"
                type="text"
                placeholder="Email or Phone"
            >


            <input
                class="form-input"
                id="loginPassword"
                type="password"
                placeholder="Password"
            >


            <button
                class="form-submit"
                onclick="loginUser()">

                Login

            </button>


            <div class="switch-text">

                Don't have an account?

                <button
                    onclick="openSignup()">

                    Create Account

                </button>

            </div>

        </div>

    `;


    showScreen("login");

}


function loginUser(){

    const email =
        document.getElementById(
            "loginEmail"
        )?.value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        )?.value.trim();


    if(!email || !password){

        toast(
            "Please enter email/phone and password"
        );

        return;

    }


    const user = {

        name:"BismiMart Customer",

        email:email,

        phone:""

    };


    localStorage.setItem(
        "bm_user_data",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "bm_logged_in",
        "true"
    );


    toast(
        "Login successful 🎉"
    );


    setTimeout(function(){

        renderAccount();

        showScreen("account");

    },500);

}


/* =========================================================
   SIGNUP
========================================================= */

function openSignup(){

    let screen =
        document.getElementById(
            "signup"
        );


    if(!screen){

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "signup";

        screen.className =
            "screen";

        document.querySelector(
            ".app"
        ).insertBefore(
            screen,
            document.querySelector(
                ".bottom-nav"
            )
        );

    }


    screen.innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showScreen('account')">

                ←

            </button>

            <div>

                <span class="page-kicker">
                    BISMI MART
                </span>

                <h1>
                    Create Account
                </h1>

            </div>

        </div>


        <div class="form-card">

            <h2>
                Join BismiMart 🎉
            </h2>

            <p>
                Create your free account
                and start shopping.
            </p>


            <input
                class="form-input"
                id="signupName"
                type="text"
                placeholder="Full Name"
            >


            <input
                class="form-input"
                id="signupEmail"
                type="email"
                placeholder="Email"
            >


            <input
                class="form-input"
                id="signupPhone"
                type="tel"
                placeholder="Phone Number"
            >


            <input
                class="form-input"
                id="signupPassword"
                type="password"
                placeholder="Create Password"
            >


            <button
                class="form-submit"
                onclick="createAccount()">

                Create Account

            </button>


            <div class="switch-text">

                Already have an account?

                <button
                    onclick="openLogin()">

                    Login

                </button>

            </div>

        </div>

    `;


    showScreen("signup");

}


function createAccount(){

    const name =
        document.getElementById(
            "signupName"
        )?.value.trim();


    const email =
        document.getElementById(
            "signupEmail"
        )?.value.trim();


    const phone =
        document.getElementById(
            "signupPhone"
        )?.value.trim();


    const password =
        document.getElementById(
            "signupPassword"
        )?.value.trim();


    if(
        !name ||
        !email ||
        !phone ||
        !password
    ){

        toast(
            "Please fill all fields"
        );

        return;

    }


    const user = {

        name:name,

        email:email,

        phone:phone

    };


    localStorage.setItem(
        "bm_user_data",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "bm_logged_in",
        "true"
    );


    toast(
        "Account created successfully 🎉"
    );


    setTimeout(function(){

        renderAccount();

        showScreen("account");

    },600);

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser(){

    localStorage.removeItem(
        "bm_logged_in"
    );

    localStorage.removeItem(
        "bm_user_data"
    );


    toast(
        "Logged out successfully"
    );


    setTimeout(function(){

        renderAccount();

        showScreen("account");

    },500);

}


/* =========================================================
   SELLER CENTER
========================================================= */

function openSeller(){

    let screen =
        document.getElementById(
            "seller"
        );


    if(!screen){

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "seller";

        screen.className =
            "screen";

        document.querySelector(
            ".app"
        ).insertBefore(
            screen,
            document.querySelector(
                ".bottom-nav"
            )
        );

    }


    screen.innerHTML = `

        <div class="page-header">

            <button
                class="back-btn"
                onclick="showScreen('account')">

                ←

            </button>

            <div>

                <span class="page-kicker">
                    SELLER
                </span>

                <h1>
                    Seller Center
                </h1>

            </div>

        </div>


        <div class="seller-card">

            <div class="seller-icon">
                🏪
            </div>

            <h2>
                Start Selling
            </h2>

            <p>
                Sell your products on
                BismiMart and grow your business.
            </p>

        </div>


        <div class="account-menu">

            <button
                class="account-item"
                onclick="addSellerProduct()">

                ➕
                <span>Add New Product</span>

            </button>


            <button
                class="account-item"
                onclick="
                    toast(
                        'My Products opened'
                    );
                ">

                📦
                <span>My Products</span>

            </button>


            <button
                class="account-item"
                onclick="
                    showScreen('orders');
                ">

                🛒
                <span>Seller Orders</span>

            </button>


            <button
                class="account-item"
                onclick="
                    toast(
                        'Earnings screen coming soon'
                    );
                ">

                💰
                <span>Earnings</span>

            </button>


            <button
                class="account-item"
                onclick="
                    toast(
                        'Withdraw screen coming soon'
                    );
                ">

                🏦
                <span>Withdraw Money</span>

            </button>

        </div>

    `;


    showScreen("seller");

}


function addSellerProduct(){

    toast(
        "Product seller system will be added in the next step"
    );

}


/* =========================================================
   SEARCH
========================================================= */

function searchProducts(value){

    let query;


    if(
        typeof value ===
        "string"
    ){

        query =
            value.trim().toLowerCase();

    }else{

        const input =
            document.getElementById(
                "searchInput"
            );

        query =
            input
                ? input.value
                    .trim()
                    .toLowerCase()
                : "";

    }


    currentCategory = null;


    if(!query){

        renderProducts(products);

        showScreen("products");

        return;

    }


    const result =
        products.filter(function(product){

            const text =
                (
                    product.name +
                    " " +
                    product.cat
                ).toLowerCase();

            return text.includes(query);

        });


    const title =
        document.getElementById(
            "productsTitle"
        );


    if(title){

        title.textContent =
            "Search Results";

    }


    renderProducts(result);

    showScreen("products");

}


function searchKey(event){

    if(
        event.key ===
        "Enter"
    ){

        event.preventDefault();

        searchProducts();

    }

}


/* =========================================================
   FILTER
========================================================= */

function filterProducts(type){

    let result =
        [...products];


    if(type === "low"){

        result.sort(
            function(a,b){

                return a.price -
                    b.price;

            }
        );

    }


    if(type === "high"){

        result.sort(
            function(a,b){

                return b.price -
                    a.price;

            }
        );

    }


    if(type === "rating"){

        result.sort(
            function(a,b){

                return b.rating -
                    a.rating;

            }
        );

    }


    currentCategory = null;

    renderProducts(result);

    showScreen("products");

}


/* =========================================================
   BADGES
========================================================= */

function updateBadges(){

    const cartBadge =
        document.getElementById(
            "cartBadge"
        );

    const wishBadge =
        document.getElementById(
            "wishBadge"
        );


    const cartCount =
        cart.reduce(
            function(total,item){

                return total +
                    Number(
                        item.qty || 0
                    );

            },
            0
        );


    if(cartBadge){

        cartBadge.textContent =
            cartCount;

    }


    if(wishBadge){

        wishBadge.textContent =
            wishlist.length;

    }

}


/* =========================================================
   SECURITY HELPER
========================================================= */

function escapeHTML(value){

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* =========================================================
   OLD BUTTON COMPATIBILITY
========================================================= */

function add(id){

    addToCart(id);

}


function toggleWish(id){

    toggleWishlist(id);

}


function detail(id){

    openProduct(id);

}


function checkout(){

    openCheckout();

}


function tracking(id){

    openTracking(id);

}


function login(){

    openLogin();

}


function signupScreen(){

    openSignup();

}


function loginScreen(){

    openLogin();

}


function seller(){

    openSeller();

}


function go(id){

    showScreen(id);

}


/* =========================================================
   INITIALIZE
========================================================= */

function initBismiMart(){

    renderHome();

    renderProducts(products);

    renderWishlist();

    renderCart();

    renderOrders();

    renderAccount();

    updateBadges();

    showScreen("home");

}


/* =========================================================
   DOM READY
========================================================= */

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initBismiMart
    );

}else{

    initBismiMart();

}
