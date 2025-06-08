// URL base del endpoint
const API_URL = "http://localhost/CRUD/backend/api_productos.php"; // Cambia esta URL según corresponda

// Obtener todos los productos (GET)
function listarProductos() {
  fetch(API_URL)
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log("Productos:", data); // Muestra los productos en consola
      mostrarTablaProductos(data); // Llama a la función para mostrar la tabla en el HTML
    })
    .catch(err => console.error("Error al obtener productos:", err));
}

// Función para mostrar la tabla de productos en el div 'productosContainer'
function mostrarTablaProductos(productos) {
  const container = document.getElementById('productosContainer');
  if (!Array.isArray(productos) || productos.length === 0) {
    container.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }
  let html = '<table border="1" cellpadding="5"><thead><tr>';
  html += '<th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>¿Eliminar?</th><th>¿Modificar?</th></tr></thead><tbody>';
  productos.forEach(p => {
    html += `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.descripcion}</td><td>${p.precio}</td><td> ` +// Estructura principal de la tabla 
      `<button onclick="eliminarProducto(${p.id})">Eliminar</button></td>` + // Botones para eliminar los productos
      `<td><button onclick="document.getElementById('formModificar').style.display='block'; document.getElementById('modificarId').value=${p.id}; document.getElementById('modificarNombre').value='${p.nombre}'; document.getElementById('modificarDescripcion').value='${p.descripcion}'; document.getElementById('modificarPrecio').value='${p.precio}';">Modificar</button></td>` +
      `</tr>`; // Botones para abrir el formulario para modificar los productos

  });

  html += '</tbody></table>';

  // Formulario para modificar productos
  html += `<form id="formModificar" style="display:none;" onsubmit="enviarModificacion(event)">` +
    `<input type="hidden" id="modificarId">` +
    `<label>Nombre: <input type="text" id="modificarNombre" required></label> ` +
    `<label>Descripción: <input type="text" id="modificarDescripcion" required></label> ` +
    `<label>Precio: <input type="text" id="modificarPrecio" required></label> ` +
    `<button type="submit">Guardar</button>` +
    `</form>`;

  container.innerHTML = html;
}

// Función para hacer submit del formulario de modificación de producto
function enviarModificacion(event) {
  event.preventDefault();
  const id = document.getElementById('modificarId').value;
  const nombre = document.getElementById('modificarNombre').value;
  const descripcion = document.getElementById('modificarDescripcion').value;
  const precio = document.getElementById('modificarPrecio').value;

  modificarProducto(id, nombre, descripcion, precio);

  document.getElementById('formModificar').style.display = 'none';
}

// Obtener un producto por ID (GET)
function mostrarProducto(id) {
  fetch(API_URL + '?id=' + id)
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => console.log("Producto:", data)) // Muestra el producto en consola
    .catch(err => console.error("Error al obtener producto:", err));
}

// Agregar un producto nuevo (POST)
function agregarProducto(nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio })
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log("Producto agregado:", data) // Muestra el resultado en consola
      listarProductos()// Vuelve a listar los productos después de agregar
    })
    .catch(err => console.error("Error al agregar producto:", err));
}

// Modificar un producto (PUT)
function modificarProducto(id, nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, descripcion, precio })
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log("Producto modificado:", data) // Muestra el resultado en consola
      listarProductos(); // Vuelve a listar los productos después de modificar
    })
    .catch(err => console.error("Error al modificar producto:", err));
}

// Eliminar un producto (DELETE)
function eliminarProducto(id) {
  fetch(API_URL + '?id=' + id, {
    method: "DELETE"
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log("Producto eliminado:", data) // Muestra el resultado en consola
      listarProductos(); // Vuelve a listar los productos después de eliminar
    })
    .catch(err => console.error("Error al eliminar producto:", err));
}

// Ejemplos de uso
// listarProductos();
// mostrarProducto(1);
// agregarProducto("Producto X", "Descripción X", 99.99);
// modificarProducto(1, "Nuevo nombre", "Nueva descripción", 123.45);
// eliminarProducto(1);