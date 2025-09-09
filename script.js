
const products = [
    { id: 1, name: 'Rollos Vietnamitas', price: 18000, category: 'entradas' },
    { id: 2, name: 'Bento Box de Sushi', price: 42000, category: 'fuertes' },
    { id: 3, name: 'Tarta de Té Verde', price: 16000, category: 'postres' },
    { id: 4, name: 'Hatsu Frutos Rojos', price: 7000, category: 'bebidas' }
];

const cart = [];
function renderProducts(category = null) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.filter(p => !category || p.category === category).forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';
        item.innerHTML = `<h3>${product.name}</h3><p>$${product.price}</p><button onclick="addToCart(${product.id})">Añadir</button>`;
        list.appendChild(item);
    });
}
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}
function updateCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        list.appendChild(li);
        total += item.price;
    });
    document.getElementById('cart-total').textContent = `$${total}`;
}
function filterCategory(category) {
    renderProducts(category);
}
function sendOrder() {
    let message = "Hola, quiero pedir:\n";
    cart.forEach(item => { message += `- ${item.name} ($${item.price})\n`; });
    message += `Total: ${document.getElementById('cart-total').textContent}`;
    const encoded = encodeURIComponent(message);
    const phone = "573053631301";
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}
renderProducts();
