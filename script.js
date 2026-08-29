/* =====================================================
   BISMI MART
   COMPLETE SELLER + SHOP SCRIPT
   Compatible with existing index.html
===================================================== */


/* =====================================================
   DEFAULT PRODUCTS
===================================================== */

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


/* =====================================================
   MAIN PRODUCT ARRAY
===================================================== */

const products = [];


/* =====================================================
   SAFE LOCAL STORAGE
===================================================== */

function readStorage(key, fallback) {

  try {

    const value =
      localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsed =
      JSON.parse(value);

    return parsed;

  } catch (error) {

    console.warn(
      "Storage read error:",
      key,
      error
    );

    return fallback;

  }

}


function writeStorage(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.warn(
      "Storage write error:",
      key,
      error
    );

  }

}


/* =====================================================
   USER DATA
===================================================== */

let cart =
  readStorage("bismiCart", []);

let wishlist =
  readStorage("bismiWishlist", []);

let orders =
  readStorage("bismiOrders", []);

let sellerProducts =
  readStorage("bismiSellerProducts", []);


/* =====================================================
   NORMALIZE DATA
===================================================== */

if (!Array.isArray(cart)) {
  cart = [];
}

if (!Array.isArray(wishlist)) {
  wishlist = [];
}

if (!Array.isArray(orders)) {
  orders = [];
}

if (!Array.isArray(sellerProducts)) {
  sellerProducts = [];
}


/* =====================================================
   VARIABLES
===================================================== */

let currentProductId = null;
let toastTimer = null;


/* =====================================================
   BUILD SHOP PRODUCTS
===================================================== */

function rebuildProducts() {

  products.length = 0;


  /* DEFAULT PRODUCTS */

  defaultProducts.forEach(function(product) {

    products.push({
      ...product
    });

  });


  /* SELLER PRODUCTS */

  sellerProducts.forEach(function(sellerProduct) {

    const sellerId =
      Number(sellerProduct.id);

    if (!sellerId) {
      return;
    }


    const alreadyExists =
      products.some(function(product) {

        return Number(product.id) === sellerId;

      });


    if (alreadyExists) {
      return;
    }


    products.push({

      id: sellerId,

      name:
        sellerProduct.name ||
        "Product",

      category:
        sellerProduct.category ||
        "Other",

      price:
        Number(sellerProduct.price) || 0,

      oldPrice:
        Number(sellerProduct.oldPrice) ||
        Number(sellerProduct.price) ||
        0,

      rating:
        Number(sellerProduct.rating) ||
        4.5,

      emoji:
        sellerProduct.emoji ||
        "📦",

      image:
        sellerProduct.image ||
        "",

      description:
        sellerProduct.description ||
        "Quality product available at BismiMart.",

      sellerProduct:
        true

    });

  });

}


/* =====================================================
   INITIAL BUILD
===================================================== */

rebuildProducts();


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    initializeApp();

  }
);


/* =====================================================
   INITIALIZE APP
===================================================== */

function initializeApp() {

  rebuildProducts();

  renderHomeProducts();

  renderProducts(products);

  renderCart();

  renderWishlist();

  renderOrders();

  renderAccount();

  renderSellerCenter();

  updateBadges();

  showScreen("home", false);

}


/* =====================================================
   SAVE ALL DATA
===================================================== */

function saveData() {

  writeStorage(
    "bismiCart",
    cart
  );

  writeStorage(
    "bismiWishlist",
    wishlist
  );

  writeStorage(
    "bismiOrders",
    orders
  );

  writeStorage(
    "bismiSellerProducts",
    sellerProducts
  );

  updateBadges();

}


/* =====================================================
   MONEY FORMAT
===================================================== */

function money(value) {

  const number =
    Number(value) || 0;

  return (
    "Rs. " +
    number.toLocaleString("en-PK")
  );

}


/* =====================================================
   GET PRODUCT
===================================================== */

function getProduct(id) {

  return products.find(
    function(product) {

      return (
        Number(product.id) ===
        Number(id)
      );

    }
  );

}


/* =====================================================
   GET SELLER PRODUCT
===================================================== */

function getSellerProduct(id) {

  return sellerProducts.find(
    function(product) {

      return (
        Number(product.id) ===
        Number(id)
      );

    }
  );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

  return String(text ?? "").replace(
    /[&<>"']/g,
    function(character) {

      return {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      }[character];

    }
  );

}


/* =====================================================
   IMAGE HTML
===================================================== */

function imageHTML(product) {

  if (
    product &&
    product.image
  ) {

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
      ${product?.emoji || "📦"}
    </span>

  `;

}


/* =====================================================
   SCREEN SYSTEM
===================================================== */

function showScreen(
  screen,
  scroll = true
) {

  const target =
    document.getElementById(screen);

  if (!target) {
    return;
  }


  document
    .querySelectorAll(".screen")
    .forEach(function(section) {

      section.classList.remove(
        "active"
      );

    });


  target.classList.add("active");


  document
    .querySelectorAll(".nav-btn")
    .forEach(function(button) {

      button.classList.toggle(
        "active",
        button.dataset.screen === screen
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

        return (
          total +
          Number(item.qty || 0)
        );

      },
      0
    );


  const cartBadge =
    document.getElementById(
      "cartBadge"
    );


  const wishBadge =
    document.getElementById(
      "wishBadge"
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


/* =====================================================
   HOME PRODUCTS
===================================================== */

function renderHomeProducts() {

  const box =
    document.getElementById(
      "homeProducts"
    );

  if (!box) {
    return;
  }


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
    document.getElementById(
      "productList"
    );

  if (!box) {
    return;
  }


  if (!Array.isArray(list) || !list.length) {

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

  const id =
    Number(product.id);


  const wished =
    wishlist.some(
      function(itemId) {

        return (
          Number(itemId) === id
        );

      }
    );


  return `

    <article class="product-card">

      <div
        class="product-image"
        onclick="openProduct(${id})"
        style="cursor:pointer"
      >

        ${imageHTML(product)}

        <button
          class="wish-btn"
          onclick="
            event.stopPropagation();
            toggleWishlist(${id});
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
          ⭐
          ${Number(
            product.rating || 4.5
          ).toFixed(1)}
        </div>


        <div class="price-row">

          <span class="price">
            ${money(product.price)}
          </span>

          ${
            Number(product.oldPrice) >
            Number(product.price)

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
            onclick="addToCart(${id})"
          >
            🛒 Add
          </button>


          <button
            class="buy-btn"
            onclick="openProduct(${id})"
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

  if (!product) {

    toast(
      "Product not found."
    );

    return;

  }


  currentProductId =
    Number(product.id);


  const imageBox =
    document.getElementById(
      "detailImage"
    );


  if (imageBox) {

    imageBox.innerHTML =
      imageHTML(product);

  }


  const name =
    document.getElementById(
      "detailName"
    );


  if (name) {

    name.textContent =
      product.name;

  }


  const price =
    document.getElementById(
      "detailPrice"
    );


  if (price) {

    price.textContent =
      money(product.price);

  }


  const oldPrice =
    document.getElementById(
      "detailOldPrice"
    );


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
    document.getElementById(
      "detailRating"
    );


  if (rating) {

    rating.textContent =
      "⭐⭐⭐⭐⭐ " +
      Number(
        product.rating || 4.5
      ).toFixed(1);

  }


  const description =
    document.querySelector(
      ".detail-description"
    );


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

  const selectedCategory =
    String(category || "")
      .trim()
      .toLowerCase();


  const filtered =
    products.filter(
      function(product) {

        return (
          String(
            product.category || ""
          )
            .trim()
            .toLowerCase() ===
          selectedCategory
        );

      }
    );


  const title =
    document.getElementById(
      "productsTitle"
    );


  if (title) {

    title.textContent =
      category;

  }


  renderProducts(filtered);

  showScreen("products");

}


/* =====================================================
   SEARCH KEY
===================================================== */

function searchKey(event) {

  if (
    event &&
    event.key === "Enter"
  ) {

    searchProducts();

  }

}


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

function searchProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );

  if (!input) {
    return;
  }


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (!query) {

    const title =
      document.getElementById(
        "productsTitle"
      );


    if (title) {

      title.textContent =
        "All Products";

    }


    renderProducts(products);

    showScreen("products");

    return;

  }


  const results =
    products.filter(
      function(product) {

        const name =
          String(
            product.name || ""
          ).toLowerCase();


        const category =
          String(
            product.category || ""
          ).toLowerCase();


        const description =
          String(
            product.description || ""
          ).toLowerCase();


        return (

          name.includes(query) ||

          category.includes(query) ||

          description.includes(query)

        );

      }
    );


  const title =
    document.getElementById(
      "productsTitle"
    );


  if (title) {

    title.textContent =
      "Search: " +
      input.value.trim();

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

function addToCart(
  id,
  qty = 1
) {

  const product =
    getProduct(id);

  if (!product) {

    toast(
      "Product not found."
    );

    return;

  }


  qty =
    Number(qty);


  if (
    !Number.isFinite(qty) ||
    qty < 1
  ) {

    qty = 1;

  }


  const existing =
    cart.find(
      function(item) {

        return (
          Number(item.id) ===
          Number(product.id)
        );

      }
    );


  if (existing) {

    existing.qty =
      Number(existing.qty || 0) +
      qty;

  } else {

    cart.push({

      id:
        Number(product.id),

      qty:
        qty

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
   ADD CURRENT PRODUCT
===================================================== */

function addCurrentProduct() {

  if (!currentProductId) {

    toast(
      "Please select a product first."
    );

    return;

  }


  addToCart(
    currentProductId
  );

}


/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeQty(
  id,
  amount
) {

  const item =
    cart.find(
      function(cartItem) {

        return (
          Number(cartItem.id) ===
          Number(id)
        );

      }
    );


  if (!item) {
    return;
  }


  item.qty =
    Number(item.qty || 0) +
    Number(amount || 0);


  if (item.qty <= 0) {

    cart =
      cart.filter(
        function(cartItem) {

          return (
            Number(cartItem.id) !==
            Number(id)
          );

        }
      );

  }


  saveData();

  renderCart();

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

  cart =
    cart.filter(
      function(item) {

        return (
          Number(item.id) !==
          Number(id)
        );

      }
    );


  saveData();

  renderCart();

  toast(
    "Product removed from cart."
  );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

  const list =
    document.getElementById(
      "cartList"
    );


  const summary =
    document.getElementById(
      "cartSummary"
    );


  if (!list || !summary) {
    return;
  }


  /* Remove products that no longer exist */

  cart =
    cart.filter(
      function(item) {

        return !!getProduct(item.id);

      }
    );


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
    cart
      .map(
        function(item) {

          const product =
            getProduct(item.id);


          if (!product) {
            return "";
          }


          const quantity =
            Number(item.qty || 1);


          const itemTotal =
            Number(product.price) *
            quantity;


          return `

            <div class="cart-item">

              <div class="cart-thumb">
                ${imageHTML(product)}
              </div>


              <div>

                <div class="cart-name">
                  ${escapeHtml(product.name)}
                </div>


                <div class="cart-price">
                  ${money(itemTotal)}
                </div>


                <div class="qty-controls">

                  <button
                    onclick="changeQty(${product.id},-1)"
                  >
                    −
                  </button>


                  <strong>
                    ${quantity}
                  </strong>


                  <button
                    onclick="changeQty(${product.id},1)"
                  >
                    +
                  </button>

                </div>


                <button
                  class="remove-btn"
                  onclick="removeFromCart(${product.id})"
                >
                  Remove
                </button>

              </div>


              <button
                class="remove-btn"
                onclick="removeFromCart(${product.id})"
              >
                ✕
              </button>

            </div>

          `;

        }
      )
      .join("");


  const subtotal =
    cart.reduce(
      function(total, item) {

        const product =
          getProduct(item.id);


        if (!product) {
          return total;
        }


        return (
          total +
          Number(product.price) *
          Number(item.qty || 0)
        );

      },
      0
    );


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
   BUY CURRENT PRODUCT
===================================================== */

function buyCurrentProduct() {

  if (!currentProductId) {

    toast(
      "Please select a product first."
    );

    return;

  }


  addToCart(
    currentProductId
  );


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
    cart.filter(
      function(item) {

        return !!getProduct(item.id);

      }
    );


  if (!validCart.length) {

    toast(
      "No valid products in cart."
    );

    return;

  }


  /* =================================================
     CREATE ORDER ITEMS
     IMPORTANT:
     SAVE PRODUCT SNAPSHOT
     FOR SELLER HISTORY
  ================================================= */

  const orderItems =
    validCart.map(
      function(item) {

        const product =
          getProduct(item.id);


        return {

          id:
            Number(product.id),

          qty:
            Number(item.qty || 1),

          name:
            product.name,

          category:
            product.category,

          price:
            Number(product.price) || 0,

          emoji:
            product.emoji || "📦",

          image:
            product.image || "",

          sellerProduct:
            !!product.sellerProduct

        };

      }
    );


  const subtotal =
    orderItems.reduce(
      function(total, item) {

        return (
          total +
          Number(item.price) *
          Number(item.qty || 0)
        );

      },
      0
    );


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
      orderItems,

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


  /* EMPTY CART */

  cart = [];


  saveData();


  renderCart();

  renderOrders();

  renderSellerCenter();

  renderSellerOrders();

  renderSellerEarnings();


  toast(
    "Order placed successfully! 📦"
  );


  setTimeout(
    function() {

      showScreen("orders");

    },
    600
  );

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(id) {

  id =
    Number(id);


  const exists =
    wishlist.some(
      function(itemId) {

        return (
          Number(itemId) === id
        );

      }
    );


  if (exists) {

    wishlist =
      wishlist.filter(
        function(itemId) {

          return (
            Number(itemId) !== id
          );

        }
      );


    toast(
      "Removed from wishlist."
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
   RENDER WISHLIST
===================================================== */

function renderWishlist() {

  const box =
    document.getElementById(
      "wishlistList"
    );


  if (!box) {
    return;
  }


  wishlist =
    wishlist.filter(
      function(id) {

        return !!getProduct(id);

      }
    );


  const saved =
    wishlist
      .map(
        function(id) {

          return getProduct(id);

        }
      )
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
   CUSTOMER ORDERS
===================================================== */

function renderOrders() {

  const box =
    document.getElementById(
      "ordersList"
    );


  if (!box) {
    return;
  }


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
    orders
      .map(
        function(order) {

          const count =
            (order.items || [])
              .reduce(
                function(total, item) {

                  return (
                    total +
                    Number(item.qty || 0)
                  );

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
                  order.status ||
                  "Order Placed"
                )}

              </div>

            </div>

          `;

        }
      )
      .join("");

}


/* =====================================================
   ACCOUNT
===================================================== */

function renderAccount() {

  const box =
    document.getElementById(
      "accountContent"
    );


  if (!box) {
    return;
  }


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
   ACCOUNT + REAL LOGIN / SIGNUP
===================================================== */

/*
   IMPORTANT:
   GitHub Pages frontend cannot run server.js itself.

   When your Express backend is deployed, put its URL here.

   Example:
   const BISMI_API_URL =
     "https://bismimart-backend.onrender.com";

   For now it is empty so the frontend will clearly
   tell us that the backend URL still needs to be connected.
*/

const BISMI_API_URL = "";


/* =====================================================
   CURRENT USER
===================================================== */

let currentUser =
  readStorage(
    "bismiCurrentUser",
    null
  );


/* =====================================================
   AUTH TOKEN
===================================================== */

function getAuthToken() {

  try {

    return localStorage.getItem(
      "bismiAuthToken"
    ) || "";

  } catch (error) {

    return "";

  }

}


/* =====================================================
   SAVE AUTH SESSION
===================================================== */

function saveAuthSession(
  token,
  user
) {

  try {

    if (token) {

      localStorage.setItem(
        "bismiAuthToken",
        token
      );

    }

    if (user) {

      currentUser =
        user;

      localStorage.setItem(
        "bismiCurrentUser",
        JSON.stringify(user)
      );

    }

  } catch (error) {

    console.warn(
      "Auth session save error:",
      error
    );

  }

}


/* =====================================================
   CLEAR AUTH SESSION
===================================================== */

function clearAuthSession() {

  currentUser = null;

  try {

    localStorage.removeItem(
      "bismiAuthToken"
    );

    localStorage.removeItem(
      "bismiCurrentUser"
    );

  } catch (error) {

    console.warn(
      "Auth session clear error:",
      error
    );

  }

}


/* =====================================================
   ACCOUNT
===================================================== */

function renderAccount() {

  const box =
    document.getElementById(
      "accountContent"
    );


  if (!box) {
    return;
  }


  /*
     LOGGED-IN USER
  */

  if (currentUser) {

    renderLoggedInAccount();

    return;

  }


  /*
     LOGGED-OUT USER
  */

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
   LOGGED-IN ACCOUNT
===================================================== */

function renderLoggedInAccount() {

  const box =
    document.getElementById(
      "accountContent"
    );


  if (!box) {
    return;
  }


  const name =
    escapeHtml(
      currentUser?.name ||
      "BismiMart User"
    );


  const mobile =
    escapeHtml(
      currentUser?.mobile ||
      ""
    );


  const email =
    escapeHtml(
      currentUser?.email ||
      ""
    );


  box.innerHTML = `

    <div class="account-profile-card">

      <div class="profile-avatar">
        👤
      </div>


      <div class="profile-info">

        <span>
          Welcome back 👋
        </span>

        <h2>
          ${name}
        </h2>

        ${
          mobile
            ? `
              <p>
                📱 ${mobile}
              </p>
            `
            : ""
        }

        ${
          email
            ? `
              <p>
                ✉️ ${email}
              </p>
            `
            : ""
        }

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


    <button
      class="logout-btn"
      onclick="logoutUser()"
    >
      🚪 Logout
    </button>

  `;

}


/* =====================================================
   REAL LOGIN SCREEN
===================================================== */

function loginDemo() {

  const box =
    document.getElementById(
      "accountContent"
    );


  if (!box) {
    return;
  }


  box.innerHTML = `

    <div class="auth-card">

      <button
        type="button"
        class="auth-back"
        onclick="renderAccount()"
      >
        ← Back
      </button>


      <div class="auth-icon">
        🔐
      </div>


      <h2>
        Login to BismiMart
      </h2>


      <p class="auth-subtitle">
        Login with your mobile number
        or email address.
      </p>


      <form
        class="auth-form"
        onsubmit="submitLogin(event)"
      >

        <label>
          Email or Mobile Number
        </label>


        <input
          id="loginIdentifier"
          type="text"
          placeholder="03XXXXXXXXX or email"
          autocomplete="username"
          required
        >


        <label>
          Password
        </label>


        <input
          id="loginPassword"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          minlength="6"
          required
        >


        <button
          type="submit"
          class="primary-btn auth-submit"
          id="loginSubmitButton"
        >
          🔐 Login
        </button>

      </form>


      <div class="auth-switch">

        Don't have an account?

        <button
          type="button"
          onclick="signupDemo()"
        >
          Create Account
        </button>

      </div>

    </div>

  `;


  const input =
    document.getElementById(
      "loginIdentifier"
    );


  if (input) {

    setTimeout(
      function() {

        input.focus();

      },
      100
    );

  }

}


/* =====================================================
   REAL CREATE ACCOUNT SCREEN
===================================================== */

function signupDemo() {

  const box =
    document.getElementById(
      "accountContent"
    );


  if (!box) {
    return;
  }


  box.innerHTML = `

    <div class="auth-card">

      <button
        type="button"
        class="auth-back"
        onclick="renderAccount()"
      >
        ← Back
      </button>


      <div class="auth-icon">
        ✨
      </div>


      <h2>
        Create BismiMart Account
      </h2>


      <p class="auth-subtitle">
        Create your account to start
        shopping on BismiMart.
      </p>


      <form
        class="auth-form"
        onsubmit="submitSignup(event)"
      >

        <label>
          Full Name
        </label>


        <input
          id="signupName"
          type="text"
          placeholder="Enter your full name"
          autocomplete="name"
          minlength="2"
          required
        >


        <label>
          Mobile Number
        </label>


        <input
          id="signupMobile"
          type="tel"
          placeholder="03XXXXXXXXX"
          autocomplete="tel"
          required
        >


        <label>
          Email
          <span class="optional">
            (Optional)
          </span>
        </label>


        <input
          id="signupEmail"
          type="email"
          placeholder="example@email.com"
          autocomplete="email"
        >


        <label>
          Password
        </label>


        <input
          id="signupPassword"
          type="password"
          placeholder="Minimum 6 characters"
          autocomplete="new-password"
          minlength="6"
          required
        >


        <label>
          Confirm Password
        </label>


        <input
          id="signupConfirmPassword"
          type="password"
          placeholder="Re-enter password"
          autocomplete="new-password"
          minlength="6"
          required
        >


        <button
          type="submit"
          class="primary-btn auth-submit"
          id="signupSubmitButton"
        >
          ✨ Create Account
        </button>

      </form>


      <div class="auth-switch">

        Already have an account?

        <button
          type="button"
          onclick="loginDemo()"
        >
          Login
        </button>

      </div>

    </div>

  `;


  const input =
    document.getElementById(
      "signupName"
    );


  if (input) {

    setTimeout(
      function() {

        input.focus();

      },
      100
    );

  }

}


/* =====================================================
   REAL LOGIN REQUEST
===================================================== */

async function submitLogin(event) {

  event.preventDefault();


  const identifier =
    document.getElementById(
      "loginIdentifier"
    )?.value.trim();


  const password =
    document.getElementById(
      "loginPassword"
    )?.value || "";


  const button =
    document.getElementById(
      "loginSubmitButton"
    );


  if (
    !identifier ||
    !password
  ) {

    toast(
      "Please fill all fields."
    );

    return;

  }


  /*
     BACKEND URL CHECK
  */

  if (!BISMI_API_URL) {

    toast(
      "Backend is not connected yet."
    );

    return;

  }


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Logging in...";

  }


  try {

    const response =
      await fetch(
        BISMI_API_URL +
        "/api/login",
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          credentials:
            "include",

          body:
            JSON.stringify({

              identifier:
                identifier,

              password:
                password

            })

        }
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.message ||
        "Login failed."
      );

    }


    saveAuthSession(
      data.token,
      data.user
    );


    toast(
      "Login successful! 👋"
    );


    renderAccount();


  } catch (error) {

    console.error(
      "Login error:",
      error
    );


    toast(
      error.message ||
      "Unable to login."
    );


    if (button) {

      button.disabled =
        false;

      button.textContent =
        "🔐 Login";

    }

  }

}


/* =====================================================
   REAL SIGNUP REQUEST
===================================================== */

async function submitSignup(event) {

  event.preventDefault();


  const name =
    document.getElementById(
      "signupName"
    )?.value.trim();


  const mobile =
    document.getElementById(
      "signupMobile"
    )?.value.trim();


  const email =
    document.getElementById(
      "signupEmail"
    )?.value.trim();


  const password =
    document.getElementById(
      "signupPassword"
    )?.value || "";


  const confirmPassword =
    document.getElementById(
      "signupConfirmPassword"
    )?.value || "";


  const button =
    document.getElementById(
      "signupSubmitButton"
    );


  if (
    !name ||
    !mobile ||
    !password ||
    !confirmPassword
  ) {

    toast(
      "Please fill all required fields."
    );

    return;

  }


  if (
    name.length < 2
  ) {

    toast(
      "Name must contain at least 2 characters."
    );

    return;

  }


  if (
    password.length < 6
  ) {

    toast(
      "Password must be at least 6 characters."
    );

    return;

  }


  if (
    password !==
    confirmPassword
  ) {

    toast(
      "Passwords do not match."
    );

    return;

  }


  if (!BISMI_API_URL) {

    toast(
      "Backend is not connected yet."
    );

    return;

  }


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Creating Account...";

  }


  try {

    const response =
      await fetch(
        BISMI_API_URL +
        "/api/signup",
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          credentials:
            "include",

          body:
            JSON.stringify({

              name:
                name,

              mobile:
                mobile,

              email:
                email,

              password:
                password

            })

        }
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.message ||
        "Unable to create account."
      );

    }


    saveAuthSession(
      data.token,
      data.user
    );


    toast(
      "Account created successfully! 🎉"
    );


    renderAccount();


  } catch (error) {

    console.error(
      "Signup error:",
      error
    );


    toast(
      error.message ||
      "Unable to create account."
    );


    if (button) {

      button.disabled =
        false;

      button.textContent =
        "✨ Create Account";

    }

  }

}


/* =====================================================
   LOGOUT
===================================================== */

async function logoutUser() {

  const token =
    getAuthToken();


  /*
     Tell backend to destroy session.
  */

  if (
    BISMI_API_URL &&
    token
  ) {

    try {

      await fetch(
        BISMI_API_URL +
        "/api/logout",
        {

          method:
            "POST",

          headers: {

            "Authorization":
              "Bearer " + token

          },

          credentials:
            "include"

        }
      );

    } catch (error) {

      console.warn(
        "Logout request failed:",
        error
      );

    }

  }


  clearAuthSession();


  renderAccount();


  toast(
    "You have been logged out."
  );

}


/* =====================================================
   CHECK SAVED LOGIN
===================================================== */

async function checkSavedLogin() {

  const token =
    getAuthToken();


  if (
    !token ||
    !BISMI_API_URL
  ) {

    return;

  }


  try {

    const response =
      await fetch(
        BISMI_API_URL +
        "/api/me",
        {

          method:
            "GET",

          headers: {

            "Authorization":
              "Bearer " + token

          },

          credentials:
            "include"

        }
      );


    const data =
      await response.json();


    if (
      response.ok &&
      data.success &&
      data.user
    ) {

      currentUser =
        data.user;


      localStorage.setItem(
        "bismiCurrentUser",
        JSON.stringify(
          data.user
        )
      );


      renderAccount();

    } else {

      clearAuthSession();

      renderAccount();

    }

  } catch (error) {

    console.warn(
      "Session check failed:",
      error
    );

  }

}


/* =====================================================
   AUTH INITIALIZATION
===================================================== */

checkSavedLogin();


/* =====================================================
   SELLER CENTER
===================================================== */

function sellerCenter() {

  closeSellerPanels();

  showScreen(
    "sellerCenter"
  );

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


  panels.forEach(
    function(id) {

      const panel =
        document.getElementById(id);


      if (panel) {

        panel.style.display =
          "none";

      }

    }
  );

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

    setTimeout(
      function() {

        name.focus();

      },
      100
    );

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
    categoryInput.value.trim();


  const price =
    Number(
      priceInput.value
    );


  const oldPrice =
    Number(
      oldPriceInput.value
    );


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

    nameInput.focus();

    return;

  }


  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {

    toast(
      "Please enter a valid price."
    );

    priceInput.focus();

    return;

  }


  if (
    oldPrice &&
    oldPrice < price
  ) {

    toast(
      "Old price should be higher than selling price."
    );

    oldPriceInput.focus();

    return;

  }


  /* =================================================
     UNIQUE ID
  ================================================= */

  let newId =
    Date.now();


  while (
    products.some(
      function(product) {

        return (
          Number(product.id) ===
          Number(newId)
        );

      }
    )
  ) {

    newId++;

  }


  /* =================================================
     NEW SELLER PRODUCT
  ================================================= */

  const newProduct = {

    id:
      newId,

    name:
      name,

    category:
      category || "Other",

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


  /* =================================================
     SAVE TO SELLER PRODUCTS
  ================================================= */

  sellerProducts.push(
    newProduct
  );


  writeStorage(
    "bismiSellerProducts",
    sellerProducts
  );


  /* =================================================
     REBUILD SHOP
  ================================================= */

  rebuildProducts();


  /* =================================================
     CLEAR FORM
  ================================================= */

  nameInput.value = "";

  priceInput.value = "";

  oldPriceInput.value = "";

  emojiInput.value = "";

  descriptionInput.value = "";


  /* =================================================
     REFRESH UI
  ================================================= */

  renderHomeProducts();

  renderProducts(products);

  renderSellerCenter();

  renderSellerProducts();


  /* =================================================
     OPEN MY PRODUCTS
  ================================================= */

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


  if (!box) {
    return;
  }


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
      .map(
        function(product) {

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
                  ${escapeHtml(
                    product.category || "Other"
                  )}
                </small>


                <b>
                  ${money(product.price)}
                </b>

              </div>


              <button
                class="remove-btn"
                onclick="deleteSellerProduct(${Number(product.id)})"
              >
                🗑️
              </button>

            </div>

          `;

        }
      )
      .join("");

}


/* =====================================================
   DELETE SELLER PRODUCT
===================================================== */

function deleteSellerProduct(id) {

  id =
    Number(id);


  const product =
    getSellerProduct(id);


  if (!product) {

    toast(
      "Product not found."
    );

    return;

  }


  /* REMOVE FROM SELLER LIST */

  sellerProducts =
    sellerProducts.filter(
      function(item) {

        return (
          Number(item.id) !== id
        );

      }
    );


  /* SAVE SELLER PRODUCTS */

  writeStorage(
    "bismiSellerProducts",
    sellerProducts
  );


  /* REBUILD SHOP */

  rebuildProducts();


  /* REMOVE FROM CART */

  cart =
    cart.filter(
      function(item) {

        return (
          Number(item.id) !== id
        );

      }
    );


  /* REMOVE FROM WISHLIST */

  wishlist =
    wishlist.filter(
      function(itemId) {

        return (
          Number(itemId) !== id
        );

      }
    );


  saveData();


  renderSellerProducts();

  renderSellerCenter();

  renderHomeProducts();

  renderProducts(products);

  renderCart();

  renderWishlist();

  renderOrders();


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
   CHECK WHETHER ORDER ITEM IS SELLER ITEM
===================================================== */

function isSellerOrderItem(item) {

  if (!item) {
    return false;
  }


  /* New orders have sellerProduct snapshot */

  if (
    item.sellerProduct === true
  ) {

    return true;

  }


  /* Existing orders from old version */

  return !!getSellerProduct(
    item.id
  );

}


/* =====================================================
   GET SELLER ITEMS FROM ORDER
===================================================== */

function getSellerItemsFromOrder(order) {

  if (
    !order ||
    !Array.isArray(order.items)
  ) {

    return [];

  }


  return order.items.filter(
    function(item) {

      return isSellerOrderItem(item);

    }
  );

}


/* =====================================================
   GET SELLER ORDERS
===================================================== */

function getSellerOrders() {

  return orders.filter(
    function(order) {

      return (
        getSellerItemsFromOrder(order)
          .length > 0
      );

    }
  );

}


/* =====================================================
   CALCULATE SELLER ORDER TOTAL
===================================================== */

function calculateSellerOrderTotal(order) {

  const sellerItems =
    getSellerItemsFromOrder(order);


  return sellerItems.reduce(
    function(total, item) {

      const quantity =
        Number(item.qty || 0);


      const price =
        Number(item.price || 0);


      return (
        total +
        price * quantity
      );

    },
    0
  );

}


/* =====================================================
   RENDER SELLER ORDERS
===================================================== */

function renderSellerOrders() {

  const box =
    document.getElementById(
      "sellerOrdersList"
    );


  if (!box) {
    return;
  }


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
      .map(
        function(order) {

          const sellerItems =
            getSellerItemsFromOrder(
              order
            );


          const sellerTotal =
            calculateSellerOrderTotal(
              order
            );


          const itemCount =
            sellerItems.reduce(
              function(total, item) {

                return (
                  total +
                  Number(item.qty || 0)
                );

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

                  ${itemCount} item(s)

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

        }
      )
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


  sellerOrders.forEach(
    function(order) {

      totalSales +=
        calculateSellerOrderTotal(
          order
        );

    }
  );


  /* =================================================
     BISMI MART COMMISSION = 10%
  ================================================= */

  const commission =
    totalSales * 0.10;


  /* =================================================
     SELLER GETS = 90%
  ================================================= */

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
    document.getElementById(
      "toast"
    );


  if (!box) {
    return;
  }


  clearTimeout(
    toastTimer
  );


  box.textContent =
    message;


  box.classList.add(
    "show"
  );


  toastTimer =
    setTimeout(
      function() {

        box.classList.remove(
          "show"
        );

      },
      2200
    );

}


/* =====================================================
   STORAGE SYNC
   Works when another tab/window changes data
===================================================== */

window.addEventListener(
  "storage",
  function(event) {

    if (
      event.key === "bismiCart"
    ) {

      cart =
        readStorage(
          "bismiCart",
          []
        );

    }


    if (
      event.key === "bismiWishlist"
    ) {

      wishlist =
        readStorage(
          "bismiWishlist",
          []
        );

    }


    if (
      event.key === "bismiOrders"
    ) {

      orders =
        readStorage(
          "bismiOrders",
          []
        );

    }


    if (
      event.key ===
      "bismiSellerProducts"
    ) {

      sellerProducts =
        readStorage(
          "bismiSellerProducts",
          []
        );

    }


    rebuildProducts();


    renderHomeProducts();

    renderProducts(products);

    renderCart();

    renderWishlist();

    renderOrders();

    renderSellerCenter();

    renderSellerProducts();

    renderSellerOrders();

    renderSellerEarnings();

    updateBadges();

  }
);


/* =====================================================
   PAGE VISIBILITY SYNC
   Useful after returning to app/tab
===================================================== */

document.addEventListener(
  "visibilitychange",
  function() {

    if (
      document.visibilityState ===
      "visible"
    ) {

      cart =
        readStorage(
          "bismiCart",
          []
        );


      wishlist =
        readStorage(
          "bismiWishlist",
          []
        );


      orders =
        readStorage(
          "bismiOrders",
          []
        );


      sellerProducts =
        readStorage(
          "bismiSellerProducts",
          []
        );


      rebuildProducts();


      renderHomeProducts();

      renderProducts(products);

      renderCart();

      renderWishlist();

      renderOrders();

      renderSellerCenter();

      updateBadges();

    }

  }
);


/* =====================================================
   SAFETY INITIALIZATION
===================================================== */

if (
  document.readyState ===
    "interactive" ||
  document.readyState ===
    "complete"
) {

  setTimeout(
    function() {

      initializeApp();

    },
    0
  );

}
