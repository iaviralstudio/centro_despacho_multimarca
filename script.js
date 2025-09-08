// script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('cartas_multimarca_medellin.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('menu-container');

      data.marcas.forEach(marca => {
        const section = document.createElement('section');
        section.innerHTML = `
          <h2>${marca.nombre}</h2>
          <h3>Platos principales</h3>
          <ul>
            ${marca.platos.map(p => `<li><strong>${p.nombre}</strong> - ${p.precio}<br>${p.descripcion}</li>`).join('')}
          </ul>
          <h3>Acompañamientos</h3>
          <ul>
            ${marca.acompañamientos.map(a => `<li><strong>${a.nombre}</strong> - ${a.precio}<br>${a.descripcion}</li>`).join('')}
          </ul>
          <h3>Postres</h3>
          <ul>
            ${marca.postres.map(p => `<li><strong>${p.nombre}</strong> - ${p.precio}<br>${p.descripcion}</li>`).join('')}
          </ul>
          <hr>
        `;
        container.appendChild(section);
      });
    })
    .catch(err => {
      console.error("Error al cargar el JSON:", err);
    });
});
