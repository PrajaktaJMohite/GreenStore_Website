// --- PRODUCT DATA ---
const products = [
  // { name: "Aloe Vera", price: 499, image: "https://unlimitedgreens.com/cdn/shop/products/Aloe-Vera-Website-Front.webp?v=1676457070" },
  // { name: "Areca Palm", price: 699, image: "https://static.vecteezy.com/system/resources/previews/042/521/645/non_2x/ai-generated-a-lush-areca-palm-in-a-pot-isolated-white-background-photo.jpg" },
  // { name: "Money Plant", price: 899, image: "https://cdn.commmerce.com/uploads/pasumai-thottakalai-1/productImages/full/17113831412264money-plant.jpg" },
  // { name: "Bonsai Tree", price: 399, image: "https://images.pexels.com/photos/2149105/pexels-photo-2149105.jpeg?cs=srgb&dl=pexels-quang-nguyen-vinh-222549-2149105.jpg&fm=jpg" },
  // { name: "Succulent Mix", price: 799, image: "https://m.media-amazon.com/images/I/51+tZB7aMUL._UF1000,1000_QL80_.jpg" },
  
];

// --- CART STORAGE ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// --- SHOP PAGE RENDERING ---
function displayProducts(filteredProducts = products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";
  if (filteredProducts.length === 0) {
    container.innerHTML = "<p></p>";
    return;
  }

  filteredProducts.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="add-btn">Add to Cart</button>
    `;
    div.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    container.appendChild(div);
  });
}

// --- ADD TO CART ---
function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name: product.name, price: product.price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  alert("✅ Added to cart!");
}

// --- FILTERING LOGIC ---
function applyFilters() {
  const searchText = document.getElementById("search-box").value.toLowerCase();
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchText) &&
      p.price >= minPrice &&
      p.price <= maxPrice
  );

  displayProducts(filtered);
}

// --- CLEAR FILTER ---
function clearFilters() {
  document.getElementById("search-box").value = "";
  document.getElementById("min-price").value = "";
  document.getElementById("max-price").value = "";
  displayProducts(products);
}

// --- CART PAGE ---
function displayCartItems() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
    total += item.price * item.quantity;
  });

  totalEl.textContent = `Total: ₹${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCartItems();
  updateCartCount();
}

function clearCart() {
  cart = [];
  saveCart();
  displayCartItems();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) return alert("🛒 Your cart is empty!");
  alert("✅ Thank you for your purchase!");
  clearCart();
}

// --- INIT ---
updateCartCount();
displayProducts(products);
displayCartItems();

// --- Event Listeners ---
const filterBtn = document.getElementById("filter-btn");
const clearBtn = document.getElementById("clear-filter");
if (filterBtn) filterBtn.addEventListener("click", applyFilters);
if (clearBtn) clearBtn.addEventListener("click", clearFilters);

const searchBox = document.getElementById("search-box");
if (searchBox) searchBox.addEventListener("input", applyFilters);

const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");
if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
