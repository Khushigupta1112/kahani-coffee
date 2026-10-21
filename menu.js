// =====================================================================
// menu.js  —  Kahani & Coffee
// Customer Ordering Experience, Responsive Cart & Table Validation
// =====================================================================

// Food Catalogue
const foodItems = [
  {
    name: "Cappuccino",
    price: 120,
    category: "coffee",
    image: "images/pexels-withoguz-25381257.jpg"
  },
  {
    name: "Espresso",
    price: 110,
    category: "coffee",
    image: "images/pexels-siska-april-669214200-21776947 (1).jpg"
  },
  {
    name: "Americano",
    price: 130,
    category: "coffee",
    image: "images/pexels-melly-2096840.jpg"
  },
  {
    name: "Latte",
    price: 160,
    category: "coffee",
    image: "images/pexels-kevinmenajang-982612.jpg"
  },
  {
    name: "Mocha",
    price: 180,
    category: "coffee",
    image: "images/pexels-viniciusvieirafotografia-22608818.jpg"
  },
  {
    name: "Cold Coffee",
    price: 150,
    category: "coffee",
    image: "images/pexels-sedanur-kunuk-78972032-27408440.jpg"
  },
  {
    name: "Hazelnut Frappe",
    price: 210,
    category: "coffee",
    image: "images/pexels-virgold-24433379.jpg"
  },
  {
    name: "Hot Chocolate",
    price: 170,
    category: "coffee",
    image: "images/pexels-tatianeherder-12015601.jpg"
  },
  {
    name: "Farmhouse Pizza",
    price: 299,
    category: "pizza",
    image: "images/pexels-anhelina-vasylyk-734724285-33593000.jpg"
  },
  {
    name: "Cheese Pizza",
    price: 249,
    category: "pizza",
    image: "images/pexels-pixabay-315755.jpg"
  },
  {
    name: "Margherita Pizza",
    price: 229,
    category: "pizza",
    image: "images/pexels-willians-huerta-2157111846-35760006.jpg"
  },
  {
    name: "Paneer Tikka Pizza",
    price: 319,
    category: "pizza",
    image: "images/pexels-praful-das-2255383-11974636.jpg"
  },
  {
    name: "White Sauce Pasta",
    price: 220,
    category: "pasta",
    image: "images/pexels-enginakyurt-3214161 (1).jpg"
  },
  {
    name: "Red Sauce Pasta",
    price: 210,
    category: "pasta",
    image: "images/pexels-shameel-mukkath-3421394-5640046.jpg"
  },
  {
    name: "Pink Sauce Pasta",
    price: 240,
    category: "pasta",
    image: "images/pexels-the-qurious-studio-537664004-16525900.jpg"
  },
  {
    name: "Veg Alfredo Pasta",
    price: 250,
    category: "pasta",
    image: "images/pexels-enginakyurt-11220209.jpg"
  },
  {
    name: "Brownie",
    price: 140,
    category: "dessert",
    image: "images/pexels-vo-van-ti-n-2037497312-29819836.jpg"
  },
  {
    name: "Ice Cream",
    price: 99,
    category: "dessert",
    image: "images/pexels-airamdphoto-11441807.jpg"
  },
  {
    name: "Chocolate Lava Cake",
    price: 160,
    category: "dessert",
    image: "images/pexels-christian-dala-651910440-19244738.jpg"
  },
  {
    name: "Cheesecake",
    price: 190,
    category: "dessert",
    image: "images/pexels-nano-erdozain-120534369-28895988.jpg"
  },
  {
    name: "Tiramisu",
    price: 220,
    category: "dessert",
    image: "images/pexels-catscoming-10169991.jpg"
  },
  {
    name: "Coffee + Brownie Combo",
    price: 199,
    category: "combo",
    image: "images/pexels-zeynep-sahin-363019162-28744929.jpg"
  },
  {
    name: "Pizza + Coke Combo",
    price: 349,
    category: "combo",
    image: "images/pexels-mutecevvil-17900538.jpg"
  },
  {
    name: "Pasta + Garlic Bread Combo",
    price: 329,
    category: "combo",
    image: "images/combo3.jpg"
  },
  {
    name: "Couple Café Combo",
    price: 499,
    category: "combo",
    image: "images/combo4.jpg"
  },
  {
    name: "French Fries",
    price: 110,
    category: "snacks",
    image: "images/fries.jpg"
  },
  {
    name: "Garlic Bread",
    price: 130,
    category: "snacks",
    image: "images/garlicbread.jpg"
  },
  {
    name: "Nachos",
    price: 170,
    category: "snacks",
    image: "images/pexels-snappr-29851128.jpg"
  },
  {
    name: "Veg Sandwich",
    price: 150,
    category: "snacks",
    image: "images/sandwich.jpg"
  },
  {
    name: "Loaded Burger meal",
    price: 240,
    category: "snacks",
    image: "images/pexels-jonathanborba-19247580.jpg"
  },
  {
    name: "Peri Peri Fries",
    price: 140,
    category: "snacks",
    image: "images/perifries.jpg"
  },
  {
    name: "Blueberry Smoothie",
    price: 190,
    category: "coffee",
    image: "images/smoothie.jpg"
  },
  {
    name: "Mint Mojito",
    price: 160,
    category: "coffee",
    image: "images/mojito.jpg"
  }
];

// ── Safe Cart Storage Management ────────────────────────────────────

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const normalized = [];
    parsed.forEach(item => {
      if (item && typeof item.name === "string" && typeof item.price === "number") {
        const qty = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
        const existing = normalized.find(n => n.name === item.name);
        if (existing) {
          existing.quantity += qty;
        } else {
          normalized.push({
            name: item.name,
            price: item.price,
            quantity: qty
          });
        }
      }
    });
    return normalized;
  } catch (e) {
    console.warn("Invalid cart data in localStorage, initializing empty cart:", e);
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to localStorage:", e);
  }
}

let cart = loadCartFromStorage();
let isPlacingOrder = false;

// ── Utility: Safe HTML & Attribute Escaping ──────────────────────────

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsString(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');
}

// ── Branded Fallback SVG & Missing Asset Handler ─────────────────────

function getCategoryLabel(category) {
  switch (category) {
    case "coffee": return "Brewed Coffee";
    case "pizza": return "Artisan Pizza";
    case "pasta": return "Fresh Pasta";
    case "dessert": return "Sweet Dessert";
    case "combo": return "Café Combo";
    case "snacks": return "Savory Snack";
    default: return "Specialty";
  }
}

function generateFallbackSvg(title, category) {
  const label = getCategoryLabel(category);
  const safeTitle = (title || "Kahani & Coffee")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const safeLabel = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4B2E2B" />
        <stop offset="50%" stop-color="#38201D" />
        <stop offset="100%" stop-color="#241411" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#D7B49E" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#D7B49E" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D7B49E" />
        <stop offset="100%" stop-color="#A0522D" />
      </linearGradient>
    </defs>
    <rect width="320" height="220" fill="url(#bgGrad)" />
    <circle cx="160" cy="90" r="85" fill="url(#glow)" />
    <rect x="8" y="8" width="304" height="204" rx="10" fill="none" stroke="#D7B49E" stroke-opacity="0.18" stroke-dasharray="4 4" />
    <path d="M150 48 Q153 38 150 30" stroke="#D7B49E" stroke-opacity="0.6" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path d="M160 45 Q164 34 160 25" stroke="#D7B49E" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M170 48 Q167 38 170 30" stroke="#D7B49E" stroke-opacity="0.6" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path d="M136 60 H184 C184 82 174 95 160 95 C146 95 136 82 136 60 Z" fill="url(#cupGrad)" />
    <path d="M184 66 H193 C198 66 201 70 201 75 C201 80 198 84 193 84 H182" fill="none" stroke="#D7B49E" stroke-width="2.5" stroke-linecap="round" />
    <ellipse cx="160" cy="100" rx="36" ry="5" fill="#D7B49E" opacity="0.7" />
    <text x="160" y="132" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="14" font-weight="bold" fill="#F5E6D3" letter-spacing="0.5">${safeTitle}</text>
    <text x="160" y="152" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="11" font-weight="500" fill="#D7B49E" letter-spacing="1.2">${safeLabel.toUpperCase()}</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="10" fill="#8C5E58" letter-spacing="0.4">Kahani &amp; Coffee • Handcrafted</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function handleImageError(img, title, category) {
  if (!img) return;
  img.onerror = null;
  img.src = generateFallbackSvg(title, category);
  img.classList.add("img-fallback");
}

// ── Menu Rendering & Category Filter ────────────────────────────────

function displayItems(items) {
  const foodGrid = document.getElementById("foodGrid");
  if (!foodGrid) return;
  foodGrid.innerHTML = "";

  items.forEach((item, index) => {
    const safeName = escapeHtml(item.name);
    const categoryTag = getCategoryLabel(item.category);
    const escapedForJs = escapeJsString(item.name);
    const categoryForJs = escapeJsString(item.category);

    foodGrid.innerHTML += `
      <article class="food-card" style="--card-index: ${index};">
        <div class="food-card-img-wrap">
          <img src="${item.image}"
               alt="${safeName}"
               loading="lazy"
               onerror="handleImageError(this, '${escapedForJs}', '${categoryForJs}')">
          <span class="food-card-tag">${escapeHtml(categoryTag)}</span>
        </div>
        <div class="food-card-content">
          <h3 class="food-card-title">${safeName}</h3>
          <div class="food-card-footer">
            <div class="food-card-price-wrap">
              <span class="price-currency">₹</span>
              <span class="price-amount">${item.price}</span>
            </div>
            <button type="button"
                    class="add-to-cart-btn"
                    onclick='addToCart("${escapedForJs}", ${item.price})'
                    aria-label="Add ${safeName} to order">
              <span class="btn-icon">+</span> Add
            </button>
          </div>
        </div>
      </article>
    `;
  });
}

function filterItems(category, clickedBtn) {
  if (clickedBtn) {
    document.querySelectorAll(".category-bar button").forEach(btn => {
      btn.classList.remove("active");
    });
    clickedBtn.classList.add("active");
  }

  if (category === "all") {
    displayItems(foodItems);
  } else {
    const filtered = foodItems.filter(item => item.category === category);
    displayItems(filtered);
  }
}

// ── Badge Pop Micro-Interaction ─────────────────────────────────────

function triggerBadgePop() {
  const badge = document.getElementById("cartBadge");
  const barCount = document.getElementById("cartBarCount");
  [badge, barCount].forEach(el => {
    if (el) {
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
      setTimeout(() => {
        el.classList.remove("pop");
      }, 500);
    }
  });
}

// ── Cart Operations: Add, Increase, Decrease, Remove ────────────────

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCartToStorage();
  renderCart();
  triggerBadgePop();
  showToast(name + " added to order ✅");
}

function increaseQuantity(index) {
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += 1;
    saveCartToStorage();
    renderCart();
  }
}

function decreaseQuantity(index) {
  if (index >= 0 && index < cart.length) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    saveCartToStorage();
    renderCart();
  }
}

function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCartToStorage();
    renderCart();
    showToast(removedName + " removed from order");
  }
}

// ── Cart Render & Synchronization ───────────────────────────────────

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const cartBadge = document.getElementById("cartBadge");
  const emptyState = document.getElementById("emptyCartState");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const cartBar = document.getElementById("cartBar");
  const cartBarCount = document.getElementById("cartBarCount");
  const cartBarTotal = document.getElementById("cartBarTotal");

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (subtotalEl) subtotalEl.innerText = subtotal;
  if (totalEl) totalEl.innerText = subtotal;
  if (cartBadge) {
    cartBadge.innerText = itemCount === 1 ? "1 item" : `${itemCount} items`;
  }

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (cartItemsEl) cartItemsEl.innerHTML = "";
    if (placeOrderBtn) {
      placeOrderBtn.disabled = true;
      placeOrderBtn.classList.add("disabled");
    }
    if (cartBar) cartBar.style.display = "none";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (placeOrderBtn) {
      placeOrderBtn.disabled = false;
      placeOrderBtn.classList.remove("disabled");
    }

    if (cartItemsEl) {
      let html = "";
      cart.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        const safeName = escapeHtml(item.name);
        html += `
          <li class="cart-item-row" data-index="${index}">
            <div class="cart-item-main">
              <div class="cart-item-info">
                <span class="cart-item-name">${safeName}</span>
                <span class="cart-item-unit-price">₹${item.price} each</span>
              </div>
              <div class="cart-item-line-total">₹${lineTotal}</div>
            </div>
            <div class="cart-item-actions">
              <div class="qty-btn-group">
                <button type="button" class="qty-btn" onclick="decreaseQuantity(${index})" aria-label="Decrease quantity of ${safeName}">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="increaseQuantity(${index})" aria-label="Increase quantity of ${safeName}">+</button>
              </div>
              <button type="button" class="remove-btn" onclick="removeItem(${index})" aria-label="Remove ${safeName} from order">✕ Remove</button>
            </div>
          </li>
        `;
      });
      cartItemsEl.innerHTML = html;
    }

    if (cartBar) {
      cartBar.style.display = "flex";
      if (cartBarCount) cartBarCount.innerText = itemCount;
      if (cartBarTotal) cartBarTotal.innerText = subtotal;
    }
  }
}

// Backwards-compatible alias for existing code
function updateCart() {
  renderCart();
}

// ── Mobile Drawer Open / Close Controls ─────────────────────────────

function openCartDrawer() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  if (panel) panel.classList.add("open");
  if (overlay) overlay.classList.add("active");
}

function closeCartDrawer() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  if (panel) panel.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

// Backwards-compatible alias: clicking cart bar opens drawer instead of scrolling
function scrollToCart() {
  openCartDrawer();
}

// ── Table Number Validation ─────────────────────────────────────────

function validateTableNumber(val) {
  if (val === null || val === undefined || String(val).trim() === "") {
    return { valid: false, error: "Please enter your table number." };
  }
  const trimmed = String(val).trim();
  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, error: "Table number must be a whole positive number (no letters or decimals)." };
  }
  const num = parseInt(trimmed, 10);
  if (num <= 0) {
    return { valid: false, error: "Table number must be at least 1." };
  }
  if (num > 99) {
    return { valid: false, error: "Table number cannot exceed 99." };
  }
  return { valid: true, value: num };
}

function showTableError(message) {
  const errEl = document.getElementById("tableError");
  const inputEl = document.getElementById("tableNumber");
  if (errEl) {
    errEl.innerText = message;
    errEl.style.display = "block";
  }
  if (inputEl) {
    inputEl.classList.add("input-error");
  }
}

function clearTableError() {
  const errEl = document.getElementById("tableError");
  const inputEl = document.getElementById("tableNumber");
  if (errEl) {
    errEl.innerText = "";
    errEl.style.display = "none";
  }
  if (inputEl) {
    inputEl.classList.remove("input-error");
  }
}

function initTableNumber() {
  const tableInput = document.getElementById("tableNumber");
  if (!tableInput) return;

  // Ensure input is editable (not readonly)
  tableInput.removeAttribute("readonly");

  // Read URL query parameter ?table=...
  const params = new URLSearchParams(window.location.search);
  const tableParam = params.get("table");
  if (tableParam) {
    const check = validateTableNumber(tableParam);
    if (check.valid) {
      tableInput.value = check.value;
    }
  }

  // Clear inline error on typing
  tableInput.addEventListener("input", clearTableError);
}

// ── Order Placement ─────────────────────────────────────────────────

function placeOrder() {
  if (isPlacingOrder) return;

  if (!Array.isArray(cart) || cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  const tableInput = document.getElementById("tableNumber");
  const tableVal = tableInput ? tableInput.value : "";
  const validation = validateTableNumber(tableVal);

  if (!validation.valid) {
    showTableError(validation.error);
    // Open drawer on mobile if closed so user sees the input and error
    openCartDrawer();
    if (tableInput) tableInput.focus();
    return;
  }

  clearTableError();
  isPlacingOrder = true;

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerText = "Processing Order...";
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let orders = [];
  try {
    const raw = localStorage.getItem("orders");
    if (raw) orders = JSON.parse(raw);
    if (!Array.isArray(orders)) orders = [];
  } catch (e) {
    orders = [];
  }

  const newOrder = {
    id: Date.now(),
    table: validation.value,
    items: cart.map(i => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity
    })),
    amount: total,
    status: "Pending"
  };

  orders.push(newOrder);
  try {
    localStorage.setItem("orders", JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save order to localStorage:", e);
  }

  // Clear cart storage upon successful checkout transition
  try {
    localStorage.removeItem("cart");
  } catch (e) {}
  cart = [];

  window.location.href = "payment.html";
}

// ── Toasts & Popups ─────────────────────────────────────────────────

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  toast.innerHTML = `<span class="toast-icon">☕</span><span>${escapeHtml(message)}</span>`;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function closePopup() {
  const popup = document.getElementById("successPopup");
  if (popup) popup.style.display = "none";
}

// ── Public Global Bindings ──────────────────────────────────────────

window.displayItems = displayItems;
window.filterItems = filterItems;
window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;
window.placeOrder = placeOrder;
window.showToast = showToast;
window.handleImageError = handleImageError;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.scrollToCart = scrollToCart;
window.closePopup = closePopup;

// ── Initialization Hook ─────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  displayItems(foodItems);

  // Set "All" filter button active
  const firstBtn = document.querySelector(".category-bar button");
  if (firstBtn) firstBtn.classList.add("active");

  initTableNumber();
  renderCart();

  // Close drawer on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCartDrawer();
    }
  });
});
