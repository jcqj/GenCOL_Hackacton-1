//! Crear Array para almacenar los productos del carrito
let carrito = [];

//! Seleccionar todos los botones "Añadir a carrito"
const botonesAgregar = document.querySelectorAll('.agregar');

// //! Agregar evento click a cada botón
// botonesAgregar.forEach(boton => {
//     boton.addEventListener('click', agregarAlCarrito);
// });

// function agregarAlCarrito(e) {
//     //! Obtener el card del producto clickeado
//     const card = e.target.closest('.card');
    
//     //! Extraer información del producto
//     const producto = {
//         imagen: card.querySelector('.producto-img').src,
//         nombre: card.querySelector('.producto-nombre').textContent,
//         precio: parseFloat(card.querySelector('.producto-precio').textContent.replace('$', '')),
//         cantidad: 1
//     };
    
//     // Verificar si el producto ya existe en el carrito
//     const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    
//     if (productoExistente) {
//         // Si existe, incrementar cantidad
//         productoExistente.cantidad++;
//     } else {
//         // Si no existe, agregarlo al carrito
//         carrito.push(producto);
//     }
    
//     // Actualizar el carrito en la interfaz
//     actualizarCarrito();
// }

//! Agregar evento click a cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function(){
        
        //! Obtenemos la card padre del botón clickeado
        const card = e.target.closest('.card');
    
        //! Extraer información del producto
        const producto = {
            imagen: card.querySelector('.producto-img').src,
            nombre: card.querySelector('.producto-nombre').textContent,
            precio: parseFloat(card.querySelector('.producto-precio').textContent.replace('$', '')),
            cantidad: 1
        };
        
        //! Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
        
        if (productoExistente) {
            //! Si existe, incrementar cantidad
            productoExistente.cantidad++;
            } 
        else {
            //! Si no existe, agregarlo al carrito
            carrito.push(producto);
        }
        
        //! Actualizar el carrito en la interfaz
        actualizarCarrito();
        });
});


function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Limpiar lista actual
    // listaCarrito.innerHTML = '';
    
    let total = 0;
    
    // Crear elementos de lista para cada producto
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        
        // li.innerHTML = `
        //     <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 16rem; height: 4rem; object-fit: cover; margin-right: 10px;">
        //     <div class="ms-2 me-auto">
        //         <div class="fw-bold">${producto.nombre}</div>
        //         $${producto.precio.toFixed(2)} c/u
        //     </div>
        //     <div class="d-flex align-items-center">
        //         <button class="btn btn-sm btn-secondary me-2" onclick="cambiarCantidad(${index}, -1)">-</button>
        //         <span class="badge text-bg-primary rounded-pill">${producto.cantidad}</span>
        //         <button class="btn btn-sm btn-secondary ms-2" onclick="cambiarCantidad(${index}, 1)">+</button>
        //         <button class="btn btn-sm btn-danger ms-2" onclick="eliminarProducto(${index})">
        //             <i class="bi bi-trash"></i> ×
        //         </button>
        //     </div>
        //     <h2>prodcuto añadido</h2>
        // `;
        li.innerHTML = `<p>prodcuto añadido</p>`;
        listaCarrito.appendChild(li);
        
        // Calcular total
        // total += producto.precio * producto.cantidad;
    });
    
    // Actualizar total
    totalCarrito.textContent = total.toFixed(2);
    
    // Mostrar mensaje si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    }
}

// // Función para cambiar cantidad
// function cambiarCantidad(index, cambio) {
//     carrito[index].cantidad += cambio;
    
//     // Si la cantidad es 0 o menor, eliminar producto
//     if (carrito[index].cantidad <= 0) {
//         carrito.splice(index, 1);
//     }
    
//     actualizarCarrito();
// }

// // Función para eliminar producto
// function eliminarProducto(index) {
//     carrito.splice(index, 1);
//     actualizarCarrito();
// }

// // Inicializar carrito vacío al cargar la página
// document.addEventListener('DOMContentLoaded', () => {
//     actualizarCarrito();
// });