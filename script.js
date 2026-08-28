/* =====================================================
   BISMI MART
   FINAL MATCHED SCRIPT
===================================================== */

const products = [

  {
    id:1,
    name:"Vivo Y17s (4GB • 128GB)",
    category:"Mobiles",
    price:32999,
    oldPrice:38999,
    rating:4.6,
    emoji:"📱",
    image:"file_00000000b420821195f2136d2d25828a.png",
    description:"Vivo Y17s smartphone with 4GB RAM and 128GB storage. A practical choice for everyday use."
  },

  {
    id:2,
    name:"Wireless Bluetooth Headphones",
    category:"Electronics",
    price:4499,
    oldPrice:5999,
    rating:4.5,
    emoji:"🎧",
    image:"",
    description:"Comfortable wireless headphones for music, calls and everyday entertainment."
  },

  {
    id:3,
    name:"Premium Casual T-Shirt",
    category:"Fashion",
    price:1499,
    oldPrice:1999,
    rating:4.4,
    emoji:"👕",
    image:"",
    description:"Soft and comfortable casual T-shirt suitable for everyday wear."
  },

  {
    id:4,
    name:"Modern Table Lamp",
    category:"Home",
    price:2499,
    oldPrice:3299,
    rating:4.3,
    emoji:"💡",
    image:"",
    description:"Simple modern table lamp for bedrooms, study areas and workspaces."
  },

  {
    id:5,
    name:"Beauty Care Set",
    category:"Beauty",
    price:1999,
    oldPrice:2699,
    rating:4.5,
    emoji:"💄",
    image:"",
    description:"Everyday beauty and personal-care essentials in one convenient set."
  },

  {
    id:6,
    name:"Daily Grocery Pack",
    category:"Grocery",
    price:1799,
    oldPrice:2199,
    rating:4.2,
    emoji:"🛒",
    image:"",
    description:"Useful daily grocery essentials for your home."
  },

  {
    id:7,
    name:"Football Training Ball",
    category:"Sports",
    price:1899,
    oldPrice:2399,
    rating:4.4,
    emoji:"⚽",
    image:"",
    description:"Durable football for training, practice and recreational play."
  },

  {
    id:8,
    name:"Kids Teddy Bear",
    category:"Kids",
    price:1299,
    oldPrice:1799,
    rating:4.6,
    emoji:"🧸",
    image:"",
    description:"Soft and cuddly teddy bear for kids."
  }

];

/* DATA */

let cart =
  JSON.parse(localStorage.getItem("bismiCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("bismiWishlist")) || [];

let orders =
  JSON.parse(localStorage.getItem("bismiOrders")) || [];

let currentProductId = null;
let toastTimer = null;


/* START */

document.addEventListener("DOMContentLoaded",function(){

  renderHomeProducts();

  renderProducts(products);

  renderCart();

  renderWishlist();

  renderOrders();

  renderAccount();

  updateBadges();

  showScreen("home",false);

});


/* SAVE */

function saveData(){

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


/* MONEY */

function money(value){

  return "Rs. " +
    Number(value).toLocaleString("en-PK");

}


/* GET PRODUCT */

function getProduct(id){

  return products.find(
    p => p.id === Number(id)
  );

}


/* HTML SAFE */

function escapeHtml(text){

  return String(text).replace(
    /[&<>"']/g,
    function(c){

      return {
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
      }[c];

    }
  );

}


/* IMAGE */

function imageHTML(product){

  if(product.image){

    return `
      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
        onerror="
          this.style.display='none';
          this.nextElementSibling.style.display='flex';
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
        ${product.emoji}
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
      ${product.emoji}
    </span>
  `;

}


/* SCREEN */

function showScreen(screen,scroll=true){

  const target =
    document.getElementById(screen);

  if(!target)return;

  document
    .querySelectorAll(".screen")
    .forEach(function(s){

      s.classList.remove("active");

    });


  target.classList.add("active");


  document
    .querySelectorAll(".nav-btn")
    .forEach(function(btn){

      btn.classList.toggle(
        "active",
        btn.dataset.screen === screen
      );

    });


  if(screen === "cart")
    renderCart();

  if(screen === "wishlist")
    renderWishlist();

  if(screen === "orders")
    renderOrders();

  if(screen === "account")
    renderAccount();


  if(scroll){

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }

}


/* HOME */

function goHome(){

  showScreen("home");

}


/* BADGES */

function updateBadges(){

  const cartCount =
    cart.reduce(
      (total,item)=>total + item.qty,
      0
    );

  const cartBadge =
    document.getElementById("cartBadge");

  const wishBadge =
    document.getElementById("wishBadge");


  if(cartBadge)
    cartBadge.textContent = cartCount;

  if(wishBadge)
    wishBadge.textContent =
      wishlist.length;

}


/* HOME PRODUCTS */

function renderHomeProducts(){

  const box =
    document.getElementById("homeProducts");

  if(!box)return;

  box.innerHTML =
    products
      .slice(0,4)
      .map(productCard)
      .join("");

}


/* PRODUCTS */

function renderProducts(list){

  const box =
    document.getElementById("productList");

  if(!box)return;


  if(!list.length){

    box.innerHTML = `
      <div
        class="empty"
        style="grid-column:1/-1"
      >
        <div class="empty-icon">🔎</div>

        <h2>No products found</h2>

        <p>
          Try another search or category.
        </p>
      </div>
    `;

    return;

  }


  box.innerHTML =
    list.map(productCard).join("");

}


/* PRODUCT CARD */

function productCard(product){

  const wished =
    wishlist.includes(product.id);

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

          ⭐ ${product.rating}

        </div>


        <div class="price-row">

          <span class="price">

            ${money(product.price)}

          </span>

          <span class="old-price">

            ${money(product.oldPrice)}

          </span>

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


/* PRODUCT DETAIL */

function openProduct(id){

  const product =
    getProduct(id);

  if(!product)return;


  currentProductId =
    product.id;


  const image =
    document.getElementById("detailImage");


  image.innerHTML =
    product.image

      ?

      `
      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
        onerror="
          this.style.display='none';
          this.nextElementSibling.style.display='flex';
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
        ${product.emoji}
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
        "
      >
        ${product.emoji}
      </span>
      `;


  document.getElementById(
    "detailName"
  ).textContent =
    product.name;


  document.getElementById(
    "detailPrice"
  ).textContent =
    money(product.price);


  document.getElementById(
    "detailOldPrice"
  ).textContent =
    money(product.oldPrice);


  document.getElementById(
    "detailRating"
  ).textContent =
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


/* CATEGORY */

function openCategory(category){

  const filtered =
    products.filter(
      p => p.category === category
    );


  document.getElementById(
    "productsTitle"
  ).textContent =
    category;


  renderProducts(filtered);

  showScreen("products");

}


/* SEARCH */

function searchKey(event){

  if(event.key === "Enter")
    searchProducts();

}


function searchProducts(){

  const input =
    document.getElementById(
      "searchInput"
    );


  const query =
    input.value
      .trim()
      .toLowerCase();


  if(!query){

    document.getElementById(
      "productsTitle"
    ).textContent =
      "All Products";

    renderProducts(products);

    showScreen("products");

    return;

  }


  const results =
    products.filter(function(product){

      return (
        product.name
          .toLowerCase()
          .includes(query)
        ||
        product.category
          .toLowerCase()
          .includes(query)
      );

    });


  document.getElementById(
    "productsTitle"
  ).textContent =
    "Search: " + input.value.trim();


  renderProducts(results);

  showScreen("products");


  if(!results.length){

    toast(
      "No product found for your search."
    );

  }

}


/* ADD CART */

function addToCart(id,qty=1){

  const product =
    getProduct(id);

  if(!product)return;


  const existing =
    cart.find(
      item => item.id === product.id
    );


  if(existing){

    existing.qty += qty;

  }else{

    cart.push({
      id:product.id,
      qty:qty
    });

  }


  saveData();

  renderCart();

  toast(
    product.name +
    " added to cart 🛒"
  );

}


/* CURRENT PRODUCT CART */

function addCurrentProduct(){

  if(currentProductId)
    addToCart(currentProductId);

}


/* CHANGE QTY */

function changeQty(id,amount){

  const item =
    cart.find(
      i => i.id === Number(id)
    );

  if(!item)return;


  item.qty += amount;


  if(item.qty <= 0){

    cart =
      cart.filter(
        i => i.id !== Number(id)
      );

  }


  saveData();

  renderCart();

}


/* REMOVE */

function removeFromCart(id){

  cart =
    cart.filter(
      i => i.id !== Number(id)
    );


  saveData();

  renderCart();

  toast(
    "Product removed from cart"
  );

}


/* RENDER CART */

function renderCart(){

  const list =
    document.getElementById(
      "cartList"
    );

  const summary =
    document.getElementById(
      "cartSummary"
    );


  if(!list || !summary)return;


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
          style="margin-top:15px"
          onclick="showScreen('products')"
        >
          Start Shopping
        </button>

      </div>

    `;

    summary.innerHTML="";

    return;

  }


  list.innerHTML =
    cart.map(function(item){

      const p =
        getProduct(item.id);

      if(!p)return "";


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
                p.price * item.qty
              )}

            </div>


            <div class="qty-controls">

              <button
                onclick="
                  changeQty(${p.id},-1)
                "
              >
                −
              </button>


              <strong>
                ${item.qty}
              </strong>


              <button
                onclick="
                  changeQty(${p.id},1)
                "
              >
                +
              </button>

            </div>


            <button
              class="remove-btn"
              onclick="
                removeFromCart(${p.id})
              "
            >
              Remove
            </button>

          </div>


          <button
            class="remove-btn"
            onclick="
              removeFromCart(${p.id})
            "
          >
            ✕
          </button>

        </div>

      `;

    }).join("");


  const subtotal =
    cart.reduce(function(total,item){

      const p =
        getProduct(item.id);

      return total +
        (p
          ? p.price * item.qty
          : 0);

    },0);


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


      <div
        class="summary-row summary-total"
      >

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

}


/* BUY NOW */

function buyCurrentProduct(){

  if(!currentProductId)return;

  addToCart(currentProductId);

  showScreen("cart");

}


/* CHECKOUT */

function checkout(){

  if(!cart.length){

    toast(
      "Your cart is empty."
    );

    return;

  }


  const subtotal =
    cart.reduce(function(total,item){

      const p =
        getProduct(item.id);

      return total +
        (p
          ? p.price * item.qty
          : 0);

    },0);


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
      cart.map(item => ({
        id:item.id,
        qty:item.qty
      })),

    total:total,

    status:"Order Placed"

  };


  orders.unshift(order);

  cart=[];

  saveData();

  renderCart();

  renderOrders();

  toast(
    "Order placed successfully! 📦"
  );


  setTimeout(function(){

    showScreen("orders");

  },600);

}


/* WISHLIST */

function toggleWishlist(id){

  id=Number(id);


  if(wishlist.includes(id)){

    wishlist =
      wishlist.filter(
        x => x !== id
      );

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

  renderHomeProducts();

  renderProducts(products);

  renderWishlist();

}


/* WISHLIST SCREEN */

function renderWishlist(){

  const box =
    document.getElementById(
      "wishlistList"
    );

  if(!box)return;


  const saved =
    wishlist
      .map(getProduct)
      .filter(Boolean);


  if(!saved.length){

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
    saved.map(productCard).join("");

}


/* ORDERS */

function renderOrders(){

  const box =
    document.getElementById(
      "ordersList"
    );

  if(!box)return;


  if(!orders.length){

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
    orders.map(function(order){

      const count =
        order.items.reduce(
          (total,item)=>
            total + item.qty,
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

    }).join("");

}


/* ACCOUNT */

function renderAccount(){

  const box =
    document.getElementById(
      "accountContent"
    );

  if(!box)return;


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


/* ACCOUNT BUTTONS */

function loginDemo(){

  toast(
    "Login screen is ready for backend connection."
  );

}


function signupDemo(){

  toast(
    "Create Account is ready for backend connection."
  );

}


function sellerCenter(){

  toast(
    "Seller Center is ready for the next step."
  );

}


/* TOAST */

function toast(message){

  const box =
    document.getElementById(
      "toast"
    );

  if(!box)return;


  clearTimeout(toastTimer);


  box.textContent =
    message;


  box.classList.add("show");


  toastTimer =
    setTimeout(function(){

      box.classList.remove("show");

    },2200);

}


/* STORAGE SYNC */

window.addEventListener(
  "storage",
  function(){

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


    updateBadges();

    renderCart();

    renderWishlist();

    renderOrders();

  }
);
/* =====================================================
   SELLER CENTER
===================================================== */

let sellerProducts =
  JSON.parse(localStorage.getItem("bismiSellerProducts")) || [];


/* SELLER CENTER OPEN */

function sellerCenter(){

  closeSellerPanels();

  showScreen("sellerCenter");

  renderSellerCenter();

}


/* SELLER CENTER STATS */

function renderSellerCenter(){

  const productCount =
    document.getElementById("sellerProductCount");

  const orderCount =
    document.getElementById("sellerOrderCount");

  const earnings =
    document.getElementById("sellerEarnings");


  if(productCount)
    productCount.textContent =
      sellerProducts.length;


  const sellerOrders =
    getSellerOrders();


  if(orderCount)
    orderCount.textContent =
      sellerOrders.length;


  const total =
    calculateSellerEarnings();


  if(earnings)
    earnings.textContent =
      money(total.net);

}


/* CLOSE ALL SELLER PANELS */

function closeSellerPanels(){

  const panels = [
    "addProductPanel",
    "sellerProductsPanel",
    "sellerOrdersPanel",
    "sellerEarningsPanel"
  ];


  panels.forEach(function(id){

    const panel =
      document.getElementById(id);

    if(panel)
      panel.style.display = "none";

  });

}


/* CLOSE CURRENT PANEL */

function closeSellerPanel(){

  closeSellerPanels();

}


/* ADD PRODUCT PANEL */

function openAddProduct(){

  closeSellerPanels();

  const panel =
    document.getElementById(
      "addProductPanel"
    );

  if(panel)
    panel.style.display = "block";


  const name =
    document.getElementById(
      "sellerProductName"
    );

  if(name)
    name.focus();

}


/* ADD SELLER PRODUCT */

function addSellerProduct(){

  const name =
    document.getElementById(
      "sellerProductName"
    ).value.trim();


  const category =
    document.getElementById(
      "sellerProductCategory"
    ).value;


  const price =
    Number(
      document.getElementById(
        "sellerProductPrice"
      ).value
    );


  const oldPrice =
    Number(
      document.getElementById(
        "sellerProductOldPrice"
      ).value
    );


  const emoji =
    document.getElementById(
      "sellerProductEmoji"
    ).value.trim()
    || "📦";


  const description =
    document.getElementById(
      "sellerProductDescription"
    ).value.trim();


  /* VALIDATION */

  if(!name){

    toast(
      "Please enter product name."
    );

    return;

  }


  if(!price || price <= 0){

    toast(
      "Please enter a valid price."
    );

    return;

  }


  if(oldPrice && oldPrice < price){

    toast(
      "Old price should be higher than selling price."
    );

    return;

  }


  /* CREATE PRODUCT */

  const newProduct = {

    id:
      Date.now(),

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
      "Quality product available at BismiMart."

  };


  /* SAVE SELLER PRODUCT */

  sellerProducts.push(
    newProduct
  );


  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );


  /* ALSO ADD TO MAIN PRODUCT LIST */

  products.push(
    newProduct
  );


  /* CLEAR FORM */

  document.getElementById(
    "sellerProductName"
  ).value = "";


  document.getElementById(
    "sellerProductPrice"
  ).value = "";


  document.getElementById(
    "sellerProductOldPrice"
  ).value = "";


  document.getElementById(
    "sellerProductEmoji"
  ).value = "";


  document.getElementById(
    "sellerProductDescription"
  ).value = "";


  /* REFRESH APP */

  renderHomeProducts();

  renderProducts(products);

  renderSellerCenter();

  showSellerProducts();

  toast(
    "Product added successfully! 📦"
  );

}


/* SELLER PRODUCTS */

function showSellerProducts(){

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerProductsPanel"
    );


  if(panel)
    panel.style.display = "block";


  renderSellerProducts();

}


/* RENDER SELLER PRODUCTS */

function renderSellerProducts(){

  const box =
    document.getElementById(
      "sellerProductsList"
    );


  if(!box)return;


  if(!sellerProducts.length){

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
    sellerProducts.map(function(product){

      return `

        <div class="seller-product-item">

          <div class="seller-product-icon">

            ${product.emoji}

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

    }).join("");

}


/* DELETE SELLER PRODUCT */

function deleteSellerProduct(id){

  id = Number(id);


  const product =
    sellerProducts.find(
      p => p.id === id
    );


  if(!product)return;


  sellerProducts =
    sellerProducts.filter(
      p => p.id !== id
    );


  localStorage.setItem(
    "bismiSellerProducts",
    JSON.stringify(sellerProducts)
  );


  /* REMOVE FROM MAIN PRODUCTS */

  const index =
    products.findIndex(
      p => p.id === id
    );


  if(index !== -1)
    products.splice(index,1);


  renderSellerProducts();

  renderSellerCenter();

  renderHomeProducts();

  renderProducts(products);


  toast(
    "Product removed."
  );

}


/* SELLER ORDERS */

function showSellerOrders(){

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerOrdersPanel"
    );


  if(panel)
    panel.style.display = "block";


  renderSellerOrders();

}


/* GET SELLER ORDERS */

function getSellerOrders(){

  return orders.filter(function(order){

    return order.items.some(function(item){

      return sellerProducts.some(function(product){

        return product.id === Number(item.id);

      });

    });

  });

}


/* RENDER SELLER ORDERS */

function renderSellerOrders(){

  const box =
    document.getElementById(
      "sellerOrdersList"
    );


  if(!box)return;


  const sellerOrders =
    getSellerOrders();


  if(!sellerOrders.length){

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
    sellerOrders.map(function(order){

      const sellerItems =
        order.items.filter(function(item){

          return sellerProducts.some(
            product =>
              product.id === Number(item.id)
          );

        });


      let sellerTotal = 0;


      sellerItems.forEach(function(item){

        const product =
          sellerProducts.find(
            p => p.id === Number(item.id)
          );


        if(product){

          sellerTotal +=
            product.price * item.qty;

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

              ${sellerItems.length}
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

    }).join("");

}


/* SELLER EARNINGS */

function showSellerEarnings(){

  closeSellerPanels();


  const panel =
    document.getElementById(
      "sellerEarningsPanel"
    );


  if(panel)
    panel.style.display = "block";


  renderSellerEarnings();

}


/* CALCULATE EARNINGS */

function calculateSellerEarnings(){

  let totalSales = 0;


  const sellerOrders =
    getSellerOrders();


  sellerOrders.forEach(function(order){

    order.items.forEach(function(item){

      const product =
        sellerProducts.find(
          p => p.id === Number(item.id)
        );


      if(product){

        totalSales +=
          product.price * item.qty;

      }

    });

  });


  /* DEMO COMMISSION */

  const commission =
    totalSales * 0.10;


  const net =
    totalSales - commission;


  return {

    sales: totalSales,

    commission:
      commission,

    net:
      net

  };

}


/* RENDER EARNINGS */

function renderSellerEarnings(){

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


  if(totalSales)
    totalSales.textContent =
      money(data.sales);


  if(commission)
    commission.textContent =
      money(data.commission);


  if(net)
    net.textContent =
      money(data.net);

}
