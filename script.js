
function showTab(id) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

fetch('menu_data.json')
    .then(response => response.json())
    .then(data => {
        for (let brand in data) {
            const section = document.getElementById(brand);
            if (!section) continue;
            data[brand].forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<h3>${item.nombre}</h3><p>${item.descripcion}</p><p><strong>Precio:</strong> ${item.precio}</p>`;
                section.appendChild(card);
            });
        }
    });
