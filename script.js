/* =========================================================
   BISMI MART - COMPLETE APP JAVASCRIPT
   One clean version - no duplicate functions
========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

  {
    id: 1,
    name: "Vivo Y17s (4GB • 128GB)",
    price: 32999,
    old: 38999,
    cat: "Mobiles",
    icon: "📱",
    rating: 4.6
  },

  {
    id: 2,
    name: "Samsung Galaxy A14",
    price: 36999,
    old: 42999,
    cat: "Mobiles",
    icon: "📱",
    rating: 4.5
  },

  {
    id: 3,
    name: "Infinix Hot 30",
    price: 31999,
    old: 35999,
    cat: "Mobiles",
    icon: "📱",
    rating: 4.4
  },

  {
    id: 4,
    name: "Xiaomi Redmi 12",
    price: 34999,
    old: 39999,
    cat: "Mobiles",
    icon: "📱",
    rating: 4.5
  },

  {
    id: 5,
    name: "Wireless Headphones",
    price: 2499,
    old: 3499,
    cat: "Electronics",
    icon: "🎧",
    rating: 4.7
  },

  {
    id: 6,
    name: "Smart Watch",
    price: 3999,
    old: 5999,
    cat: "Electronics",
    icon: "⌚",
    rating: 4.3
  },

  {
    id: 7,
    name: "Men Casual Shirt",
    price: 1299,
    old: 1999,
    cat: "Fashion",
    icon: "👕",
    rating: 4.5
  },

  {
    id: 8,
    name: "Women Handbag",
    price: 2499,
    old: 3499,
    cat: "Fashion",
    icon: "👜",
    rating: 4.6
  },

  {
    id: 9,
    name: "LED Table Lamp",
    price: 1799,
    old: 2499,
    cat: "Home",
    icon: "💡",
    rating: 4.4
  },

  {
    id: 10,
    name: "Home Decoration Set",
    price: 3499,
    old: 4999,
    cat: "Home",
    icon: "🏠",
    rating: 4.5
  },

  {
    id: 11,
    name: "Beauty Care Kit",
    price: 2199,
    old: 2999,
    cat: "Beauty",
    icon: "💄",
    rating: 4.6
  },

  {
    id: 12,
    name: "Grocery Essentials",
    price: 1599,
    old: 1899,
    cat: "Grocery",
    icon: "🛒",
    rating: 4.7
  }

];


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

  ["Mobiles", "📱"],
  ["Electronics", "💻"],
  ["Fashion", "👕"],
  ["Home", "🏠"],
  ["Beauty", "💄"],
  ["Grocery", "🛒"],
  ["Sports", "⚽"],
  ["Kids", "🧸"]

];


/* =========================================================
   LOCAL STORAGE
========================================================= */

let cart = loadData("bm_cart", []);

let wishlist = loadData("bm_wish", []);

let orders = loadData("bm_orders", []);

let currentProduct = null;

let selectedPayment = "Cash on Delivery";


/* =========================================================
   STORAGE HELPER
========================================================= */

function loadData(key, fallback) {

  try {

    const data = localStorage.getItem(key);

    return data
      ? JSON.parse(data)
      : fallback;

  } catch (error) {

    return fallback;

  }

}


/* =========================================================
   SAVE ALL DATA
========================================================= */

function saveData() {

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

function money(value) {

  return "Rs. " +
    Number(value).toLocaleString("en-PK");

}


/* =========================================================
   TOAST
========================================================= */

function toast(message) {

  let element =
    document.getElementById("toast");

  if (!element) {

    element =
      document.createElement("div");

    element.id = "toast";

    element.className = "toast";

    document.body.appendChild(element);

  }

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(window.bmToastTimer);

  window.bmToastTimer =
    setTimeout(() => {

      element.classList.remove("show");

    }, 1800);

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id) {

  const screens =
    document.querySelectorAll(".screen");

  screens.forEach(screen => {

    screen.classList.remove("active");

  });


  let target =
    document.getElementById(id);


  /*
    If screen doesn't exist,
    create it automatically.
  */

  if (!target) {

    target =
      createMissingScreen(id);

  }


  if (!target) {

    toast("Screen not available");

    return;

  }


  target.classList.add("active");


  /*
    Refresh dynamic screens
  */

  if (id === "home") {

    renderHome();

  }

  if (id === "products") {

    renderProducts();

  }

  if (id === "categories") {

    renderCategories();

  }

  if (id === "cart") {

    renderCart();

  }

  if (id === "wishlist") {

    renderWishlist();

  }

  if (id === "orders") {

    renderOrders();

  }

  if (id === "account") {

    renderAccount();

  }


  updateBadges();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   HOME SHORTCUT
========================================================= */

function goHome() {

  showScreen("home");

}


/* =========================================================
   BACK
========================================================= */

function goBack(screen = "home") {

  showScreen(screen);

}


/* =========================================================
   CREATE MISSING SCREENS
========================================================= */

function createMissingScreen(id) {

  const section =
    document.createElement("section");

  section.id = id;

  section.className = "screen";

  document.querySelector(".app")
    ?.appendChild(section);


  if (id === "checkout") {

    section.innerHTML = `
      <div class="page-header">
        <button
          class="back-btn"
          onclick="showScreen('cart')">
          ←
        </button>

        <h1>Checkout</h1>
      </div>

      <div id="checkoutContent"></div>
    `;

  }


  if (id === "tracking") {

    section.innerHTML = `
      <div class="page-header">
        <button
          class="back-btn"
          onclick="showScreen('orders')">
          ←
        </button>

        <h1>Track Order</h1>
      </div>

      <div id="trackingContent"></div>
    `;

  }


  if (id === "login") {

    section.innerHTML = `
      <div class="page-header">
        <button
          class="back-btn"
          onclick="showScreen('account')">
          ←
        </button>

        <h1>Login</h1>
      </div>

      <div id="loginContent"></div>
    `;

  }


  if (id === "signup") {

    section.innerHTML = `
      <div class="page-header">
        <button
          class="back-btn"
          onclick="showScreen('account')">
          ←
        </button>

        <h1>Create Account</h1>
      </div>

      <div id="signupContent"></div>
    `;

  }


  if (id === "seller") {

    section.innerHTML = `
      <div class="page-header">
        <button
          class="back-btn"
          onclick="showScreen('account')">
          ←
        </button>

        <h1>Seller Center</h1>
      </div>

      <div id="sellerContent"></div>
    `;

  }


  return section;

}


/* =========================================================
   BADGES
========================================================= */

function updateBadges() {

  const cartBadge =
    document.getElementById("cartBadge");

  const wishBadge =
    document.getElementById("wishBadge");


  const cartCount =
    cart.reduce(
      (total, item) =>
        total + Number(item.qty || 0),
      0
    );


  if (cartBadge) {

    cartBadge.textContent =
      cartCount;

  }


  if (wishBadge) {

    wishBadge.textContent =
      wishlist.length;

  }

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const liked =
    wishlist.includes(product.id);


  return `

    <article class="product">

      <button
        class="heart-btn"
        onclick="event.stopPropagation();
                 toggleWishlist(${product.id})">

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
          ⭐⭐⭐⭐⭐ ${product.rating}
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
            onclick="addToCart(${product.id})">

            Add to Cart

          </button>


          <button
            class="add-btn"
            onclick="openProduct(${product.id})">

            View

          </button>

        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

  const container =
    document.getElementById("homeProducts");

  if (!container) return;


  container.innerHTML =
    products
      .slice(0, 4)
      .map(productCard)
      .join("");

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

  /*
    Existing HTML already contains categories.
    No need to replace them.
  */

}


/* =========================================================
   OPEN CATEGORY
========================================================= */

function openCategory(name) {

  const result =
    products.filter(
      product =>
        product.cat.toLowerCase() ===
        name.toLowerCase()
    );


  const title =
    document.getElementById(
      "productsTitle"
    );


  if (title) {

    title.textContent =
      result.length
        ? name
        : name + " - No Products";

  }


  const list =
    document.getElementById(
      "productList"
    );


  if (!list) return;


  if (!result.length) {

    list.innerHTML = `

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

      </div>

    `;

  } else {

    list.innerHTML =
      result
        .map(productCard)
        .join("");

  }


  showScreen("products");

}


/* =========================================================
   ALL PRODUCTS
========================================================= */

function renderProducts(list = products) {

  const container =
    document.getElementById(
      "productList"
    );


  if (!container) return;


  const title =
    document.getElementById(
      "productsTitle"
    );


  if (title) {

    title.textContent =
      list === products
        ? "All Products"
        : "Search Results";

  }


  if (!list.length) {

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
   OPEN PRODUCT DETAILS
========================================================= */

function openProduct(id) {

  const product =
    products.find(
      item => item.id === Number(id)
    );


  if (!product) {

    toast("Product not found");

    return;

  }


  currentProduct = product;


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


  if (image) {

    image.textContent =
      product.icon;

  }


  if (name) {

    name.textContent =
      product.name;

  }


  if (price) {

    price.textContent =
      money(product.price);

  }


  const rating =
    document.querySelector(
      "#detail .detail-rating"
    );


  if (rating) {

    rating.innerHTML =
      `⭐ ⭐ ⭐ ⭐ ⭐ ${product.rating}`;

  }


  showScreen("detail");

}


/* =========================================================
   ADD CURRENT PRODUCT
========================================================= */

function addCurrentProduct() {

  if (!currentProduct) {

    toast("Please select a product");

    return;

  }


  addToCart(currentProduct.id);

}


/* =========================================================
   BUY CURRENT PRODUCT
========================================================= */

function buyCurrentProduct() {

  if (!currentProduct) {

    toast("Please select a product");

    return;

  }


  cart = [
    {
      id: currentProduct.id,
      qty: 1
    }
  ];


  saveData();

  openCheckout();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  id = Number(id);


  const item =
    cart.find(
      product => product.id === id
    );


  if (item) {

    item.qty += 1;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  saveData();


  toast("Added to cart 🛒");

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQty(id, amount) {

  id = Number(id);


  const item =
    cart.find(
      product => product.id === id
    );


  if (!item) return;


  item.qty += Number(amount);


  if (item.qty <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  }


  saveData();

  renderCart();

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeFromCart(id) {

  id = Number(id);


  cart =
    cart.filter(
      item => item.id !== id
    );


  saveData();

  renderCart();

  toast("Removed from cart");

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const list =
    document.getElementById(
      "cartList"
    );

  const summary =
    document.getElementById(
      "cartSummary"
    );


  if (!list || !summary) return;


  if (!cart.length) {

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
          class="shop-btn"
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
    cart
      .map(item => {

        const product =
          products.find(
            p => p.id === item.id
          );


        if (!product) return "";


        subtotal +=
          product.price * item.qty;


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
                  onclick="changeQty(
                    ${product.id},
                    -1
                  )">

                  −

                </button>


                <b>
                  ${item.qty}
                </b>


                <button
                  onclick="changeQty(
                    ${product.id},
                    1
                  )">

                  +

                </button>


                <button
                  onclick="removeFromCart(
                    ${product.id}
                  )">

                  ✕

                </button>

              </div>

            </div>

          </div>

        `;

      })
      .join("");


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

        Proceed to Checkout

      </button>

    </div>

  `;

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

  id = Number(id);


  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

    toast("Removed from wishlist");

  } else {

    wishlist.push(id);

    toast("Added to wishlist ❤️");

  }


  saveData();


  renderHome();


  if (
    document
      .getElementById("wishlist")
      ?.classList.contains("active")
  ) {

    renderWishlist();

  }

}


/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist() {

  const list =
    document.getElementById(
      "wishlistList"
    );


  if (!list) return;


  const items =
    products.filter(
      product =>
        wishlist.includes(product.id)
    );


  if (!items.length) {

    list.innerHTML = `

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
          class="shop-btn"
          onclick="showScreen('products')">

          Browse Products

        </button>

      </div>

    `;

    return;

  }


  list.innerHTML =
    items
      .map(productCard)
      .join("");

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

  if (!cart.length) {

    toast("Your cart is empty");

    showScreen("products");

    return;

  }


  const screen =
    document.getElementById(
      "checkout"
    ) ||
    createMissingScreen("checkout");


  let content =
    document.getElementById(
      "checkoutContent"
    );


  if (!content) {

    content =
      document.createElement("div");

    content.id =
      "checkoutContent";

    screen.appendChild(content);

  }


  let total = 0;


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );


    if (product) {

      total +=
        product.price * item.qty;

    }

  });


  content.innerHTML = `

    <div class="login-box">

      <h2>
        Delivery Address
      </h2>

      <p>
        Enter your delivery details.
      </p>


      <input
        id="checkoutName"
        type="text"
        placeholder="Full Name"
      >


      <input
        id="checkoutPhone"
        type="tel"
        placeholder="Phone Number"
      >


      <input
        id="checkoutAddress"
        type="text"
        placeholder="Complete Address"
      >


      <h2 style="margin-top:20px;">
        Payment Method
      </h2>


      <button
        class="account-item"
        onclick="selectPayment('Cash on Delivery')">

        💵 Cash on Delivery

      </button>


      <button
        class="account-item"
        onclick="selectPayment('JazzCash')">

        🔴 JazzCash

      </button>


      <button
        class="account-item"
        onclick="selectPayment('Easypaisa')">

        🟢 Easypaisa

      </button>


      <button
        class="account-item"
        onclick="selectPayment('Credit / Debit Card')">

        💳 Credit / Debit Card

      </button>


      <div
        class="cart-summary"
        style="margin-top:20px;">

        <div class="summary-row">

          <span>
            Total Items
          </span>

          <b>
            ${cart.reduce(
              (sum, item) =>
                sum + item.qty,
              0
            )}
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
            Total Payable
          </span>

          <span>
            ${money(total)}
          </span>

        </div>


        <button
          class="checkout-btn"
          onclick="placeOrder()">

          Place Order

        </button>

      </div>

    </div>

  `;


  showScreen("checkout");

}


/* =========================================================
   PAYMENT
========================================================= */

function selectPayment(method) {

  selectedPayment = method;

  toast(
    method + " selected ✓"
  );

}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

  if (!cart.length) {

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


  if (!name || !phone || !address) {

    toast(
      "Please enter delivery details"
    );

    return;

  }


  const orderItems =
    cart.map(item => ({
      id: item.id,
      qty: item.qty
    }));


  const order = {

    id:
      "BM" +
      Date.now()
        .toString()
        .slice(-7),

    date:
      new Date()
        .toLocaleDateString("en-PK"),

    status:
      "Processing",

    payment:
      selectedPayment,

    customer: {

      name:
        name,

      phone:
        phone,

      address:
        address

    },

    items:
      orderItems

  };


  orders.unshift(order);


  cart = [];


  saveData();


  toast(
    "Order placed successfully 🎉"
  );


  setTimeout(() => {

    showScreen("orders");

  }, 700);

}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

  const list =
    document.getElementById(
      "ordersList"
    );


  if (!list) return;


  if (!orders.length) {

    list.innerHTML = `

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
          class="shop-btn"
          onclick="showScreen('products')">

          Start Shopping

        </button>

      </div>

    `;

    return;

  }


  list.innerHTML =
    orders
      .map(order => {

        const first =
          order.items?.[0];


        const product =
          first
            ? products.find(
                p => p.id === first.id
              )
            : null;


        return `

          <div
            class="order-card"
            onclick="openTracking('${order.id}')">

            <div class="order-top">

              <b>
                Order #${order.id}
              </b>

              <span class="status">
                ${order.status}
              </span>

            </div>


            <p style="margin-top:8px;color:#777;">
              Placed on ${order.date}
            </p>


            ${
              product
                ? `
                  <div class="order-product">

                    <div class="order-product-icon">
                      ${product.icon}
                    </div>

                    <div>

                      <b>
                        ${product.name}
                      </b>

                      <p style="margin-top:5px;">
                        Qty:
                        ${first.qty}
                      </p>

                    </div>

                  </div>
                `
                : ""
            }


            <button
              class="shop-btn"
              style="
                margin-top:15px;
                padding:10px 16px;
                font-size:14px;
              "
              onclick="
                event.stopPropagation();
                openTracking('${order.id}');
              ">

              Track Order →

            </button>

          </div>

        `;

      })
      .join("");

}


/* =========================================================
   TRACKING
========================================================= */

function openTracking(orderId) {

  const order =
    orders.find(
      item => item.id === orderId
    );


  if (!order) {

    toast("Order not found");

    return;

  }


  const screen =
    document.getElementById(
      "tracking"
    ) ||
    createMissingScreen("tracking");


  let content =
    document.getElementById(
      "trackingContent"
    );


  if (!content) {

    content =
      document.createElement("div");

    content.id =
      "trackingContent";

    screen.appendChild(content);

  }


  content.innerHTML = `

    <div class="order-card">

      <div class="order-top">

        <b>
          Order #${order.id}
        </b>

        <span class="status">
          ${order.status}
        </span>

      </div>


      <p style="margin-top:10px;color:#777;">
        Placed on ${order.date}
      </p>


      <div style="margin-top:25px;">

        <div class="account-item">
          ✅ &nbsp;
          <b>Order Placed</b>
          <br>
          <small>
            Your order has been received.
          </small>
        </div>


        <div class="account-item">
          🔄 &nbsp;
          <b>Processing</b>
          <br>
          <small>
            Seller is preparing your order.
          </small>
        </div>


        <div class="account-item">
          🚚 &nbsp;
          <b>Shipped</b>
          <br>
          <small>
            Your package will be shipped.
          </small>
        </div>


        <div class="account-item">
          🛵 &nbsp;
          <b>Out for Delivery</b>
          <br>
          <small>
            Rider will deliver your order.
          </small>
        </div>


        <div class="account-item">
          🏠 &nbsp;
          <b>Delivered</b>
          <br>
          <small>
            Order will be delivered to you.
          </small>
        </div>

      </div>

    </div>


    <div class="order-card">

      <h2>
        Order Items
      </h2>


      ${
        (order.items || [])
          .map(item => {

            const product =
              products.find(
                p => p.id === item.id
              );


            if (!product) return "";


            return `

              <div class="order-product">

                <div
                  class="order-product-icon">

                  ${product.icon}

                </div>

                <div>

                  <b>
                    ${product.name}
                  </b>

                  <p style="margin-top:5px;">
                    ${money(product.price)}
                    × ${item.qty}
                  </p>

                </div>

              </div>

            `;

          })
          .join("")
      }

    </div>

  `;


  showScreen("tracking");

}


/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount() {

  const screen =
    document.getElementById(
      "account"
    );


  if (!screen) return;


  const user =
    getUser();


  if (user) {

    screen.innerHTML = `

      <div class="account-card">

        <div class="avatar">
          👤
        </div>

        <h2>
          ${user.name}
        </h2>

        <p>
          ${user.email}
        </p>


        <div class="account-menu">

          <button
            class="account-item"
            onclick="showScreen('orders')">

            📦 &nbsp;
            My Orders

          </button>


          <button
            class="account-item"
            onclick="showScreen('wishlist')">

            ❤️ &nbsp;
            Wishlist

          </button>


          <button
            class="account-item"
            onclick="showScreen('seller')">

            🏪 &nbsp;
            Seller Center

          </button>


          <button
            class="account-item"
            onclick="toast('Address management coming soon')">

            📍 &nbsp;
            My Addresses

          </button>


          <button
            class="account-item"
            onclick="toast('Payment methods coming soon')">

            💳 &nbsp;
            Payment Methods

          </button>


          <button
            class="account-item"
            onclick="toast('Settings coming soon')">

            ⚙️ &nbsp;
            Settings

          </button>


          <button
            class="account-item"
            onclick="logoutUser()">

            🚪 &nbsp;
            Logout

          </button>

        </div>

      </div>

    `;

    return;

  }


  screen.innerHTML = `

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
        onclick="openSignup()">

        ✨ &nbsp;
        Create New Account

      </button>


      <div class="account-menu">

        <button
          class="account-item"
          onclick="showScreen('orders')">

          📦 &nbsp;
          My Orders

        </button>


        <button
          class="account-item"
          onclick="showScreen('wishlist')">

          ❤️ &nbsp;
          Wishlist

        </button>


        <button
          class="account-item"
          onclick="showScreen('seller')">

          🏪 &nbsp;
          Seller Center

        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   GET USER
========================================================= */

function getUser() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "bm_user_data"
      )
    );

  } catch (error) {

    return null;

  }

}


/* =========================================================
   LOGIN SCREEN
========================================================= */

function openLogin() {

  const screen =
    document.getElementById(
      "login"
    ) ||
    createMissingScreen("login");


  let content =
    document.getElementById(
      "loginContent"
    );


  if (!content) {

    content =
      document.createElement("div");

    content.id =
      "loginContent";

    screen.appendChild(content);

  }


  content.innerHTML = `

    <div class="login-box">

      <h2>
        Welcome Back
      </h2>

      <p>
        Login to continue shopping.
      </p>


      <input
        id="loginEmail"
        type="text"
        placeholder="Email or Phone"
      >


      <input
        id="loginPassword"
        type="password"
        placeholder="Password"
      >


      <button
        class="login-submit"
        onclick="loginUser()">

        Login

      </button>


      <div class="switch-login">

        Don't have an account?

        <span
          onclick="openSignup()"
          style="cursor:pointer">

          Create Account

        </span>

      </div>

    </div>

  `;


  showScreen("login");

}


/* =========================================================
   LOGIN USER
========================================================= */

function loginUser() {

  const email =
    document.getElementById(
      "loginEmail"
    )?.value.trim();


  const password =
    document.getElementById(
      "loginPassword"
    )?.value.trim();


  if (!email || !password) {

    toast(
      "Please enter email/phone and password"
    );

    return;

  }


  const oldUser =
    getUser();


  const user = {

    name:
      oldUser?.name ||
      "BismiMart Customer",

    email:
      email,

    phone:
      oldUser?.phone || ""

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


  setTimeout(() => {

    renderAccount();

    showScreen("account");

  }, 600);

}


/* =========================================================
   SIGNUP
========================================================= */

function openSignup() {

  const screen =
    document.getElementById(
      "signup"
    ) ||
    createMissingScreen("signup");


  let content =
    document.getElementById(
      "signupContent"
    );


  if (!content) {

    content =
      document.createElement("div");

    content.id =
      "signupContent";

    screen.appendChild(content);

  }


  content.innerHTML = `

    <div class="login-box">

      <h2>
        Create Account
      </h2>

      <p>
        Join BismiMart for free.
      </p>


      <input
        id="signupName"
        type="text"
        placeholder="Full Name"
      >


      <input
        id="signupEmail"
        type="email"
        placeholder="Email"
      >


      <input
        id="signupPhone"
        type="tel"
        placeholder="Phone Number"
      >


      <input
        id="signupPassword"
        type="password"
        placeholder="Create Password"
      >


      <button
        class="login-submit"
        onclick="createAccount()">

        Create Account

      </button>


      <div class="switch-login">

        Already have an account?

        <span
          onclick="openLogin()"
          style="cursor:pointer">

          Login

        </span>

      </div>

    </div>

  `;


  showScreen("signup");

}


/* =========================================================
   CREATE ACCOUNT
========================================================= */

function createAccount() {

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


  if (
    !name ||
    !email ||
    !phone ||
    !password
  ) {

    toast(
      "Please fill all fields"
    );

    return;

  }


  const user = {

    name:
      name,

    email:
      email,

    phone:
      phone

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


  setTimeout(() => {

    renderAccount();

    showScreen("account");

  }, 700);

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

  localStorage.removeItem(
    "bm_logged_in"
  );

  localStorage.removeItem(
    "bm_user_data"
  );


  toast("Logged out successfully");


  setTimeout(() => {

    renderAccount();

    showScreen("account");

  }, 500);

}


/* =========================================================
   SELLER CENTER
========================================================= */

function openSeller() {

  const screen =
    document.getElementById(
      "seller"
    ) ||
    createMissingScreen("seller");


  let content =
    document.getElementById(
      "sellerContent"
    );


  if (!content) {

    content =
      document.createElement("div");

    content.id =
      "sellerContent";

    screen.appendChild(content);

  }


  content.innerHTML = `

    <div class="account-card">

      <div class="avatar">
        🏪
      </div>

      <h2>
        Seller Center
      </h2>

      <p>
        Start selling your products
        on BismiMart.
      </p>

    </div>


    <div class="account-menu">

      <button
        class="account-item"
        onclick="addSellerProduct()">

        ➕ &nbsp;
        Add New Product

      </button>


      <button
        class="account-item"
        onclick="toast('My Products opened')">

        📦 &nbsp;
        My Products

      </button>


      <button
        class="account-item"
        onclick="showScreen('orders')">

        🛒 &nbsp;
        Seller Orders

      </button>


      <button
        class="account-item"
        onclick="toast('Earnings screen opened')">

        💰 &nbsp;
        Earnings

      </button>


      <button
        class="account-item"
        onclick="toast('Withdraw screen opened')">

        🏦 &nbsp;
        Withdraw Money

      </button>

    </div>

  `;


  showScreen("seller");

}


/* =========================================================
   SELLER PRODUCT
========================================================= */

function addSellerProduct() {

  toast(
    "Add Product screen coming next"
  );

}


/* =========================================================
   SEARCH
========================================================= */

function searchProducts(value) {

  let query;


  if (
    typeof value === "string"
  ) {

    query =
      value.trim().toLowerCase();

  } else {

    const input =
      document.getElementById(
        "searchInput"
      );

    query =
      input
        ? input.value.trim().toLowerCase()
        : "";

  }


  if (!query) {

    renderProducts(products);

    showScreen("products");

    return;

  }


  const result =
    products.filter(product => {

      const text =
        (
          product.name +
          " " +
          product.cat
        ).toLowerCase();


      return text.includes(query);

    });


  renderProducts(result);

  showScreen("products");

}


/* =========================================================
   SEARCH ENTER
========================================================= */

function searchKey(event) {

  if (
    event.key === "Enter"
  ) {

    event.preventDefault();

    searchProducts();

  }

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

function clearSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );


  if (input) {

    input.value = "";

  }


  renderProducts(products);

  showScreen("products");

}


/* =========================================================
   FILTER
========================================================= */

function filterProducts(type) {

  let result =
    [...products];


  if (type === "low") {

    result.sort(
      (a, b) =>
        a.price - b.price
    );

  }


  if (type === "high") {

    result.sort(
      (a, b) =>
        b.price - a.price
    );

  }


  if (type === "rating") {

    result.sort(
      (a, b) =>
        b.rating - a.rating
    );

  }


  renderProducts(result);

  showScreen("products");

}


/* =========================================================
   GLOBAL COMPATIBILITY FUNCTIONS
========================================================= */

/*
  These aliases make sure that if
  old buttons in your HTML use
  different function names, they
  still work.
*/


function add(id) {

  addToCart(id);

}


function toggleWish(id) {

  toggleWishlist(id);

}


function detail(id) {

  openProduct(id);

}


function checkout() {

  openCheckout();

}


function tracking(id) {

  openTracking(id);

}


function login() {

  openLogin();

}


function signupScreen() {

  openSignup();

}


function loginScreen() {

  openLogin();

}


function seller() {

  openSeller();

}


function go(id) {

  showScreen(id);

}


/* =========================================================
   INITIALIZE APP
========================================================= */

function initBismiMart() {

  /*
    Make sure required screens exist.
  */

  const requiredScreens = [

    "home",
    "categories",
    "products",
    "detail",
    "cart",
    "wishlist",
    "orders",
    "checkout",
    "tracking",
    "account",
    "login",
    "signup",
    "seller"

  ];


  requiredScreens.forEach(id => {

    if (!document.getElementById(id)) {

      createMissingScreen(id);

    }

  });


  /*
    Render initial content.
  */

  renderHome();

  renderProducts(products);

  renderWishlist();

  renderCart();

  renderOrders();

  renderAccount();


  updateBadges();


  /*
    Start on Home.
  */

  showScreen("home");

}


/* =========================================================
   DOM READY
========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initBismiMart
  );

} else {

  initBismiMart();

}


/* =========================================================
   FINAL SAFETY UPDATE
========================================================= */

updateBadges();
