
let menu = {
    urbanSushi: [
        { name: "Sushi Clásico", price: 28000 },
        { name: "Sushi Especial Dragón", price: 34000 },
    ],
    magnetaRise: [
        { name: "Arroz Thai con Camarones", price: 26000 },
        { name: "Noodles con Teriyaki", price: 24000 },
    ],
    smashCrispy: [
        { name: "Hamburguesa Doble Queso", price: 29000 },
        { name: "Crispy Chicken Burguer", price: 27000 },
    ]
};

let cart = [];

function showMenu(brand) {
    const section = document.getElementById('menu-section');
    section.innerHTML = `<h2>${brand.replace(/([A-Z])/g, ' $1')}</h2>`;
    menu[brand].forEach(item => {
        section.innerHTML += \`
            <div>
                <p><strong>\${item.name}</strong> - \$\${item.price.toLocaleString()} COP</p>
                <button onclick="addToCart('\${item.name}', \${item.price})">Añadir al carrito</button>
            </div>
        \`;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-list');
    list.innerHTML = "";
    cart.forEach(item => {
        list.innerHTML += \`<li>\${item.name} - \$\${item.price.toLocaleString()} COP</li>\`;
    });
}

function sendToWhatsApp() {
    const order = cart.map(item => \`\${item.name} (\$\${item.price.toLocaleString()} COP)\`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const message = \`Mi pedido:\n\${order}\nTotal: \$\${total.toLocaleString()} COP\`;
    const encodedMessage = encodeURIComponent(message);
    window.open(\`https://wa.me/573053631301?text=\${encodedMessage}\`, '_blank');
}
