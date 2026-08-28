/* =====================================================
   BISMI MART
   COMPLETE CORRECTED SCRIPT
===================================================== */


/* =====================================================
   DEFAULT PRODUCTS
===================================================== */

const products = [

  {
    id: 1,
    name: "Vivo Y17s (4GB • 128GB)",
    category: "Mobiles",
    price: 32999,
    oldPrice: 38999,
    rating: 4.6,
    emoji: "📱",
    image: "file_00000000b420821195f2136d2d25828a.png",
    description:
      "Vivo Y17s smartphone with 4GB RAM and 128GB storage. A practical choice for everyday use."
  },

  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 4499,
    oldPrice: 5999,
    rating: 4.5,
    emoji: "🎧",
    image: "",
    description:
      "Comfortable wireless headphones for music, calls and everyday entertainment."
  },

  {
    id: 3,
    name: "Premium Casual T-Shirt",
    category: "Fashion",
    price: 1499,
    oldPrice: 1999,
    rating: 4.4,
    emoji: "👕",
    image: "",
    description:
      "Soft and comfortable casual T-shirt suitable for everyday wear."
  },

  {
    id: 4,
    name: "Modern Table Lamp",
    category: "Home",
    price: 2499,
    oldPrice: 3299,
    rating: 4.3,
    emoji: "💡",
    image: "",
    description:
      "Simple modern table lamp for bedrooms, study areas and workspaces."
  },

  {
    id: 5,
    name: "Beauty Care Set",
    category: "Beauty",
    price: 1999,
    oldPrice: 2699,
    rating: 4.5,
    emoji: "💄",
    image: "",
    description:
      "Everyday beauty and personal-care essentials in one convenient set."
  },

  {
    id: 6,
    name: "Daily Grocery Pack",
    category: "Grocery",
    price: 1799,
    oldPrice: 2199,
    rating: 4.2,
    emoji: "🛒",
    image: "",
    description:
      "Useful daily grocery essentials for your home."
  },

  {
    id: 7,
    name: "Football Training Ball",
    category: "Sports",
    price: 1899,
    oldPrice: 2399,
    rating: 4.4,
    emoji: "⚽",
    image: "",
    description:
      "Durable football for training, practice and recreational play."
  },

  {
    id: 8,
    name: "Kids Teddy Bear",
    category: "Kids",
    price: 1299,
    oldPrice: 1799,
    rating: 4.6,
    emoji: "🧸",
    image: "",
    description:
      "Soft and cuddly teddy bear for kids."
  }

];


/* =====================================================
   LOCAL STORAGE DATA
===================================================== */

let cart =
  JSON.parse(localStorage.getItem("bismiCart") || "[]");

let wishlist =
  JSON.parse(localStorage.getItem("bismiWishlist") || "[]");

let orders =
  JSON.parse(localStorage.getItem("bismiOrders") || "[]");

let sellerProducts =
  JSON.parse(
    localStorage.getItem("bismiSellerProducts") || "[]"
  );


/* =====================================================
   VARIABLES
===================================================== */

let currentProductId = null;
let toastTimer = null;


/* =====================================================
   LOAD SELLER PRODUCTS INTO SHOP
   IMPORTANT FOR REFRESH
===================================================== */

function loadSellerProductsIntoShop() {

  sellerProducts.forEach(function(sellerProduct) {

    const id = Number(sellerProduct.id);

    const exists =
      products.some(function(product) {

        return Number(product.id) === id;

      });


    if (!exists) {

      products.push({

        id: id,

        name:
          sellerProduct.name || "Product",

        category:
          sellerProduct.category || "Other",

        price:
          Number(sellerProduct.price) || 0,

        oldPrice:
          Number(sellerProduct.oldPrice) ||
          Number(sellerProduct.price) ||
          0,

        rating:
          Number(sellerProduct.rating) || 4.5,

        emoji:
          sellerProduct.emoji || "📦",

        image:
          sellerProduct.image || "",

        description:
          sellerProduct.description ||
          "Quality product available at BismiMart.",

        sellerProduct: true

      });

    }

  });

}


/* =====================================================
   APP START
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    /* VERY IMPORTANT */
    loadSellerProductsIntoShop();

    renderHomeProducts();

    renderProducts(products);

    renderCart();

    renderWishlist();

    renderOrders();

    renderAccount();

    updateBadges();

    renderSellerCenter();

    showScreen("home", false);

  }
);


/* =====================================================
   SAVE DATA
===================================================== */

function saveData() {

  localStorage.setItem(
    "bismiCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "bismiWishlist",
    JSON.stringify(wishlist)
  );

  localStorage.setItem(
    "bismiOrders",
    JSON.stringify(orders)
  );

  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );

  updateBadges();

}


/* =====================================================
   MONEY
===================================================== */

function money(value) {

  return (
    "Rs. " +
    Number(value || 0).toLocaleString("en-PK")
  );

}


/* =====================================================
   GET PRODUCT
===================================================== */

function getProduct(id) {

  return products.find(function(product) {

    return Number(product.id) === Number(id);

  });

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

  return String(text ?? "").replace(
    /[&<>"']/g,
    function(c) {

      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[c];

    }
  );

}


/* =====================================================
   IMAGE HTML
===================================================== */

function imageHTML(product) {

  if (product.image) {

    return `

      <img
        src="${escapeHtml(product.image)}"
        alt="${escapeHtml(product.name)}"
        onerror="
          this.style.display='none';
          if(this.nextElementSibling){
            this.nextElementSibling.style.display='flex';
          }
        "
      >

      <span
        style="
          display:none;
          align-items:center;
          justify-content:center;
          font-size:70px;
          width:100%;
          height:100%;
        "
      >
        ${product.emoji || "📦"}
      </span>

    `;

  }


  return `

    <span
      style="
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        font-size:70px;
      "
    >
      ${product.emoji || "📦"}
    </span>

  `;

}


/* =====================================================
   SCREEN SYSTEM
===================================================== */

function showScreen(screen, scroll = true) {

  const target =
    document.getElementById(screen);

  if (!target) return;


  document
    .querySelectorAll(".screen")
    .forEach(function(s) {

      s.classList.remove("active");

    });


  target.classList.add("active");


  document
    .querySelectorAll(".nav-btn")
    .forEach(function(btn) {

      btn.classList.toggle(
        "active",
        btn.dataset.screen === screen
      );

    });


  if (screen === "cart") {

    renderCart();

  }


  if (screen === "wishlist") {

    renderWishlist();

  }


  if (screen === "orders") {

    renderOrders();

  }


  if (screen === "account") {

    renderAccount();

  }


  if (screen === "sellerCenter") {

    renderSellerCenter();

  }


  if (scroll) {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


/* =====================================================
   HOME
===================================================== */

function goHome() {

  showScreen("home");

}


/* =====================================================
   BADGES
===================================================== */

function updateBadges() {

  const cartCount =
    cart.reduce(
      function(total, item) {

        return total + Number(item.qty || 0);

      },
      0
    );


  const cartBadge =
    document.getElementById("cartBadge");

  const wishBadge =
    document.getElementById("wishBadge");


  if (cartBadge) {

    cartBadge.textContent = cartCount;

  }


  if (wishBadge) {

    wishBadge.textContent =
      wishlist.length;

  }

}


/* =====================================================
   HOME PRODUCTS
===================================================== */

function renderHomeProducts() {

  const box =
    document.getElementById("homeProducts");

  if (!box) return;


  box.innerHTML =
    products
      .slice(0, 4)
      .map(productCard)
      .join("");

}


/* =====================================================
   ALL PRODUCTS
===================================================== */

function renderProducts(list) {

  const box =
    document.getElementById("productList");

  if (!box) return;


  if (!list.length) {

    box.innerHTML = `

      <div
        class="empty"
        style="grid-column:1/-1"
      >

        <div class="empty-icon">
          🔎
        </div>

        <h2>
          No products found
        </h2>

        <p>
          Try another search or category.
        </p>

      </div>

    `;

    return;

  }


  box.innerHTML =
    list
      .map(productCard)
      .join("");

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function productCard(product) {

  const wished =
    wishlist.includes(Number(product.id));


  return `

    <article class="product-card">

      <div
        class="product-image"
        onclick="openProduct(${product.id})"
        style="cursor:pointer"
      >

        ${imageHTML(product)}

        <button
          class="wish-btn"
          onclick="
            event.stopPropagation();
            toggleWishlist(${product.id})
          "
        >
          ${wished ? "❤️" : "♡"}
        </button>

      </div>


      <div class="product-info">

        <div class="product-name">
          ${escapeHtml(product.name)}
        </div>


        <div class="rating">
          ⭐ ${Number(product.rating || 4.5).toFixed(1)}
        </div>


        <div class="price-row">

          <span class="price">
            ${money(product.price)}
          </span>

          ${
            Number(product.oldPrice) > Number(product.price)
              ? `
                <span class="old-price">
                  ${money(product.oldPrice)}
                </span>
              `
              : ""
          }

        </div>


        <div class="product-actions">

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            🛒 Add
          </button>


          <button
            class="buy-btn"
            onclick="openProduct(${product.id})"
          >
            View
          </button>

        </div>

      </div>

    </article>

  `;

}


/* =====================================================
   PRODUCT DETAIL
===================================================== */

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) return;


  currentProductId =
    Number(product.id);


  const image =
    document.getElementById("detailImage");


  if (image) {

    if (product.image) {

      image.innerHTML = `

        <img
          src="${escapeHtml(product.image)}"
          alt="${escapeHtml(product.name)}"
          onerror="
            this.style.display='none';
            if(this.nextElementSibling){
              this.nextElementSibling.style.display='flex';
            }
          "
        >

        <span
          style="
            display:none;
            align-items:center;
            justify-content:center;
            font-size:110px;
            width:100%;
            height:100%;
          "
        >
          ${product.emoji || "📦"}
        </span>

      `;

    } else {

      image.innerHTML = `

        <span
          style="
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:110px;
            width:100%;
            height:100%;
          "
        >
          ${product.emoji || "📦"}
        </span>

      `;

    }

  }


  const name =
    document.getElementById("detailName");

  if (name) {

    name.textContent =
      product.name;

  }


  const price =
    document.getElementById("detailPrice");

  if (price) {

    price.textContent =
      money(product.price);

  }


  const oldPrice =
    document.getElementById("detailOldPrice");

  if (oldPrice) {

    if (
      Number(product.oldPrice) >
      Number(product.price)
    ) {

      oldPrice.textContent =
        money(product.oldPrice);

    } else {

      oldPrice.textContent = "";

    }

  }


  const rating =
    document.getElementById("detailRating");

  if (rating) {

    rating.textContent =
      "⭐⭐⭐⭐⭐ " +
      Number(product.rating || 4.5).toFixed(1);

  }


  const description =
    document.querySelector(".detail-description");

  if (description) {

    description.textContent =
      product.description ||
      "Quality product available at BismiMart.";

  }


  showScreen("detail");

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function openCategory(category) {

  const filtered =
    products.filter(function(product) {

      return (
        String(product.category).toLowerCase() ===
        String(category).toLowerCase()
      );

    });


  const title =
    document.getElementById("productsTitle");

  if (title) {

    title.textContent =
      category;

  }


  renderProducts(filtered);

  showScreen("products");

}


/* =====================================================
   SEARCH
===================================================== */

function searchKey(event) {

  if (event.key === "Enter") {

    searchProducts();

  }

}


function searchProducts() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (!query) {

    const title =
      document.getElementById("productsTitle");

    if (title) {

      title.textContent =
        "All Products";

    }


    renderProducts(products);

    showScreen("products");

    return;

  }


  const results =
    products.filter(function(product) {

      return (

        String(product.name)
          .toLowerCase()
          .includes(query)

        ||

        String(product.category)
          .toLowerCase()
          .includes(query)

        ||

        String(product.description || "")
          .toLowerCase()
          .includes(query)

      );

    });


  const title =
    document.getElementById("productsTitle");

  if (title) {

    title.textContent =
      "Search: " + input.value.trim();

  }


  renderProducts(results);

  showScreen("products");


  if (!results.length) {

    toast(
      "No product found for your search."
    );

  }

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id, qty = 1) {

  const product =
    getProduct(id);

  if (!product) return;


  qty = Number(qty);

  if (!qty || qty < 1) {

    qty = 1;

  }


  const existing =
    cart.find(function(item) {

      return Number(item.id) ===
        Number(product.id);

    });


  if (existing) {

    existing.qty =
      Number(existing.qty || 0) + qty;

  } else {

    cart.push({

      id: Number(product.id),

      qty: qty

    });

  }


  saveData();

  renderCart();

  toast(
    product.name +
    " added to cart 🛒"
  );

}


/* =====================================================
   CURRENT PRODUCT CART
===================================================== */

function addCurrentProduct() {

  if (currentProductId) {

    addToCart(currentProductId);

  }

}


/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeQty(id, amount) {

  const item =
    cart.find(function(i) {

      return Number(i.id) ===
        Number(id);

    });


  if (!item) return;


  item.qty =
    Number(item.qty || 0) +
    Number(amount);


  if (item.qty <= 0) {

    cart =
      cart.filter(function(i) {

        return Number(i.id) !==
          Number(id);

      });

  }


  saveData();

  renderCart();

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

  cart =
    cart.filter(function(i) {

      return Number(i.id) !==
        Number(id);

    });


  saveData();

  renderCart();

  toast(
    "Product removed from cart"
  );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

  const list =
    document.getElementById("cartList");

  const summary =
    document.getElementById("cartSummary");


  if (!list || !summary) return;


  /* REMOVE INVALID PRODUCTS */

  cart =
    cart.filter(function(item) {

      return !!getProduct(item.id);

    });


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
          class="primary-btn"
          style="margin-top:15px"
          onclick="showScreen('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    summary.innerHTML = "";

    updateBadges();

    return;

  }


  list.innerHTML =
    cart.map(function(item) {

      const p =
        getProduct(item.id);

      if (!p) return "";


      return `

        <div class="cart-item">

          <div class="cart-thumb">
            ${imageHTML(p)}
          </div>


          <div>

            <div class="cart-name">
              ${escapeHtml(p.name)}
            </div>


            <div class="cart-price">
              ${money(
                Number(p.price) *
                Number(item.qty)
              )}
            </div>


            <div class="qty-controls">

              <button
                onclick="changeQty(${p.id},-1)"
              >
                −
              </button>


              <strong>
                ${item.qty}
              </strong>


              <button
                onclick="changeQty(${p.id},1)"
              >
                +
              </button>

            </div>


            <button
              class="remove-btn"
              onclick="removeFromCart(${p.id})"
            >
              Remove
            </button>

          </div>


          <button
            class="remove-btn"
            onclick="removeFromCart(${p.id})"
          >
            ✕
          </button>

        </div>

      `;

    }).join("");


  const subtotal =
    cart.reduce(function(total, item) {

      const p =
        getProduct(item.id);

      if (!p) return total;


      return total +
        Number(p.price) *
        Number(item.qty || 0);

    }, 0);


  const delivery =
    subtotal >= 3000
      ? 0
      : 199;


  const total =
    subtotal + delivery;


  summary.innerHTML = `

    <div class="cart-summary">

      <div class="summary-row">

        <span>
          Subtotal
        </span>

        <strong>
          ${money(subtotal)}
        </strong>

      </div>


      <div class="summary-row">

        <span>
          Delivery
        </span>

        <strong>
          ${
            delivery === 0
              ? "FREE"
              : money(delivery)
          }
        </strong>

      </div>


      <div class="summary-row summary-total">

        <span>
          Total
        </span>

        <strong>
          ${money(total)}
        </strong>

      </div>


      <button
        class="primary-btn checkout-btn"
        onclick="checkout()"
      >
        Proceed to Checkout
      </button>

    </div>

  `;


  updateBadges();

}


/* =====================================================
   BUY NOW
===================================================== */

function buyCurrentProduct() {

  if (!currentProductId) return;


  addToCart(currentProductId);

  showScreen("cart");

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

  if (!cart.length) {

    toast(
      "Your cart is empty."
    );

    return;

  }


  const validCart =
    cart.filter(function(item) {

      return !!getProduct(item.id);

    });


  if (!validCart.length) {

    toast(
      "No valid products in cart."
    );

    return;

  }


  const subtotal =
    validCart.reduce(function(total, item) {

      const p =
        getProduct(item.id);

      return total +
        Number(p.price) *
        Number(item.qty || 0);

    }, 0);


  const delivery =
    subtotal >= 3000
      ? 0
      : 199;


  const total =
    subtotal + delivery;


  const order = {

    id:
      "BM" +
      Date.now()
        .toString()
        .slice(-8),

    date:
      new Date().toLocaleString(),

    items:
      validCart.map(function(item) {

        return {

          id: Number(item.id),

          qty: Number(item.qty || 1)

        };

      }),

    subtotal:
      subtotal,

    delivery:
      delivery,

    total:
      total,

    status:
      "Order Placed"

  };


  orders.unshift(order);

  cart = [];


  saveData();

  renderCart();

  renderOrders();

  renderSellerCenter();

  toast(
    "Order placed successfully! 📦"
  );


  setTimeout(function() {

    showScreen("orders");

  }, 600);

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(id) {

  id = Number(id);


  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(function(x) {

        return Number(x) !== id;

      });


    toast(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(id);

    toast(
      "Added to wishlist ❤️"
    );

  }


  saveData();

  renderHomeProducts();

  renderProducts(products);

  renderWishlist();

}


/* =====================================================
   WISHLIST SCREEN
===================================================== */

function renderWishlist() {

  const box =
    document.getElementById("wishlistList");

  if (!box) return;


  /* REMOVE PRODUCTS THAT NO LONGER EXIST */

  wishlist =
    wishlist.filter(function(id) {

      return !!getProduct(id);

    });


  const saved =
    wishlist
      .map(function(id) {

        return getProduct(id);

      })
      .filter(Boolean);


  if (!saved.length) {

    box.innerHTML = `

      <div
        class="empty"
        style="grid-column:1/-1"
      >

        <div class="empty-icon">
          ❤️
        </div>

        <h2>
          Your Wishlist is Empty
        </h2>

        <p>
          Tap the heart on a product
          to save it here.
        </p>

        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="showScreen('products')"
        >
          Browse Products
        </button>

      </div>

    `;

    return;

  }


  box.innerHTML =
    saved
      .map(productCard)
      .join("");

}


/* =====================================================
   ORDERS
===================================================== */

function renderOrders() {

  const box =
    document.getElementById("ordersList");

  if (!box) return;


  if (!orders.length) {

    box.innerHTML = `

      <div class="empty">

        <div class="empty-icon">
          📦
        </div>

        <h2>
          No Orders Yet
        </h2>

        <p>
          Your placed orders
          will appear here.
        </p>

        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="showScreen('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    return;

  }


  box.innerHTML =
    orders.map(function(order) {

      const count =
        (order.items || []).reduce(
          function(total, item) {

            return total +
              Number(item.qty || 0);

          },
          0
        );


      return `

        <div class="order-card">

          <div>

            <strong>
              Order #${escapeHtml(order.id)}
            </strong>


            <p
              style="
                color:#777;
                font-size:12px;
                margin-top:5px;
              "
            >
              ${escapeHtml(order.date)}
            </p>


            <p style="margin-top:7px">

              ${count} item(s)

              •
              
              ${money(order.total)}

            </p>

          </div>


          <div class="order-status">

            ${escapeHtml(
              order.status || "Order Placed"
            )}

          </div>

        </div>

      `;

    }).join("");

}


/* =====================================================
   ACCOUNT
===================================================== */

function renderAccount() {

  const box =
    document.getElementById("accountContent");

  if (!box) return;


  box.innerHTML = `

    <div class="account-hero">

      <h2>
        Welcome to BismiMart 👋
      </h2>

      <p>
        Login or create an account
        to manage your shopping.
      </p>


      <div
        style="
          display:flex;
          gap:8px;
          margin-top:15px;
        "
      >

        <button
          class="secondary-btn"
          onclick="loginDemo()"
        >
          🔐 Login
        </button>


        <button
          class="secondary-btn"
          onclick="signupDemo()"
        >
          ✨ Create Account
        </button>

      </div>

    </div>


    <div class="account-menu">

      <button
        onclick="showScreen('orders')"
      >

        <span class="menu-icon">
          📦
        </span>

        <span>
          My Orders
        </span>

        <span style="margin-left:auto">
          ›
        </span>

      </button>


      <button
        onclick="showScreen('wishlist')"
      >

        <span class="menu-icon">
          ❤️
        </span>

        <span>
          Wishlist
        </span>

        <span style="margin-left:auto">
          ›
        </span>

      </button>


      <button
        onclick="sellerCenter()"
      >

        <span class="menu-icon">
          🏪
        </span>

        <span>
          Seller Center
        </span>

        <span style="margin-left:auto">
          ›
        </span>

      </button>


      <button
        onclick="showScreen('cart')"
      >

        <span class="menu-icon">
          🛒
        </span>

        <span>
          My Cart
        </span>

        <span style="margin-left:auto">
          ›
        </span>

      </button>

    </div>

  `;

}


/* =====================================================
   LOGIN / SIGNUP DEMO
===================================================== */

function loginDemo() {

  toast(
    "Login screen is ready for backend connection."
  );

}


function signupDemo() {

  toast(
    "Create Account is ready for backend connection."
  );

}


/* =====================================================
   SELLER CENTER
===================================================== */

function sellerCenter() {

  closeSellerPanels();

  showScreen("sellerCenter");

  renderSellerCenter();

}


/* =====================================================
   SELLER CENTER STATS
===================================================== */

function renderSellerCenter() {

  const productCount =
    document.getElementById(
      "sellerProductCount"
    );


  const orderCount =
    document.getElementById(
      "sellerOrderCount"
    );


  const earnings =
    document.getElementById(
      "sellerEarnings"
    );


  if (productCount) {

    productCount.textContent =
      sellerProducts.length;

  }


  const sellerOrders =
    getSellerOrders();


  if (orderCount) {

    orderCount.textContent =
      sellerOrders.length;

  }


  const data =
    calculateSellerEarnings();


  if (earnings) {

    earnings.textContent =
      money(data.net);

  }

}


/* =====================================================
   CLOSE SELLER PANELS
===================================================== */

function closeSellerPanels() {

  const panels = [

    "addProductPanel",

    "sellerProductsPanel",

    "sellerOrdersPanel",

    "sellerEarningsPanel"

  ];


  panels.forEach(function(id) {

    const panel =
      document.getElementById(id);

    if (panel) {

      panel.style.display =
        "none";

    }

  });

}


/* =====================================================
   CLOSE SELLER PANEL
===================================================== */

function closeSellerPanel() {

  closeSellerPanels();

}


/* =====================================================
   OPEN ADD PRODUCT
===================================================== */

function openAddProduct() {

  closeSellerPanels();


  const panel =
    document.getElementById(
      "addProductPanel"
    );


  if (panel) {

    panel.style.display =
      "block";

  }


  const name =
    document.getElementById(
      "sellerProductName"
    );


  if (name) {

    setTimeout(function() {

      name.focus();

    }, 100);

  }

}


/* =====================================================
   ADD SELLER PRODUCT
===================================================== */

function addSellerProduct() {

  const nameInput =
    document.getElementById(
      "sellerProductName"
    );


  const categoryInput =
    document.getElementById(
      "sellerProductCategory"
    );


  const priceInput =
    document.getElementById(
      "sellerProductPrice"
    );


  const oldPriceInput =
    document.getElementById(
      "sellerProductOldPrice"
    );


  const emojiInput =
    document.getElementById(
      "sellerProductEmoji"
    );


  const descriptionInput =
    document.getElementById(
      "sellerProductDescription"
    );


  if (
    !nameInput ||
    !categoryInput ||
    !priceInput ||
    !oldPriceInput ||
    !emojiInput ||
    !descriptionInput
  ) {

    toast(
      "Seller form could not be loaded."
    );

    return;

  }


  const name =
    nameInput.value.trim();


  const category =
    categoryInput.value;


  const price =
    Number(priceInput.value);


  const oldPrice =
    Number(oldPriceInput.value);


  const emoji =
    emojiInput.value.trim() ||
    "📦";


  const description =
    descriptionInput.value.trim();


  /* VALIDATION */

  if (!name) {

    toast(
      "Please enter product name."
    );

    return;

  }


  if (!price || price <= 0) {

    toast(
      "Please enter a valid price."
    );

    return;

  }


  if (
    oldPrice &&
    oldPrice < price
  ) {

    toast(
      "Old price should be higher than selling price."
    );

    return;

  }


  /* UNIQUE ID */

  let newId =
    Date.now();


  while (
    products.some(function(product) {

      return Number(product.id) ===
        Number(newId);

    })
  ) {

    newId++;

  }


  /* CREATE PRODUCT */

  const newProduct = {

    id:
      newId,

    name:
      name,

    category:
      category,

    price:
      price,

    oldPrice:
      oldPrice || price,

    rating:
      4.5,

    emoji:
      emoji,

    image:
      "",

    description:
      description ||
      "Quality product available at BismiMart.",

    sellerProduct:
      true

  };


  /* SAVE SELLER PRODUCT */

  sellerProducts.push(
    newProduct
  );


  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );


  /* ADD TO MAIN SHOP ARRAY */

  products.push(
    newProduct
  );


  /* CLEAR FORM */

  nameInput.value = "";

  priceInput.value = "";

  oldPriceInput.value = "";

  emojiInput.value = "";

  descriptionInput.value = "";


  /* REFRESH EVERYTHING */

  renderHomeProducts();

  renderProducts(products);

  renderSellerCenter();

  renderSellerProducts();


  /* OPEN MY PRODUCTS */

  showSellerProducts();


  toast(
    "Product added successfully! 📦"
  );

}


/* =====================================================
   SELLER PRODUCTS
===================================================== */

function showSellerProducts() {

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerProductsPanel"
    );


  if (panel) {

    panel.style.display =
      "block";

  }


  renderSellerProducts();

}


/* =====================================================
   RENDER SELLER PRODUCTS
===================================================== */

function renderSellerProducts() {

  const box =
    document.getElementById(
      "sellerProductsList"
    );


  if (!box) return;


  if (!sellerProducts.length) {

    box.innerHTML = `

      <div class="empty">

        <div class="empty-icon">
          📦
        </div>

        <h2>
          No Products Yet
        </h2>

        <p>
          Add your first product
          to start selling.
        </p>

        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="openAddProduct()"
        >
          ➕ Add Product
        </button>

      </div>

    `;

    return;

  }


  box.innerHTML =
    sellerProducts
      .map(function(product) {

        return `

          <div class="seller-product-item">

            <div class="seller-product-icon">

              ${product.emoji || "📦"}

            </div>


            <div class="seller-product-info">

              <strong>
                ${escapeHtml(product.name)}
              </strong>


              <small>
                ${escapeHtml(product.category)}
              </small>


              <b>
                ${money(product.price)}
              </b>

            </div>


            <button
              class="remove-btn"
              onclick="deleteSellerProduct(${product.id})"
            >
              🗑️
            </button>

          </div>

        `;

      })
      .join("");

}


/* =====================================================
   DELETE SELLER PRODUCT
===================================================== */

function deleteSellerProduct(id) {

  id = Number(id);


  const product =
    sellerProducts.find(function(p) {

      return Number(p.id) === id;

    });


  if (!product) return;


  /* REMOVE FROM SELLER PRODUCTS */

  sellerProducts =
    sellerProducts.filter(function(p) {

      return Number(p.id) !== id;

    });


  /* SAVE */

  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );


  /* REMOVE FROM MAIN PRODUCTS */

  for (
    let i = products.length - 1;
    i >= 0;
    i--
  ) {

    if (
      Number(products[i].id) === id
    ) {

      products.splice(i, 1);

    }

  }


  /* REMOVE FROM CART */

  cart =
    cart.filter(function(item) {

      return Number(item.id) !== id;

    });


  /* REMOVE FROM WISHLIST */

  wishlist =
    wishlist.filter(function(itemId) {

      return Number(itemId) !== id;

    });


  saveData();


  renderSellerProducts();

  renderSellerCenter();

  renderHomeProducts();

  renderProducts(products);

  renderCart();

  renderWishlist();


  toast(
    "Product removed."
  );

}


/* =====================================================
   SELLER ORDERS
===================================================== */

function showSellerOrders() {

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerOrdersPanel"
    );


  if (panel) {

    panel.style.display =
      "block";

  }


  renderSellerOrders();

}


/* =====================================================
   GET SELLER ORDERS
===================================================== */

function getSellerOrders() {

  return orders.filter(function(order) {

    if (!order.items) return false;


    return order.items.some(function(item) {

      return sellerProducts.some(
        function(product) {

          return Number(product.id) ===
            Number(item.id);

        }
      );

    });

  });

}


/* =====================================================
   RENDER SELLER ORDERS
===================================================== */

function renderSellerOrders() {

  const box =
    document.getElementById(
      "sellerOrdersList"
    );


  if (!box) return;


  const sellerOrders =
    getSellerOrders();


  if (!sellerOrders.length) {

    box.innerHTML = `

      <div class="empty">

        <div class="empty-icon">
          🛍️
        </div>

        <h2>
          No Seller Orders
        </h2>

        <p>
          Customer orders containing
          your products will appear here.
        </p>

      </div>

    `;

    return;

  }


  box.innerHTML =
    sellerOrders
      .map(function(order) {

        const sellerItems =
          order.items.filter(function(item) {

            return sellerProducts.some(
              function(product) {

                return Number(product.id) ===
                  Number(item.id);

              }
            );

          });


        let sellerTotal = 0;


        sellerItems.forEach(function(item) {

          const product =
            sellerProducts.find(
              function(p) {

                return Number(p.id) ===
                  Number(item.id);

              }
            );


          if (product) {

            sellerTotal +=
              Number(product.price) *
              Number(item.qty || 0);

          }

        });


        return `

          <div class="order-card">

            <div>

              <strong>
                Order #${escapeHtml(order.id)}
              </strong>


              <p
                style="
                  color:#777;
                  font-size:12px;
                  margin-top:5px;
                "
              >
                ${escapeHtml(order.date)}
              </p>


              <p style="margin-top:7px">

                ${sellerItems.reduce(
                  function(total, item) {
                    return total +
                      Number(item.qty || 0);
                  },
                  0
                )}
                item(s)

                •

                ${money(sellerTotal)}

              </p>

            </div>


            <div class="order-status">

              ${escapeHtml(
                order.status ||
                "Order Placed"
              )}

            </div>

          </div>

        `;

      })
      .join("");

}


/* =====================================================
   SELLER EARNINGS
===================================================== */

function showSellerEarnings() {

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerEarningsPanel"
    );


  if (panel) {

    panel.style.display =
      "block";

  }


  renderSellerEarnings();

}


/* =====================================================
   CALCULATE SELLER EARNINGS
===================================================== */

function calculateSellerEarnings() {

  let totalSales = 0;


  const sellerOrders =
    getSellerOrders();


  sellerOrders.forEach(function(order) {

    if (!order.items) return;


    order.items.forEach(function(item) {

      const product =
        sellerProducts.find(
          function(p) {

            return Number(p.id) ===
              Number(item.id);

          }
        );


      if (product) {

        totalSales +=
          Number(product.price) *
          Number(item.qty || 0);

      }

    });

  });


  /* 10% BISMI MART COMMISSION */

  const commission =
    totalSales * 0.10;


  /* 90% SELLER */

  const net =
    totalSales - commission;


  return {

    sales:
      totalSales,

    commission:
      commission,

    net:
      net

  };

}


/* =====================================================
   RENDER SELLER EARNINGS
===================================================== */

function renderSellerEarnings() {

  const data =
    calculateSellerEarnings();


  const totalSales =
    document.getElementById(
      "sellerTotalSales"
    );


  const commission =
    document.getElementById(
      "sellerCommission"
    );


  const net =
    document.getElementById(
      "sellerNetEarnings"
    );


  if (totalSales) {

    totalSales.textContent =
      money(data.sales);

  }


  if (commission) {

    commission.textContent =
      money(data.commission);

  }


  if (net) {

    net.textContent =
      money(data.net);

  }

}


/* =====================================================
   TOAST
===================================================== */

function toast(message) {

  const box =
    document.getElementById("toast");

  if (!box) return;


  clearTimeout(toastTimer);


  box.textContent =
    message;


  box.classList.add("show");


  toastTimer =
    setTimeout(function() {

      box.classList.remove("show");

    }, 2200);

}


/* =====================================================
   STORAGE SYNC
===================================================== */

window.addEventListener(
  "storage",
  function() {

    cart =
      JSON.parse(
        localStorage.getItem(
          "bismiCart"
        ) || "[]"
      );


    wishlist =
      JSON.parse(
        localStorage.getItem(
          "bismiWishlist"
        ) || "[]"
      );


    orders =
      JSON.parse(
        localStorage.getItem(
          "bismiOrders"
        ) || "[]"
      );


    sellerProducts =
      JSON.parse(
        localStorage.getItem(
          "bismiSellerProducts"
        ) || "[]"
      );


    /* REBUILD SHOP PRODUCTS */

    const defaultProducts = [

      {
        id: 1,
        name: "Vivo Y17s (4GB • 128GB)",
        category: "Mobiles",
        price: 32999,
        oldPrice: 38999,
        rating: 4.6,
        emoji: "📱",
        image: "file_00000000b420821195f2136d2d25828a.png",
        description:
          "Vivo Y17s smartphone with 4GB RAM and 128GB storage. A practical choice for everyday use."
      },

      {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 4499,
        oldPrice: 5999,
        rating: 4.5,
        emoji: "🎧",
        image: "",
        description:
          "Comfortable wireless headphones for music, calls and everyday entertainment."
      },

      {
        id: 3,
        name: "Premium Casual T-Shirt",
        category: "Fashion",
        price: 1499,
        oldPrice: 1999,
        rating: 4.4,
        emoji: "👕",
        image: "",
        description:
          "Soft and comfortable casual T-shirt suitable for everyday wear."
      },

      {
        id: 4,
        name: "Modern Table Lamp",
        category: "Home",
        price: 2499,
        oldPrice: 3299,
        rating: 4.3,
        emoji: "💡",
        image: "",
        description:
          "Simple modern table lamp for bedrooms, study areas and workspaces."
      },

      {
        id: 5,
        name: "Beauty Care Set",
        category: "Beauty",
        price: 1999,
        oldPrice: 2699,
        rating: 4.5,
        emoji: "💄",
        image: "",
        description:
          "Everyday beauty and personal-care essentials in one convenient set."
      },

      {
        id: 6,
        name: "Daily Grocery Pack",
        category: "Grocery",
        price: 1799,
        oldPrice: 2199,
        rating: 4.2,
        emoji: "🛒",
        image: "",
        description:
          "Useful daily grocery essentials for your home."
      },

      {
        id: 7,
        name: "Football Training Ball",
        category: "Sports",
        price: 1899,
        oldPrice: 2399,
        rating: 4.4,
        emoji: "⚽",
        image: "",
        description:
          "Durable football for training, practice and recreational play."
      },

      {
        id: 8,
        name: "Kids Teddy Bear",
        category: "Kids",
        price: 1299,
        oldPrice: 1799,
        rating: 4.6,
        emoji: "🧸",
        image: "",
        description:
          "Soft and cuddly teddy bear for kids."
      }

    ];


    products.length = 0;


    defaultProducts.forEach(function(product) {

      products.push(product);

    });


    loadSellerProductsIntoShop();


    updateBadges();

    renderHomeProducts();

    renderProducts(products);

    renderCart();

    renderWishlist();

    renderOrders();

    renderSellerCenter();

  }
);


/* =====================================================
   SAFETY:
   IF SCRIPT IS LOADED AFTER DOM READY
===================================================== */

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {

  if (
    document.getElementById("homeProducts")
  ) {

    loadSellerProductsIntoShop();

    renderHomeProducts();

    renderProducts(products);

    renderCart();

    renderWishlist();

    renderOrders();

    renderAccount();

    updateBadges();

    renderSellerCenter();

  }

}
