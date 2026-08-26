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

         
