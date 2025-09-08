/*
 * Centro de Despacho Multimarca 24/7
 * Este script controla la navegación entre vistas, el renderizado de marcas y menús, la gestión del carrito y las promociones cruzadas.
 */

// Datos de las marcas con sus productos
const brands = [
  {
    id: "sushi",
    name: "Urban Sushi",
    description: "Sushi fresco con toque urbano.",
    image: "https://images.pexels.com/photos/3577569/pexels-photo-3577569.jpeg?auto=compress&cs=tinysrgb&w=800",
    items: [
      {
        id: "sushi-roll-salmon",
        name: "Rollo de Salmón",
        description: "Salmón fresco, aguacate y arroz aromático.",
        price: 25000,
        image: "https://images.pexels.com/photos/3297365/pexels-photo-3297365.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "sushi-roll-tempura",
        name: "Rollo Tempura",
        description: "Langostino tempura con salsa teriyaki.",
        price: 28000,
        image: "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "sushi-bowl",
        name: "Sushi Bowl",
        description: "Un bowl completo con proteína y vegetales.",
        price: 30000,
        image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "burger",
    name: "Smash & Crispy Burgers",
    description: "Hamburguesas jugosas con toque crunchy.",
    image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
    items: [
      {
        id: "burger-smash-classic",
        name: "Smash Clásica",
        description: "Carne angus, queso cheddar y pan artesanal.",
        price: 20000,
        image: "https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "burger-crispy-chicken",
        name: "Crispy Chicken",
        description: "Pollo crocante, salsa especial y pepinillos.",
        price: 22000,
        image: "https://images.pexels.com/photos/1370733/pexels-photo-1370733.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "burger-double",
        name: "Doble Smash",
        description: "Doble carne, doble queso y doble sabor.",
        price: 28000,
        image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "bowls",
    name: "Green Bowls & Power",
    description: "Bowls saludables y llenos de energía.",
    image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800",
    items: [
      {
        id: "bowl-quinoa",
        name: "Bowl de Quinoa",
        description: "Quinoa, vegetales asados y aderezo de la casa.",
        price: 18000,
        image: "https://images.pexels.com/photos/1437587/pexels-photo-1437587.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "bowl-proteina",
        name: "Bowl Proteína",
        description: "Pollo a la plancha, verduras y arroz integral.",
        price: 20000,
        image: "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "bowl-fruta",
        name: "Bowl Frutal",
        description: "Selección de frutas frescas y granola.",
        price: 15000,
        image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
];

// Promociones cruzadas que combinan productos de varias marcas
const crossPromotions = [
  {
    id: "combo-sushi-burger",
    title: "Combo Sushi + Burger",
    description: "1 Rollo de salmón + 1 Smash clásica + bebida",
    price: 45000,
    items: ["sushi-roll-salmon", "burger-smash-classic"],
  },
  {
    id: "combo-burger-bowl",
    title: "Combo Burger + Bowl",
    description: "1 Crispy Chicken + 1 Bowl de Quinoa + bebida",
    price: 40000,
    items: ["burger-crispy-chicken", "bowl-quinoa"],
  },
  {
    id: "combo-full-house",
    title: "Combo Full House",
    description: "1 Rollo Tempura + 1 Doble Smash + 1 Bowl Proteína",
    price: 70000,
    items: ["sushi-roll-tempura", "burger-double", "bowl-proteina"],
  },
];

// Estado del carrito
let cart = [];
// Seguimiento de la marca actual para volver del carrito
let currentBrandId = null;

// Obtiene referencias a elementos de la interfaz
const brandGrid = document.getElementById("brand-grid");
const brandSelectionView = document.getElementById("brand-selection");
const dashboardView = document.getElementById("brand-dashboard");
const cartView = document.getElementById("cart-view");
const dashboardTitle = document.getElementById("dashboard-title");
const menuContainer = document.getElementById("menu-container");
const promoContainer = document.getElementById("promo-container");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const deliveryTypeSelect = document.getElementById("delivery-type");

// Inicializa la página renderizando las marcas disponibles
function init() {
  renderBrandCards();
  attachEventListeners();
  updateCartIcon();
}

// Renderiza las tarjetas de selección de marcas
function renderBrandCards() {
  brandGrid.innerHTML = "";
  brands.forEach((brand) => {
    const card = document.createElement("div");
    card.className = "brand-card";
    card.innerHTML = `
      <img src="${brand.image}" alt="${brand.name}" />
      <div class="brand-card-content">
        <h3>${brand.name}</h3>
        <p>${brand.description}</p>
        <button data-brand-id="${brand.id}">Ver carta</button>
      </div>
    `;
    brandGrid.appendChild(card);
  });
}

// Renderiza la carta del menú de una marca específica
function renderMenu(brand) {
  dashboardTitle.textContent = brand.name;
  menuContainer.innerHTML = "";
  brand.items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.className = "menu-item";
    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="menu-item-content">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <div class="item-footer">
          <span class="price">$${item.price.toLocaleString()}</span>
          <button data-item-id="${item.id}">Añadir</button>
        </div>
      </div>
    `;
    menuContainer.appendChild(itemCard);
  });
}

// Renderiza las promociones cruzadas que aplican para la marca actual
function renderCrossPromotions(brandId) {
  promoContainer.innerHTML = "";
  // Filtra promociones donde al menos un item pertenece a la marca
  const promos = crossPromotions.filter((promo) => {
    return promo.items.some((itemId) => {
      return brands.some((b) => b.id === brandId && b.items.some((itm) => itm.id === itemId));
    });
  });
  promos.forEach((promo) => {
    const card = document.createElement("div");
    card.className = "promo-card";
    card.innerHTML = `
      <h4>${promo.title}</h4>
      <p>${promo.description}</p>
      <div class="promo-price">$${promo.price.toLocaleString()}</div>
      <button data-promo-id="${promo.id}">Añadir Combo</button>
    `;
    promoContainer.appendChild(card);
  });
}

// Añade un producto o una promo al carrito
function addToCart(itemIds, promo = null) {
  // itemIds puede ser un array con uno o varios productos
  itemIds.forEach((id) => {
    const existingItem = cart.find((el) => el.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Busca el objeto del producto en las marcas
      let foundItem = null;
      brands.forEach((b) => {
        const itm = b.items.find((prod) => prod.id === id);
        if (itm) {
          foundItem = itm;
        }
      });
      if (foundItem) {
        cart.push({ id: foundItem.id, name: foundItem.name, price: foundItem.price, quantity: 1 });
      }
    }
  });
  // Si es promoción, añadimos un item virtual con precio de la promo en lugar de los precios individuales
  if (promo) {
    cart.push({ id: promo.id, name: promo.title, price: promo.price, quantity: 1, isPromo: true });
  }
  updateCartIcon();
}

// Elimina un producto del carrito
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartIcon();
  renderCart();
}

// Actualiza el icono del carrito con la cantidad total de artículos
function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Renderiza la vista del carrito
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toLocaleString()}</span>
        <button data-remove-id="${item.id}" aria-label="Eliminar">✖</button>
      `;
      cartItemsContainer.appendChild(row);
    });
  }
  // Calcular total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Total: $${total.toLocaleString()}`;
}

// Adjunta manejadores de eventos a elementos interactivos
function attachEventListeners() {
  // Selección de una marca
  brandGrid.addEventListener("click", (e) => {
    const brandBtn = e.target.closest("button[data-brand-id]");
    if (!brandBtn) return;
    const brandId = brandBtn.getAttribute("data-brand-id");
    currentBrandId = brandId;
    const brand = brands.find((b) => b.id === brandId);
    if (brand) {
      renderMenu(brand);
      renderCrossPromotions(brandId);
      showView("dashboard");
    }
  });

  // Botón para regresar a la selección de marcas
  document.getElementById("back-to-brands").addEventListener("click", () => {
    showView("brands");
  });

  // Manejo del carrito desde el menú
  menuContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest("button[data-item-id]");
    if (!addBtn) return;
    const itemId = addBtn.getAttribute("data-item-id");
    addToCart([itemId]);
  });

  // Manejo de promociones cruzadas
  promoContainer.addEventListener("click", (e) => {
    const promoBtn = e.target.closest("button[data-promo-id]");
    if (!promoBtn) return;
    const promoId = promoBtn.getAttribute("data-promo-id");
    const promo = crossPromotions.find((p) => p.id === promoId);
    if (promo) {
      // Añadimos los productos incluidos y el combo como entrada virtual
      addToCart(promo.items, promo);
    }
  });

  // Icono de carrito en el header
  cartButton.addEventListener("click", () => {
    showView("cart");
    renderCart();
  });

  // Botón para regresar del carrito al tablero de la marca
  document.getElementById("back-to-dashboard").addEventListener("click", () => {
    if (currentBrandId) {
      showView("dashboard");
    } else {
      showView("brands");
    }
  });

  // Eliminar item del carrito
  cartItemsContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("button[data-remove-id]");
    if (!removeBtn) return;
    const removeId = removeBtn.getAttribute("data-remove-id");
    removeFromCart(removeId);
  });

  // Checkout
  document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Añade productos antes de finalizar.");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryType = deliveryTypeSelect.value === "delivery" ? "Domicilio" : "Recoger";
    alert(
      `¡Gracias por tu pedido!\nTipo de entrega: ${deliveryType}\nTotal: $${total.toLocaleString()}\n\nPronto recibirás la confirmación.`
    );
    // Vaciar carrito después de confirmar
    cart = [];
    updateCartIcon();
    showView("brands");
  });
}

// Muestra la vista específica: brands (selección), dashboard (menú), cart
function showView(view) {
  if (view === "brands") {
    brandSelectionView.classList.remove("hidden");
    dashboardView.classList.add("hidden");
    cartView.classList.add("hidden");
  } else if (view === "dashboard") {
    brandSelectionView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
    cartView.classList.add("hidden");
  } else if (view === "cart") {
    brandSelectionView.classList.add("hidden");
    dashboardView.classList.add("hidden");
    cartView.classList.remove("hidden");
  }
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);