
async function cargarMenu() {
  try {
    const response = await fetch('menu_data.json');
    const data = await response.json();

    const secciones = ['urbanSushi', 'smashBurgers', 'greenBowls'];

    secciones.forEach(seccion => {
      const contenedor = document.getElementById(seccion);
      if (!contenedor) return;

      const marca = data[seccion];
      contenedor.innerHTML = `
        <h2>${marca.nombre}</h2>
        <h3>Platos</h3>
        ${marca.platos.map(plato => `
          <div class="plato">
            <h4>${plato.nombre} - $${plato.precio}</h4>
            <p>${plato.descripcion}</p>
          </div>
        `).join('')}
        <h3>Acompañamientos</h3>
        ${marca.acompañamientos.map(item => `
          <div class="acompañamiento">
            <strong>${item.nombre} - $${item.precio}</strong>
            <p>${item.descripcion}</p>
          </div>
        `).join('')}
        <h3>Postres</h3>
        ${marca.postres.map(postre => `
          <div class="postre">
            <strong>${postre.nombre} - $${postre.precio}</strong>
            <p>${postre.descripcion}</p>
          </div>
        `).join('')}
      `;
    });
  } catch (error) {
    console.error('Error al cargar el menú:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarMenu);
