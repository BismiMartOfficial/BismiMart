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

const cats = [
  ["Mobiles", "📱"],
  ["Electronics", "💻"],
  ["Fashion", "👕"],
  ["Home & Living", "🏠"],
  ["Beauty & Health", "💄"],
  ["Grocery", "🥦"],
  ["Sports & Outdoors", "⚽"],
  ["Toys & Games", "🧸"]
];

let cart = JSON.parse(localStorage.getItem("bm_cart") || "[]");
let wish = JSON.parse(localStorage.getItem("bm_wish") || "[]");
let orders = JSON.parse(localStorage.getItem("bm_orders") || "[]");

let current = null;


/* =========================
   BASIC HELPERS
========================= */

const money = (number) => {
  return "Rs. " + Number(number).toLocaleString();
};


function save() {
  localStorage.setItem("bm_cart", JSON.stringify(cart));
  localStorage.setItem("bm_wish", JSON.stringify(wish));
  localStorage.setItem("bm_orders", JSON.stringify(orders));

  updateCounts();
}


function toast(message) {
  const element = document.getElementById("toast");

  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 1800);
}


function updateCounts() {
  const cartCount = document.getElementById("cartCount");
  const wishCount = document.getElementById("wishCount");

  if (cartCount) {
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.qty,
      0
    );
  }

  if (wishCount) {
    wishCount.textContent = wish.length;
  }
}


/* =========================
   SCREEN NAVIGATION
========================= */

function go(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (!target) return;

  target.classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.nav === id
    );
  });

  if (id === "cart") {
    renderCart();
  }

  if (id === "wishlist") {
    renderWish();
  }

  if (id === "orders") {
    renderOrders();
  }

  if (id === "account") {
    renderAccount();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function back(id = "home") {
  go(id);
}


/* =========================
   PRODUCT CARD
========================= */

function card(product) {
  const liked = wish.includes(product.id);

  return `
    <article class="product">

      <button
        class="heart"
        onclick="toggleWish(${product.id})"
      >
        ${liked ? "❤️" : "♡"}
      </button>

      <div
        class="pimg"
        onclick="detail(${product.id})"
      >
        ${product.icon}
      </div>

      <div class="pbody">

        <h3>${product.name}</h3>

        <div class="stars">
          ★★★★★ ${product.rating}
        </div>

        <div class="price">
          ${money(product.price)}

          <span class="muted">
            ${money(product.old)}
          </span>
        </div>

        <div class="pactions">

          <button
            class="add"
            onclick="add(${product.id})"
          >
            Add to Cart
          </button>

          <button
            class="view"
            onclick="detail(${product.id})"
          >
            View
          </button>

        </div>

      </div>

    </article>
  `;
}


/* =========================
   HOME SCREEN
========================= */

function home() {

  const homeScreen = document.getElementById("home");

  if (!homeScreen) return;

  homeScreen.innerHTML = `

    <div class="hero">

      <small>
        WELCOME TO BISMI MART
      </small>

      <h1>
        Everything<br>
        You Need,<br>

        <span class="orange">
          All in One<br>
          Place.
        </span>
      </h1>

      <p>
        Shop mobiles, electronics,
        fashion, home products and
        much more.
      </p>

      <button
        class="primary"
        onclick="go('products')"
      >
        Shop Now
      </button>

      <div class="shape"></div>

      <div class="phone">
        📱
      </div>

    </div>


    <div class="section-head">

      <h2>
        Categories
      </h2>

      <button
        class="link"
        onclick="go('categories')"
      >
        See All
      </button>

    </div>


    <div class="cat-grid">

      ${cats.slice(0, 4).map((category) => `

        <button
          class="cat"
          onclick="category('${category[0]}')"
        >

          <div class="ci">
            ${category[1]}
          </div>

          <b>
            ${category[0]}
          </b>

        </button>

      `).join("")}

    </div>


    <div class="section-head">

      <h2>
        Popular Products
      </h2>

      <button
        class="link"
        onclick="go('products')"
      >
        See All
      </button>

    </div>


    <div class="products">

      ${products
        .slice(0, 4)
        .map(card)
        .join("")}

    </div>

  `;
}


/* =========================
   CATEGORIES
========================= */

function categories() {

  const screen = document.getElementById("categories");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        Categories
      </h1>

    </div>


    <div class="cat-grid">

      ${cats.map((category) => `

        <button
          class="cat"
          onclick="category('${category[0]}')"
        >

          <div class="ci">
            ${category[1]}
          </div>

          <b>
            ${category[0]}
          </b>

        </button>

      `).join("")}

    </div>

  `;
}


/* =========================
   PRODUCTS
========================= */

function productsPage(
  list = products,
  title = "All Products"
) {

  const screen = document.getElementById("products");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        ${title}
      </h1>

    </div>


    <div class="section-head">

      <h2>
        ${list.length} Products
      </h2>

      <button
        class="link"
        onclick="toast('Filter options coming soon')"
      >
        Filter
      </button>

    </div>


    <div class="products">

      ${
        list.length
          ? list.map(card).join("")
          : `
            <div
              class="empty"
              style="grid-column:1/-1"
            >

              <div>
                🔍
              </div>

              <h2>
                No Products Found
              </h2>

            </div>
          `
      }

    </div>

  `;

  go("products");
}


/* =========================
   CATEGORY FILTER
========================= */

function category(name) {

  let key = name.split(" ")[0];

  let list = products.filter((product) => {

    return (
      product.cat === key ||
      product.cat === name
    );

  });

  productsPage(
    list,
    name
  );
}


/* =========================
   PRODUCT DETAILS
========================= */

function detail(id) {

  current = products.find(
    (product) => product.id === id
  );

  if (!current) return;

  const screen = document.getElementById("detail");

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('products')"
      >
        ←
      </button>

      <h1>
        Product Details
      </h1>

    </div>


    <div class="detail-card">

      <div class="detail-img">
        ${current.icon}
      </div>


      <div class="detail-body">

        <h1>
          ${current.name}
        </h1>

        <div class="stars">
          ★★★★★ ${current.rating}
          • 120+ Sold
        </div>

        <div class="detail-price">
          ${money(current.price)}
        </div>

        <p>
          High quality product available
          at BismiMart. Fast delivery,
          easy shopping and secure ordering.
        </p>

        <p>
          <b>
            Delivery:
          </b>

          Free delivery on selected orders
        </p>


        <div class="twobtn">

          <button
            class="outline"
            onclick="add(${current.id})"
          >
            Add to Cart
          </button>

          <button
            class="primary"
            onclick="buyNow()"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>

  `;

  go("detail");
}


/* =========================
   CART
========================= */

function add(id) {

  const existing = cart.find(
    (item) => item.id === id
  );

  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }

  save();

  toast("Added to cart 🛒");
}


function qty(id, amount) {

  const item = cart.find(
    (cartItem) => cartItem.id === id
  );

  if (!item) return;

  item.qty += amount;

  if (item.qty < 1) {

    cart = cart.filter(
      (cartItem) => cartItem.id !== id
    );

  }

  save();

  renderCart();
}


function removeCart(id) {

  cart = cart.filter(
    (item) => item.id !== id
  );

  save();

  renderCart();

  toast("Removed from cart");
}


function renderCart() {

  const screen = document.getElementById("cart");

  if (!screen) return;

  if (!cart.length) {

    screen.innerHTML = `

      <div class="page-head">

        <button
          class="back"
          onclick="go('home')"
        >
          ←
        </button>

        <h1>
          My Cart
        </h1>

      </div>


      <div class="empty">

        <div>
          🛒
        </div>

        <h2>
          Your Cart is Empty
        </h2>

        <button
          class="primary"
          onclick="go('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    return;
  }


  let subtotal = 0;


  const itemsHTML = cart.map((item) => {

    const product = products.find(
      (p) => p.id === item.id
    );

    if (!product) return "";

    subtotal +=
      product.price * item.qty;


    return `

      <div class="row-card">

        <div class="row-img">
          ${product.icon}
        </div>


        <div class="row-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${money(product.price)}
          </p>


          <div class="qty">

            <button
              onclick="qty(${product.id}, -1)"
            >
              −
            </button>

            <b>
              ${item.qty}
            </b>

            <button
              onclick="qty(${product.id}, 1)"
            >
              +
            </button>

            <button
              onclick="removeCart(${product.id})"
              style="margin-left:auto"
            >
              ✕
            </button>

          </div>

        </div>

      </div>

    `;

  }).join("");


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        My Cart
        (${cart.reduce(
          (total, item) =>
            total + item.qty,
          0
        )})
      </h1>

    </div>


    <div class="list">

      ${itemsHTML}

    </div>


    <div class="summary">

      <div class="sum">

        <span>
          Subtotal
        </span>

        <b>
          ${money(subtotal)}
        </b>

      </div>


      <div class="sum">

        <span>
          Delivery
        </span>

        <b>
          FREE
        </b>

      </div>


      <div class="sum total">

        <span>
          Total
        </span>

        <span>
          ${money(subtotal)}
        </span>

      </div>


      <button
        class="primary full"
        onclick="checkout()"
      >
        Proceed to Checkout
      </button>

    </div>

  `;
}


/* =========================
   WISHLIST
========================= */

function toggleWish(id) {

  if (wish.includes(id)) {

    wish = wish.filter(
      (item) => item !== id
    );

    toast("Removed from wishlist");

  } else {

    wish.push(id);

    toast("Added to wishlist ❤️");
  }

  save();

  home();
}


function renderWish() {

  const screen = document.getElementById("wishlist");

  if (!screen) return;

  const list = products.filter(
    (product) =>
      wish.includes(product.id)
  );


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        My Wishlist
      </h1>

    </div>


    ${
      list.length
        ? `
          <div class="products">
            ${list.map(card).join("")}
          </div>
        `
        : `
          <div class="empty">

            <div>
              ♡
            </div>

            <h2>
              Wishlist is Empty
            </h2>

            <button
              class="primary"
              onclick="go('products')"
            >
              Browse Products
            </button>

          </div>
        `
    }

  `;
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

  if (!cart.length) {

    toast("Your cart is empty");

    go("products");

    return;
  }


  const total = cart.reduce(
    (sum, item) => {

      const product =
        products.find(
          (p) => p.id === item.id
        );

      return sum +
        product.price * item.qty;

    },
    0
  );


  const screen =
    document.getElementById("checkout");


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('cart')"
      >
        ←
      </button>

      <h1>
        Checkout
      </h1>

    </div>


    <div class="checkout-section">

      <h3>
        Delivery Address
      </h3>

      <b>
        Ayesha Khan
      </b>

      <p>
        House 25, Street 01,
        Karachi, Pakistan
      </p>

      <button class="link">
        Change
      </button>

    </div>


    <div class="checkout-section">

      <h3>
        Payment Method
      </h3>


      <button
        class="pay selected"
        onclick="selectPay(this)"
      >
        💵 &nbsp;
        Cash on Delivery
        <span style="float:right">
          ●
        </span>
      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        🔴 &nbsp;
        JazzCash
        <span style="float:right">
          ○
        </span>
      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        🟢 &nbsp;
        Easypaisa
        <span style="float:right">
          ○
        </span>
      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        💳 &nbsp;
        Credit / Debit Card
        <span style="float:right">
          ○
        </span>
      </button>

    </div>


    <div class="summary">

      <div class="sum">

        <span>
          Items
        </span>

        <b>
          ${money(total)}
        </b>

      </div>


      <div class="sum">

        <span>
          Delivery
        </span>

        <b>
          FREE
        </b>

      </div>


      <div class="sum total">

        <span>
          Total Payable
        </span>

        <span>
          ${money(total)}
        </span>

      </div>


      <button
        class="primary full"
        onclick="placeOrder()"
      >
        Place Order
      </button>

    </div>

  `;

  go("checkout");
}


function selectPay(element) {

  document
    .querySelectorAll(".pay")
    .forEach((button) => {

      button.classList.remove(
        "selected"
      );

      const circle =
        button.querySelector(
          "span"
        );

      if (circle) {
        circle.textContent = "○";
      }

    });


  element.classList.add("selected");

  const circle =
    element.querySelector("span");

  if (circle) {
    circle.textContent = "●";
  }
}


/* =========================
   BUY NOW
========================= */

function buyNow() {

  if (!current) return;

  cart = [
    {
      id: current.id,
      qty: 1
    }
  ];

  save();

  checkout();
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

  if (!cart.length) {

    toast("Your cart is empty");

    return;
  }


  const order = {

    id:
      "BM" +
      Date.now()
        .toString()
        .slice(-6),

    date:
      new Date()
        .toLocaleDateString(),

    status:
      "Processing",

    items:
      [...cart]

  };


  orders.unshift(order);

  cart = [];

  save();

  toast(
    "Order placed successfully 🎉"
  );


  setTimeout(() => {

    go("orders");

  }, 600);
}


/* =========================
   ORDERS
========================= */

function renderOrders() {

  const screen =
    document.getElementById("orders");

  if (!screen) return;


  if (!orders.length) {

    screen.innerHTML = `

      <div class="page-head">

        <button
          class="back"
          onclick="go('home')"
        >
          ←
        </button>

        <h1>
          My Orders
        </h1>

      </div>


      <div class="empty">

        <div>
          📦
        </div>

        <h2>
          No Orders Yet
        </h2>

        <button
          class="primary"
          onclick="go('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    return;
  }


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        My Orders
      </h1>

    </div>


    ${orders.map((order) => `

      <div
        class="order"
        onclick="tracking('${order.id}')"
      >

        <div class="order-top">

          <b>
            Order #${order.id}
          </b>

          <span class="status">
            ${order.status}
          </span>

        </div>


        <p>
          Placed on ${order.date}
        </p>


        <button class="link">
          Track Order →
        </button>

      </div>

    `).join("")}

  `;
}


/* =========================
   TRACKING
=========
        </div>

      </div>

    `;

  go("cart");
}


/* =========================
   WISHLIST
========================= */

function toggleWish(id) {

  if (wish.includes(id)) {

    wish = wish.filter(
      (item) => item !== id
    );

    toast("Removed from wishlist");

  } else {

    wish.push(id);

    toast("Added to wishlist ❤️");

  }

  save();

  home();
}


function renderWish() {

  const screen =
    document.getElementById("wishlist");

  if (!screen) return;

  const list = products.filter(
    (product) => wish.includes(product.id)
  );

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        My Wishlist
      </h1>

    </div>


    ${
      list.length
        ? `
          <div class="products">
            ${list.map(card).join("")}
          </div>
        `
        : `
          <div class="empty">

            <div>
              ♡
            </div>

            <h2>
              Wishlist is Empty
            </h2>

            <button
              class="primary"
              onclick="go('products')"
            >
              Browse Products
            </button>

          </div>
        `
    }

  `;
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

  if (!cart.length) {

    toast("Your cart is empty");

    go("products");

    return;
  }

  const total = cart.reduce(
    (sum, item) => {

      const product = products.find(
        (p) => p.id === item.id
      );

      if (!product) return sum;

      return sum + product.price * item.qty;

    },
    0
  );


  const screen =
    document.getElementById("checkout");

  if (!screen) return;


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('cart')"
      >
        ←
      </button>

      <h1>
        Checkout
      </h1>

    </div>


    <div class="checkout-section">

      <h3>
        Delivery Address
      </h3>

      <b>
        Ayesha Khan
      </b>

      <p>
        House 25, Street 01,
        Karachi, Pakistan
      </p>

      <button
        class="link"
        onclick="toast('Address change coming soon')"
      >
        Change
      </button>

    </div>


    <div class="checkout-section">

      <h3>
        Payment Method
      </h3>


      <button
        class="pay selected"
        onclick="selectPay(this)"
      >
        💵 &nbsp; Cash on Delivery

        <span style="float:right">
          ●
        </span>

      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        🔴 &nbsp; JazzCash

        <span style="float:right">
          ○
        </span>

      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        🟢 &nbsp; Easypaisa

        <span style="float:right">
          ○
        </span>

      </button>


      <button
        class="pay"
        onclick="selectPay(this)"
      >
        💳 &nbsp; Credit / Debit Card

        <span style="float:right">
          ○
        </span>

      </button>

    </div>


    <div class="summary">

      <div class="sum">

        <span>
          Items
        </span>

        <b>
          ${money(total)}
        </b>

      </div>


      <div class="sum">

        <span>
          Delivery
        </span>

        <b>
          FREE
        </b>

      </div>


      <div class="sum total">

        <span>
          Total Payable
        </span>

        <span>
          ${money(total)}
        </span>

      </div>


      <button
        class="primary full"
        onclick="placeOrder()"
      >
        Place Order
      </button>

    </div>

  `;

  go("checkout");
}


/* =========================
   PAYMENT SELECTION
========================= */

function selectPay(element) {

  document
    .querySelectorAll(".pay")
    .forEach((button) => {

      button.classList.remove("selected");

      const circle =
        button.querySelector("span");

      if (circle) {
        circle.textContent = "○";
      }

    });


  element.classList.add("selected");

  const circle =
    element.querySelector("span");

  if (circle) {
    circle.textContent = "●";
  }
}


/* =========================
   BUY NOW
========================= */

function buyNow() {

  if (!current) return;

  cart = [
    {
      id: current.id,
      qty: 1
    }
  ];

  save();

  checkout();
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

  if (!cart.length) {

    toast("Your cart is empty");

    return;
  }


  const orderItems = cart.map(
    (item) => ({
      id: item.id,
      qty: item.qty
    })
  );


  const order = {

    id:
      "BM" +
      Date.now()
        .toString()
        .slice(-6),

    date:
      new Date()
        .toLocaleDateString(),

    status:
      "Processing",

    items:
      orderItems

  };


  orders.unshift(order);

  cart = [];

  save();

  toast(
    "Order placed successfully 🎉"
  );


  setTimeout(() => {

    go("orders");

  }, 700);
}


/* =========================
   ORDERS
========================= */

function renderOrders() {

  const screen =
    document.getElementById("orders");

  if (!screen) return;


  if (!orders.length) {

    screen.innerHTML = `

      <div class="page-head">

        <button
          class="back"
          onclick="go('home')"
        >
          ←
        </button>

        <h1>
          My Orders
        </h1>

      </div>


      <div class="empty">

        <div>
          📦
        </div>

        <h2>
          No Orders Yet
        </h2>

        <button
          class="primary"
          onclick="go('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    return;
  }


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('home')"
      >
        ←
      </button>

      <h1>
        My Orders
      </h1>

    </div>


    ${orders.map((order) => `

      <div
        class="order"
        onclick="tracking('${order.id}')"
      >

        <div class="order-top">

          <b>
            Order #${order.id}
          </b>

          <span class="status">
            ${order.status}
          </span>

        </div>


        <p>
          Placed on ${order.date}
        </p>


        <button
          class="link"
          onclick="event.stopPropagation(); tracking('${order.id}')"
        >
          Track Order →
        </button>

      </div>

    `).join("")}

  `;
}


/* =========================
   ORDER TRACKING
========================= */

function tracking(id) {

  const order =
    orders.find(
      (item) => item.id === id
    );

  if (!order) return;


  const screen =
    document.getElementById("tracking");

  if (!screen) return;


  const steps = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('orders')"
      >
        ←
      </button>

      <h1>
        Order Tracking
      </h1>

    </div>


    <div class="timeline">

      <h3>
        Order #${order.id}
      </h3>

      <p class="muted">
        Placed on ${order.date}
      </p>


      ${steps.map(
        (step, index) => `

          <div class="step">

            <div class="dot"></div>

            <div>

              <b>
                ${step}
              </b>

              <p>
                ${
                  index === 0
                    ? "Your order has been placed."
                    : index === 1
                    ? "Seller has confirmed your order."
                    : index === 2
                    ? "Your order will be shipped soon."
                    : index === 3
                    ? "Courier will deliver your order."
                    : "Order will be delivered to you."
                }
              </p>

            </div>

          </div>

        `
      ).join("")}

    </div>

  `;

  go("tracking");
}


/* =========================
   ACCOUNT
========================= */

function renderAccount() {

  const screen =
    document.getElementById("account");

  if (!screen) return;


  screen.innerHTML = `

    <div class="account-card">

      <div class="account-top">

        <div class="avatar">
          👤
        </div>

        <h2>
          Ayesha Khan
        </h2>

        <p>
          Welcome to BismiMart
        </p>

      </div>


      <div class="menu">

        <button
          onclick="go('orders')"
        >
          📦
          <span>
            My Orders
          </span>
        </button>


        <button
          onclick="go('wishlist')"
        >
          ❤️
          <span>
            Wishlist
          </span>
        </button>


        <button
          onclick="toast('Address screen opened')"
        >
          📍
          <span>
            Addresses
          </span>
        </button>


        <button
          onclick="toast('Payment Methods opened')"
        >
          💳
          <span>
            Payment Methods
          </span>
        </button>


        <button
          onclick="toast('Settings opened')"
        >
          ⚙️
          <span>
            Settings
          </span>
        </button>


        <button
          onclick="go('seller')"
        >
          🏪
          <span>
            Seller Dashboard
          </span>
        </button>


        <button
          onclick="go('login')"
        >
          🚪
          <span>
            Login / Sign Up
          </span>
        </button>

      </div>

    </div>

  `;
}


/* =========================
   LOGIN
========================= */

function login() {

  const screen =
    document.getElementById("login");

  if (!screen) return;


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Login / Sign Up
      </h1>

    </div>


    <div class="login-card">

      <h2>
        Welcome to BismiMart
      </h2>

      <p class="muted">
        Login to manage your orders
        and account.
      </p>


      <input
        id="loginPhone"
        type="text"
        placeholder="Email or Phone Number"
      >


      <input
        id="loginPassword"
        type="password"
        placeholder="Password"
      >


      <button
        class="primary full"
        onclick="performLogin()"
      >
        Login
      </button>


      <p style="text-align:center">

        Don't have an account?

        <button
          class="link"
          onclick="toast('Sign Up form coming soon')"
        >
          Sign Up
        </button>

      </p>

    </div>

  `;
}


function performLogin() {

  const phone =
    document.getElementById(
      "loginPhone"
    )?.value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    )?.value.trim();


  if (!phone || !password) {

    toast(
      "Please enter phone/email and password"
    );

    return;
  }


  localStorage.setItem(
    "bm_logged_in",
    "true"
  );


  toast(
    "Login successful ✓"
  );


  setTimeout(() => {

    go("account");

  }, 600);
}


/* =========================
   SELLER DASHBOARD
========================= */

function seller() {

  const screen =
    document.getElementById("seller");

  if (!screen) return;


  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Seller Dashboard
      </h1>

    </div>


    <div class="seller-stat">

      <div class="stat">

        <b>
          120
        </b>

        <span>
          Products
        </span>

      </div>


      <div class="stat">

        <b>
          230
        </b>

        <span>
          Orders
        </span>

      </div>


      <div class="stat">

        <b>
          85.6K
        </b>

        <span>
          Earnings
        </span>

      </div>

    </div>


    <div
      class="menu"
      style="margin-top:12px"
    >

      <button
        onclick="toast('Add Product form opened')"
      >
        ➕
        <span>
          Add New Product
        </span>
      </button>


      <button
        onclick="toast('My Products opened')"
      >
        📱
        <span>
          My Products
        </span>
      </button>


      <button
        onclick="go('orders')"
      >
        📦
        <span>
          Orders
        </span>
      </button>


      <button
        onclick="toast('Earnings opened')"
      >
        💰
        <span>
          Earnings
        </span>
      </button>


      <button
        onclick="toast('Withdraw screen opened')"
      >
        🏦
        <span>
          Withdraw Money
        </span>
      </button>

    </div>

  `;
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );

  if (!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (!query) {

    toast(
      "Type a product name"
    );

    return;
  }


  const results =
    products.filter((product) => {

      const text =
        (
          product.name +
          " " +
          product.cat
        ).toLowerCase();

      return text.includes(query);

    });


  productsPage(
    results,
    "Search Results"
  );
}


/* =========================
   SEARCH ENTER KEY
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter" &&
      document.activeElement?.id === "searchInput"
    ) {

      searchProducts();

    }

  }
);


/* =========================
   INITIALIZE APP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    home();

    categories();

    productsPage(
      products,
      "All Products"
    );

    renderCart();

    renderWish();

    renderOrders();

    renderAccount();

    login();

    seller();

    updateCounts();

    go("home");

  }
);
/* =========================
   TRACKING
========================= */

function tracking(id) {

  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) return;

  const screen =
    document.getElementById("tracking");

  if (!screen) return;

  const steps = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('orders')"
      >
        ←
      </button>

      <h1>
        Order Tracking
      </h1>

    </div>


    <div class="timeline">

      <h3>
        Order #${order.id}
      </h3>

      <p class="muted">
        Placed on ${order.date}
      </p>


      ${steps.map((step, index) => `

        <div class="step">

          <div class="dot">
            ${index === 0 ? "✓" : ""}
          </div>

          <div class="step-content">

            <b>
              ${step}
            </b>

            <p>
              ${
                index === 0
                  ? "Your order has been placed successfully."
                  : index === 1
                  ? "Your order has been confirmed by the seller."
                  : index === 2
                  ? "Your order is being prepared for shipping."
                  : index === 3
                  ? "Your order is on the way to you."
                  : "Your order has been delivered."
              }
            </p>

          </div>

        </div>

      `).join("")}

    </div>

  `;

  go("tracking");
}


/* =========================
   ACCOUNT
========================= */

function renderAccount() {

  const screen =
    document.getElementById("account");

  if (!screen) return;

  screen.innerHTML = `

    <div class="account-card">

      <div class="account-top">

        <div class="avatar">
          👤
        </div>

        <h2>
          BismiMart Account
        </h2>

        <p>
          Manage your account,
          orders and shopping.
        </p>

      </div>


      <div class="menu">

        <button onclick="go('orders')">

          📦

          <span>
            My Orders
          </span>

          <span>
            →
          </span>

        </button>


        <button onclick="go('wishlist')">

          ❤️

          <span>
            My Wishlist
          </span>

          <span>
            →
          </span>

        </button>


        <button
          onclick="toast('Address management coming soon')"
        >

          📍

          <span>
            My Addresses
          </span>

          <span>
            →
          </span>

        </button>


        <button
          onclick="toast('Payment methods coming soon')"
        >

          💳

          <span>
            Payment Methods
          </span>

          <span>
            →
          </span>

        </button>


        <button
          onclick="go('seller')"
        >

          🏪

          <span>
            Seller Center
          </span>

          <span>
            →
          </span>

        </button>


        <button
          onclick="go('login')"
        >

          👤

          <span>
            Login / Sign Up
          </span>

          <span>
            →
          </span>

        </button>


        <button
          onclick="toast('Settings coming soon')"
        >

          ⚙️

          <span>
            Settings
          </span>

          <span>
            →
          </span>

        </button>

      </div>

    </div>

  `;
}


/* =========================
   LOGIN / SIGN UP
========================= */

function login() {

  const screen =
    document.getElementById("login");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Login
      </h1>

    </div>


    <div class="login-card">

      <div class="login-logo">
        🛍️
      </div>

      <h2>
        Welcome to BismiMart
      </h2>

      <p class="muted">
        Login to continue shopping.
      </p>


      <label>
        Phone Number / Email
      </label>

      <input
        id="loginPhone"
        type="text"
        placeholder="03XX XXXXXXX"
      >


      <label>
        Password
      </label>

      <input
        id="loginPassword"
        type="password"
        placeholder="Enter password"
      >


      <button
        class="primary full"
        onclick="performLogin()"
      >
        Login
      </button>


      <div class="or">
        OR
      </div>


      <button
        class="outline full"
        onclick="toast('Sign Up form coming soon')"
      >
        Create New Account
      </button>


      <p class="login-note">
        By continuing, you agree to
        BismiMart Terms & Privacy Policy.
      </p>

    </div>

  `;
}


function performLogin() {

  const phone =
    document.getElementById(
      "loginPhone"
    )?.value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    )?.value.trim();


  if (!phone || !password) {

    toast(
      "Please enter your login details"
    );

    return;
  }


  localStorage.setItem(
    "bm_logged_in",
    "true"
  );


  toast(
    "Login successful ✓"
  );


  setTimeout(() => {

    go("account");

  }, 700);
}


/* =========================
   SELLER CENTER
========================= */

function seller() {

  const screen =
    document.getElementById("seller");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Seller Center
      </h1>

    </div>


    <div class="seller-welcome">

      <div class="seller-icon">
        🏪
      </div>

      <div>

        <h2>
          Sell on BismiMart
        </h2>

        <p>
          Start selling your products
          and grow your business.
        </p>

      </div>

    </div>


    <div class="seller-stat">

      <div class="stat">

        <b>
          0
        </b>

        <span>
          Products
        </span>

      </div>


      <div class="stat">

        <b>
          0
        </b>

        <span>
          Orders
        </span>

      </div>


      <div class="stat">

        <b>
          Rs. 0
        </b>

        <span>
          Earnings
        </span>

      </div>

    </div>


    <div class="menu seller-menu">

      <button
        onclick="toast('Add Product opened')"
      >

        ➕

        <span>
          Add New Product
        </span>

        <b>
          →
        </b>

      </button>


      <button
        onclick="toast('My Products opened')"
      >

        📦

        <span>
          My Products
        </span>

        <b>
          →
        </b>

      </button>


      <button
        onclick="go('orders')"
      >

        🛒

        <span>
          Seller Orders
        </span>

        <b>
          →
        </b>

      </button>


      <button
        onclick="toast('Earnings opened')"
      >

        💰

        <span>
          Earnings
        </span>

        <b>
          →
        </b>

      </button>


      <button
        onclick="toast('Withdraw option opened')"
      >

        🏦

        <span>
          Withdraw
        </span>

        <b>
          →
        </b>

      </button>

    </div>

  `;
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );

  if (!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (!query) {

    toast(
      "Please search for a product"
    );

    return;
  }


  const results =
    products.filter((product) => {

      const text =
        (
          product.name +
          " " +
          product.cat
        ).toLowerCase();

      return text.includes(query);

    });


  productsPage(
    results,
    "Search Results"
  );
}


/* =========================
   SEARCH ENTER
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter" &&
      document.activeElement &&
      document.activeElement.id ===
        "searchInput"
    ) {

      searchProducts();

    }

  }
);


/* =========================
   INITIALIZE APP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    home();

    categories();

    productsPage(
      products,
      "All Products"
    );

    renderCart();

    renderWish();

    renderOrders();

    renderAccount();

    login();

    seller();

    updateCounts();

    go("home");

  }
);
/* =========================
   TRACKING
========================= */

function tracking(orderId) {

  const order = orders.find(
    (item) => item.id === orderId
  );

  if (!order) {
    toast("Order not found");
    return;
  }

  const screen = document.getElementById("tracking");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('orders')"
      >
        ←
      </button>

      <h1>
        Track Order
      </h1>

    </div>


    <div class="tracking-card">

      <div class="tracking-head">

        <div>
          <small>
            ORDER NUMBER
          </small>

          <h2>
            #${order.id}
          </h2>
        </div>

        <span class="status">
          ${order.status}
        </span>

      </div>


      <p>
        Placed on ${order.date}
      </p>


      <div class="tracking-line">

        <div class="track-step active">

          <div class="track-icon">
            ✓
          </div>

          <div>
            <b>
              Order Placed
            </b>

            <small>
              Your order has been received
            </small>
          </div>

        </div>


        <div class="track-step active">

          <div class="track-icon">
            ✓
          </div>

          <div>
            <b>
              Processing
            </b>

            <small>
              Seller is preparing your order
            </small>
          </div>

        </div>


        <div class="track-step">

          <div class="track-icon">
            3
          </div>

          <div>
            <b>
              Shipped
            </b>

            <small>
              Your package will be shipped
            </small>
          </div>

        </div>


        <div class="track-step">

          <div class="track-icon">
            4
          </div>

          <div>
            <b>
              Out for Delivery
            </b>

            <small>
              Rider will deliver your order
            </small>
          </div>

        </div>


        <div class="track-step">

          <div class="track-icon">
            5
          </div>

          <div>
            <b>
              Delivered
            </b>

            <small>
              Order delivered successfully
            </small>
          </div>

        </div>

      </div>

    </div>


    <div class="tracking-card">

      <h3>
        Order Items
      </h3>

      ${order.items.map((item) => {

        const product = products.find(
          (p) => p.id === item.id
        );

        if (!product) return "";

        return `

          <div class="row-card">

            <div class="row-img">
              ${product.icon}
            </div>

            <div class="row-info">

              <h3>
                ${product.name}
              </h3>

              <p>
                ${money(product.price)}
                × ${item.qty}
              </p>

            </div>

          </div>

        `;

      }).join("")}

    </div>

  `;

  go("tracking");
}


/* =========================
   ACCOUNT
========================= */

function renderAccount() {

  const screen =
    document.getElementById("account");

  if (!screen) return;

  screen.innerHTML = `

    <div class="account-header">

      <div class="avatar">
        👤
      </div>

      <div>

        <h2>
          Welcome to BismiMart
        </h2>

        <p>
          Login to manage your account
        </p>

      </div>

    </div>


    <div class="account-actions">

      <button
        class="account-btn"
        onclick="loginScreen()"
      >

        <span>
          🔐
        </span>

        <div>
          <b>
            Login
          </b>

          <small>
            Access your BismiMart account
          </small>
        </div>

        <span>
          →
        </span>

      </button>


      <button
        class="account-btn"
        onclick="signupScreen()"
      >

        <span>
          ✨
        </span>

        <div>
          <b>
            Create Account
          </b>

          <small>
            Sign up for free
          </small>
        </div>

        <span>
          →
        </span>

      </button>


      <button
        class="account-btn"
        onclick="go('orders')"
      >

        <span>
          📦
        </span>

        <div>
          <b>
            My Orders
          </b>

          <small>
            View and track your orders
          </small>
        </div>

        <span>
          →
        </span>

      </button>


      <button
        class="account-btn"
        onclick="go('wishlist')"
      >

        <span>
          ❤️
        </span>

        <div>
          <b>
            Wishlist
          </b>

          <small>
            Your saved products
          </small>
        </div>

        <span>
          →
        </span>

      </button>


      <button
        class="account-btn"
        onclick="toast('Help Center coming soon')"
      >

        <span>
          ❓
        </span>

        <div>
          <b>
            Help & Support
          </b>

          <small>
            Get help with your orders
          </small>
        </div>

        <span>
          →
        </span>

      </button>

    </div>

  `;
}


/* =========================
   LOGIN SCREEN
========================= */

function loginScreen() {

  const screen =
    document.getElementById("login");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Login
      </h1>

    </div>


    <div class="auth-card">

      <div class="auth-logo">
        🛍️
      </div>

      <h2>
        Welcome Back
      </h2>

      <p>
        Login to continue shopping
      </p>


      <label>
        Email or Phone
      </label>

      <input
        id="loginEmail"
        class="input"
        type="text"
        placeholder="Enter email or phone"
      />


      <label>
        Password
      </label>

      <input
        id="loginPassword"
        class="input"
        type="password"
        placeholder="Enter password"
      />


      <button
        class="primary full"
        onclick="loginUser()"
      >
        Login
      </button>


      <p class="auth-bottom">

        Don't have an account?

        <button
          class="link"
          onclick="signupScreen()"
        >
          Sign Up
        </button>

      </p>

    </div>

  `;

  go("login");
}


/* =========================
   LOGIN USER
========================= */

function loginUser() {

  const email =
    document.getElementById("loginEmail");

  const password =
    document.getElementById("loginPassword");

  if (!email || !password) return;

  if (
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {

    toast("Please fill all fields");

    return;
  }

  localStorage.setItem(
    "bm_logged_in",
    "true"
  );

  localStorage.setItem(
    "bm_user",
    email.value.trim()
  );

  toast("Login successful 🎉");

  setTimeout(() => {

    renderAccount();

    go("account");

  }, 600);
}


/* =========================
   SIGN UP SCREEN
========================= */

function signupScreen() {

  const screen =
    document.getElementById("signup");

  if (!screen) return;

  screen.innerHTML = `

    <div class="page-head">

      <button
        class="back"
        onclick="go('account')"
      >
        ←
      </button>

      <h1>
        Create Account
      </h1>

    </div>


    <div class="auth-card">

      <div class="auth-logo">
        🛍️
      </div>

      <h2>
        Join BismiMart
      </h2>

      <p>
        Create your free account
      </p>


      <label>
        Full Name
      </label>

      <input
        id="signupName"
        class="input"
        type="text"
        placeholder="Enter your name"
      />


      <label>
        Email
      </label>

      <input
        id="signupEmail"
        class="input"
        type="email"
        placeholder="Enter email"
      />


      <label>
        Phone Number
      </label>

      <input
        id="signupPhone"
        class="input"
        type="tel"
        placeholder="03XX XXXXXXX"
      />


      <label>
        Password
      </label>

      <input
        id="signupPassword"
        class="input"
        type="password"
        placeholder="Create password"
      />


      <button
        class="primary full"
        onclick="createAccount()"
      >
        Create Account
      </button>


      <p class="auth-bottom">

        Already have an account?

        <button
          class="link"
          onclick="loginScreen()"
        >
          Login
        </button>

      </p>

    </div>

  `;

  go("signup");
}


/* =========================
   CREATE ACCOUNT
========================= */

function createAccount() {

  const name =
    document.getElementById("signupName");

  const email =
    document.getElementById("signupEmail");

  const phone =
    document.getElementById("signupPhone");

  const password =
    document.getElementById("signupPassword");

  if (
    !name ||
    !email ||
    !phone ||
    !password
  ) return;


  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === "" ||
    password.value.trim() === ""
  ) {

    toast("Please fill all fields");

    return;
  }


  const user = {

    name:
      name.value.trim(),

    email:
      email.value.trim(),

    phone:
      phone.value.trim()

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

    go("account");

  }, 700);
}


/* =========================
   LOGOUT
========================= */

function logout() {

  localStorage.removeItem(
    "bm_logged_in"
  );

  localStorage.removeItem(
    "bm_user"
  );

  localStorage.removeItem(
    "bm_user_data"
  );

  toast("Logged out");

  setTimeout(() => {

    renderAccount();

    go("account");

  }, 500);
}


/* =========================
   SEARCH
========================= */

function searchProducts(value) {

  const query =
    String(value || "")
      .trim()
      .toLowerCase();


  if (!query) {

    productsPage(
      products,
      "All Products"
    );

    return;
  }


  const result =
    products.filter((product) => {

      return (

        product.name
          .toLowerCase()
          .includes(query)

        ||

        product.cat
          .toLowerCase()
          .includes(query)

      );

    });


  productsPage(
    result,
    "Search Results"
  );
}


/* =========================
   SEARCH FROM HEADER
========================= */

function searchFromHeader() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;

  searchProducts(input.value);
}


/* =========================
   CLEAR SEARCH
========================= */

function clearSearch() {

  const input =
    document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }

  productsPage(
    products,
    "All Products"
  );
}


/* =========================
   FILTER BY PRICE
========================= */

function filterProducts(type) {

  let result = [...products];


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


  productsPage(
    result,
    "Filtered Products"
  );
}


/* =========================
   ACCOUNT USER STATE
========================= */

function getUser() {

  const data =
    localStorage.getItem(
      "bm_user_data"
    );

  if (!data) return null;

  try {

    return JSON.parse(data);

  } catch (error) {

    return null;

  }
}


/* =========================
   UPDATE ACCOUNT UI
========================= */

function accountProfile() {

  const user = getUser();

  if (!user) {

    return {

      name: "BismiMart Customer",

      email: "Login to your account"

    };

  }


  return {

    name:
      user.name || "BismiMart Customer",

    email:
      user.email || ""

  };

}


/* =========================
   INIT
========================= */

function initApp() {

  home();

  categories();

  productsPage(
    products,
    "All Products"
  );

  renderCart();

  renderWish();

  renderOrders();

  renderAccount();

  updateCounts();

  go("home");

}


/* =========================
   DOM READY
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initApp();

  }
);


/* =========================
   GLOBAL SEARCH ENTER
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      document.activeElement &&
      document.activeElement.id ===
      "searchInput"
    ) {

      searchFromHeader();

    }

  }
);


/* =========================
   PREVENT BUTTON FORM
========================= */

document.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest("button");

    if (!button) return;

    if (
      button.type === "submit"
    ) {

      event.preventDefault();

    }

  }
);


/* =========================
   FINAL COUNT UPDATE
========================= */

updateCounts();
