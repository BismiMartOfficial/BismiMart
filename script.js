/* =====================================================
   BISMI MART
   COMPLETE CORRECTED SCRIPT
   Seller + Customer Marketplace
===================================================== */


/* =====================================================
   PRODUCTS
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
   SELLER PRODUCTS
===================================================== */

/*
   Seller products are saved separately in localStorage.
   On every page load they are automatically restored
   into the main products array.
*/

let sellerProducts =
  JSON.parse(
    localStorage.getItem("bismiSellerProducts") || "[]"
  );


/* =====================================================
   RESTORE SELLER PRODUCTS
===================================================== */

function restoreSellerProducts() {

  sellerProducts.forEach(function(sellerProduct) {

    const exists =
      products.some(function(product) {

        return product.id === Number(sellerProduct.id);

      });

    if(!exists) {

      products.push({
        id: Number(sellerProduct.id),
        name: sellerProduct.name,
        category: sellerProduct.category,
        price: Number(sellerProduct.price),
        oldPrice: Number(sellerProduct.oldPrice),
        rating: Number(sellerProduct.rating) || 4.5,
        emoji: sellerProduct.emoji || "📦",
        image: sellerProduct.image || "",
        description:
          sellerProduct.description ||
          "Quality product available at BismiMart."
      });

    }

  });

}


/*
   IMPORTANT:
   Restore seller products BEFORE rendering anything.
*/

restoreSellerProducts();


/* =====================================================
   CUSTOMER DATA
===================================================== */

let cart =
  JSON.parse(
    localStorage.getItem("bismiCart") || "[]"
  );

let wishlist =
  JSON.parse(
    localStorage.getItem("bismiWishlist") || "[]"
  );

let orders =
  JSON.parse(
    localStorage.getItem("bismiOrders") || "[]"
  );


/* =====================================================
   CURRENT PRODUCT
===================================================== */

let currentProductId = null;

let toastTimer = null;


/* =====================================================
   START APP
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderHomeProducts();

    renderProducts(products);

    renderCart();

    renderWishlist();

    renderOrders();

    renderAccount();

    updateBadges();

    showScreen("home", false);

  }
);


/* =====================================================
   SAVE CUSTOMER DATA
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

  updateBadges();

}


/* =====================================================
   SAVE SELLER PRODUCTS
===================================================== */

function saveSellerProducts() {

  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );

}


/* =====================================================
   MONEY FORMAT
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

  return products.find(
    function(product) {

      return product.id === Number(id);

    }
  );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

  return String(text || "").replace(
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

  if(product.image) {

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
        ${escapeHtml(product.emoji)}
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
      ${escapeHtml(product.emoji)}
    </span>

  `;

}


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(screen, scroll = true) {

  const target =
    document.getElementById(screen);

  if(!target) return;


  document
    .querySelectorAll(".screen")
    .forEach(function(section) {

      section.classList.remove("active");

    });


  target.classList.add("active");


  /*
     Bottom navigation
  */

  document
    .querySelectorAll(".nav-btn")
    .forEach(function(button) {

      button.classList.toggle(
        "active",
        button.dataset.screen === screen
      );

    });


  /*
     Refresh dynamic screens
  */

  if(screen === "cart") {

    renderCart();

  }


  if(screen === "wishlist") {

    renderWishlist();

  }


  if(screen === "orders") {

    renderOrders();

  }


  if(screen === "account") {

    renderAccount();

  }


  if(screen === "sellerCenter") {

    renderSellerCenter();

  }


  if(scroll) {

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


  if(cartBadge) {

    cartBadge.textContent =
      cartCount;

  }


  if(wishBadge) {

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

  if(!box) return;


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

  if(!box) return;


  if(!list || !list.length) {

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
            toggleWishlist(${product.id});
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

          ⭐ ${product.rating}

        </div>


        <div class="price-row">

          <span class="price">

            ${money(product.price)}

          </span>


          ${
            Number(product.oldPrice) >
            Number(product.price)
              ?

            `
            <span class="old-price">

              ${money(product.oldPrice)}

            </span>
            `

              :

            ""
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

  if(!product) {

    toast("Product not found.");

    return;

  }


  currentProductId =
    product.id;


  const image =
    document.getElementById("detailImage");


  if(image) {

    image.innerHTML =
      product.image

        ?

        `

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
          ${escapeHtml(product.emoji)}
        </span>

        `

        :

        `

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
          ${escapeHtml(product.emoji)}
        </span>

        `;

  }


  const name =
    document.getElementById("detailName");

  if(name)
    name.textContent =
      product.name;


  const price =
    document.getElementById("detailPrice");

  if(price)
    price.textContent =
      money(product.price);


  const oldPrice =
    document.getElementById("detailOldPrice");

  if(oldPrice) {

    if(
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

  if(rating)
    rating.textContent =
      "⭐⭐⭐⭐⭐ " +
      product.rating;


  const description =
    document.querySelector(
      ".detail-description"
    );


  if(description)
    description.textContent =
      product.description;


  showScreen("detail");

}


/* =====================================================
   CATEGORY
===================================================== */

function openCategory(category) {

  const filtered =
    products.filter(
      function(product) {

        return (
          String(product.category)
            .toLowerCase() ===
          String(category)
            .toLowerCase()
        );

      }
    );


  const title =
    document.getElementById(
      "productsTitle"
    );


  if(title)
    title.textContent =
      category;


  renderProducts(filtered);

  showScreen("products");

}


/* =====================================================
   SEARCH ENTER
===================================================== */

function searchKey(event) {

  if(event.key === "Enter") {

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


  if(!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if(!query) {

    const title =
      document.getElementById(
        "productsTitle"
      );


    if(title)
      title.textContent =
        "All Products";


    renderProducts(products);

    showScreen("products");

    return;

  }


  const results =
    products.filter(
      function(product) {

        const name =
          String(product.name)
            .toLowerCase();

        const category =
          String(product.category)
            .toLowerCase();

        const description =
          String(product.description || "")
            .toLowerCase();


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


  if(title)
    title.textContent =
      "Search: " +
      input.value.trim();


  renderProducts(results);

  showScreen("products");


  if(!results.length) {

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

  if(!product) {

    toast("Product not found.");

    return;

  }


  qty =
    Number(qty);


  if(!Number.isFinite(qty) || qty <= 0) {

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


  if(existing) {

    existing.qty =
      Number(existing.qty || 0) +
      qty;

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
   ADD CURRENT PRODUCT
===================================================== */

function addCurrentProduct() {

  if(!currentProductId) {

    toast("Please select a product.");

    return;

  }


  addToCart(
    currentProductId
  );

}


/* =====================================================
   CHANGE CART QTY
===================================================== */

function changeQty(id, amount) {

  const item =
    cart.find(
      function(cartItem) {

        return (
          Number(cartItem.id) ===
          Number(id)
        );

      }
    );


  if(!item) return;


  item.qty =
    Number(item.qty || 0) +
    Number(amount);


  if(item.qty <= 0) {

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
   REMOVE CART PRODUCT
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
    "Product removed from cart"
  );

}


/* =====================================================
   CART TOTAL
===================================================== */

function getCartTotals() {

  let subtotal = 0;


  cart.forEach(
    function(item) {

      const product =
        getProduct(item.id);


      if(product) {

        subtotal +=
          Number(product.price) *
          Number(item.qty || 0);

      }

    }
  );


  const delivery =
    subtotal >= 3000
      ? 0
      : subtotal > 0
        ? 199
        : 0;


  const total =
    subtotal + delivery;


  return {

    subtotal: subtotal,

    delivery: delivery,

    total: total

  };

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


  if(!list || !summary) return;


  /*
     Remove invalid cart products
  */

  cart =
    cart.filter(
      function(item) {

        return (
          getProduct(item.id) &&
          Number(item.qty) > 0
        );

      }
    );


  if(!cart.length) {

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

          if(!product)
            return "";


          const itemTotal =
            Number(product.price) *
            Number(item.qty);


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

                    ${item.qty}

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


  const totals =
    getCartTotals();


  summary.innerHTML = `

    <div class="cart-summary">


      <div class="summary-row">

        <span>
          Subtotal
        </span>

        <strong>
          ${money(totals.subtotal)}
        </strong>

      </div>


      <div class="summary-row">

        <span>
          Delivery
        </span>

        <strong>

          ${
            totals.delivery === 0
              ? "FREE"
              : money(totals.delivery)
          }

        </strong>

      </div>


      <div
        class="summary-row summary-total"
      >

        <span>
          Total
        </span>

        <strong>
          ${money(totals.total)}
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

  if(!currentProductId) {

    toast("Please select a product.");

    return;

  }


  /*
     Add product to cart.
  */

  addToCart(
    currentProductId
  );


  /*
     Open cart.
  */

  showScreen("cart");

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

  if(!cart.length) {

    toast(
      "Your cart is empty."
    );

    return;

  }


  const totals =
    getCartTotals();


  /*
     Create order.
  */

  const order = {

    id:
      "BM" +
      Date.now()
        .toString()
        .slice(-8),

    date:
      new Date().toLocaleString(),

    items:
      cart.map(
        function(item) {

          return {

            id:
              Number(item.id),

            qty:
              Number(item.qty)

          };

        }
      ),

    total:
      totals.total,

    status:
      "Order Placed"

  };


  orders.unshift(order);


  /*
     Empty cart.
  */

  cart = [];


  saveData();

  renderCart();

  renderOrders();

  renderSellerCenter();


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
   WISHLIST TOGGLE
===================================================== */

function toggleWishlist(id) {

  id =
    Number(id);


  if(wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        function(productId) {

          return productId !== id;

        }
      );


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

  renderProducts(
    products
  );

  renderWishlist();

}


/* =====================================================
   WISHLIST SCREEN
===================================================== */

function renderWishlist() {

  const box =
    document.getElementById(
      "wishlistList"
    );

  if(!box) return;


  const saved =
    wishlist
      .map(
        function(id) {

          return getProduct(id);

        }
      )
      .filter(Boolean);


  if(!saved.length) {

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
    document.getElementById(
      "ordersList"
    );

  if(!box) return;


  if(!orders.length) {

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


                <p
                  style="margin-top:7px"
                >

                  ${count} item(s)

                  •

                  ${money(order.total)}

                </p>


              </div>


              <div class="order-status">

                ${escapeHtml(order.status)}

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

  if(!box) return;


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
          flex-wrap:wrap;
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
   LOGIN
===================================================== */

function loginDemo() {

  toast(
    "Login screen is ready for backend connection."
  );

}


/* =====================================================
   SIGN UP
===================================================== */

function signupDemo() {

  toast(
    "Create Account is ready for backend connection."
  );

}


/* =====================================================
   TOAST
===================================================== */

function toast(message) {

  const box =
    document.getElementById(
      "toast"
    );

  if(!box) return;


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
   SELLER CENTER OPEN
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


  if(productCount) {

    productCount.textContent =
      sellerProducts.length;

  }


  const sellerOrders =
    getSellerOrders();


  if(orderCount) {

    orderCount.textContent =
      sellerOrders.length;

  }


  const data =
    calculateSellerEarnings();


  if(earnings) {

    earnings.textContent =
      money(data.net);

  }

}


/* =====================================================
   CLOSE ALL SELLER PANELS
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


      if(panel) {

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


  if(panel) {

    panel.style.display =
      "block";

  }


  const name =
    document.getElementById(
      "sellerProductName"
    );


  if(name) {

    name.focus();

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


  if(
    !nameInput ||
    !categoryInput ||
    !priceInput ||
    !oldPriceInput ||
    !emojiInput ||
    !descriptionInput
  ) {

    toast(
      "Seller form is not available."
    );

    return;

  }


  const name =
    nameInput.value.trim();


  const category =
    categoryInput.value;


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


  /* =================================================
     VALIDATION
  ================================================= */


  if(!name) {

    toast(
      "Please enter product name."
    );

    return;

  }


  if(
    !Number.isFinite(price) ||
    price <= 0
  ) {

    toast(
      "Please enter a valid price."
    );

    return;

  }


  if(
    oldPrice &&
    oldPrice < price
  ) {

    toast(
      "Old price should be higher than selling price."
    );

    return;

  }


  /*
     Generate unique seller product ID.
  */

  const newId =
    Date.now();


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
      oldPrice > 0
        ? oldPrice
        : price,

    rating:
      4.5,

    emoji:
      emoji,

    image:
      "",

    description:
      description ||
      "Quality product available at BismiMart."

  };


  /* =================================================
     SAVE SELLER PRODUCT
  ================================================= */


  sellerProducts.push(
    newProduct
  );


  saveSellerProducts();


  /*
     Add to current main product list.
  */

  products.push(
    newProduct
  );


  /* =================================================
     CLEAR FORM
  ================================================= */


  nameInput.value = "";

  priceInput.value = "";

  oldPriceInput.value = "";

  emojiInput.value = "";

  descriptionInput.value = "";


  /* =================================================
     REFRESH EVERYTHING
  ================================================= */


  renderHomeProducts();

  renderProducts(products);

  renderSellerCenter();

  showSellerProducts();


  toast(
    "Product added successfully! 📦"
  );

}


/* =====================================================
   SHOW SELLER PRODUCTS
===================================================== */

function showSellerProducts() {

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerProductsPanel"
    );


  if(panel) {

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

  if(!box) return;


  if(!sellerProducts.length) {

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

                ${escapeHtml(product.emoji)}

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
    sellerProducts.find(
      function(item) {

        return (
          Number(item.id) === id
        );

      }
    );


  if(!product) {

    toast(
      "Product not found."
    );

    return;

  }


  /*
     Remove from seller products.
  */

  sellerProducts =
    sellerProducts.filter(
      function(item) {

        return (
          Number(item.id) !== id
        );

      }
    );


  saveSellerProducts();


  /*
     Remove from main products.
  */

  for(
    let i = products.length - 1;
    i >= 0;
    i--
  ) {

    if(
      Number(products[i].id) === id
    ) {

      products.splice(i, 1);

    }

  }


  /*
     Remove from wishlist.
  */

  wishlist =
    wishlist.filter(
      function(productId) {

        return (
          Number(productId) !== id
        );

      }
    );


  /*
     Remove from cart.
  */

  cart =
    cart.filter(
      function(item) {

        return (
          Number(item.id) !== id
        );

      }
    );


  saveData();


  renderSellerProducts();

  renderSellerCenter();

  renderHomeProducts();

  renderProducts(products);

  renderWishlist();

  renderCart();


  toast(
    "Product removed."
  );

}


/* =====================================================
   GET SELLER ORDERS
===================================================== */

function getSellerOrders() {

  if(!sellerProducts.length) {

    return [];

  }


  const sellerProductIds =
    sellerProducts.map(
      function(product) {

        return Number(product.id);

      }
    );


  return orders.filter(
    function(order) {

      return (
        Array.isArray(order.items) &&
        order.items.some(
          function(item) {

            return sellerProductIds.includes(
              Number(item.id)
            );

          }
        )
      );

    }
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


  if(panel) {

    panel.style.display =
      "block";

  }


  renderSellerOrders();

}


/* =====================================================
   RENDER SELLER ORDERS
===================================================== */

function renderSellerOrders() {

  const box =
    document.getElementById(
      "sellerOrdersList"
    );


  if(!box) return;


  const sellerOrders =
    getSellerOrders();


  if(!sellerOrders.length) {

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

          /*
             Only this seller's products
             are included.
          */

          const sellerItems =
            order.items.filter(
              function(item) {

                return sellerProducts.some(
                  function(product) {

                    return (
                      Number(product.id) ===
                      Number(item.id)
                    );

                  }
                );

              }
            );


          let sellerTotal =
            0;


          sellerItems.forEach(
            function(item) {

              const product =
                sellerProducts.find(
                  function(product) {

                    return (
                      Number(product.id) ===
                      Number(item.id)
                    );

                  }
                );


              if(product) {

                sellerTotal +=
                  Number(product.price) *
                  Number(item.qty || 0);

              }

            }
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


                <p
                  style="
                    margin-top:7px
                  "
                >

                  ${itemCount}
                  seller item(s)

                  •

                  ${money(sellerTotal)}

                </p>


              </div>


              <div class="order-status">

                ${escapeHtml(order.status)}

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


  if(panel) {

    panel.style.display =
      "block";

  }


  renderSellerEarnings();

}


/* =====================================================
   CALCULATE SELLER EARNINGS
===================================================== */

function calculateSellerEarnings() {

  let totalSales =
    0;


  const sellerOrders =
    getSellerOrders();


  sellerOrders.forEach(
    function(order) {

      if(
        !Array.isArray(order.items)
      ) {

        return;

      }


      order.items.forEach(
        function(item) {

          const product =
            sellerProducts.find(
              function(sellerProduct) {

                return (
                  Number(sellerProduct.id) ===
                  Number(item.id)
                );

              }
            );


          if(product) {

            totalSales +=
              Number(product.price) *
              Number(item.qty || 0);

          }

        }
      );

    }
  );


  /*
     BismiMart commission = 10%
  */

  const commission =
    totalSales * 0.10;


  /*
     Seller receives 90%.
  */

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


  if(totalSales) {

    totalSales.textContent =
      money(data.sales);

  }


  if(commission) {

    commission.textContent =
      money(data.commission);

  }


  if(net) {

    net.textContent =
      money(data.net);

  }

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


    /*
       Restore seller products after
       storage changes as well.
    */

    restoreSellerProducts();


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
   END BISMI MART SCRIPT
===================================================== */
