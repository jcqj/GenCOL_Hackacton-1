let miCarrito = [];

let botonesAgregar = document.querySelectorAll(".agregar");
let itemsCarrito = document.getElementById("lista-carrito");
let cantidad = document.getElementById("cantidad");
let total = document.getElementById("total-carrito");
let vaciarCarrito = document.getElementById("vaciarCarrito");

let agregraProductos = 0;

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {

        const nombre = this.dataset.nombre;
        const precio = this.dataset.precio;
        const imagen = this.dataset.img;

        let items = itemsCarrito.querySelectorAll("li");
        let encontrado = false;

        items.forEach(item => {
            let nombreItem = item.querySelector(".nombre-item").textContent;

            if (nombreItem === nombre) {
                let cantidadItem = item.querySelector(".cantidad-item");
                cantidadItem.textContent = parseInt(cantidadItem.textContent) + 1;
                total.textContent = parseFloat(total.textContent) + parseFloat(precio);
                encontrado = true;
            }
        });

        if (encontrado) {
            agregraProductos++;
            cantidad.textContent = agregraProductos;
            return;
        }

        const li = document.createElement("li");

        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "gap-3"
        );

        li.innerHTML = `<img src="${imagen}" width="40">
            <span class="nombre-item">${nombre}</span>
            <span>$<span class="precio-item">${precio}</span></span>
            <span class="cantidad-item">1</span>`;  
        
        total.textContent = parseFloat(total.textContent) + parseFloat(precio);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btn-eliminar");

        li.append(btnEliminar);

        btnEliminar.addEventListener("click", function() {

            let cantidadItem = li.querySelector(".cantidad-item");
            let valor = parseInt(cantidadItem.textContent);

            if (valor > 1) {
                cantidadItem.textContent = valor - 1;
            } else {
                li.remove();
            }
                total.textContent = parseFloat(total.textContent) - parseFloat(precio);


            agregraProductos--;
            cantidad.textContent = agregraProductos;
        });


        itemsCarrito.append(li);

        agregraProductos++;
        cantidad.textContent = agregraProductos;
    });
});



vaciarCarrito.addEventListener("click", function() {
    miCarrito = [];
    itemsCarrito.innerHTML = "";
    agregraProductos = 0;
    cantidad.textContent = 0;
    total.textContent = 0;
})

//! Creando persistencia con localStorage

//! Función para guardar el carrito en localStorage
function guardarCarrito() {
    //! Traemos todos los 'li' del carrito.
    let items = itemsCarrito.querySelectorAll("li");
    //! En este array vamos a guardar los datos de cada producto para luego convertirlo a JSON y guardarlo en localStorage.
    let datos = [];

    //! Recorremos cada 'li' para extraer la información del producto y guardarla en el array 'datos'.
    items.forEach(item => {
        datos.push({
            //! Extraemos el nombre, precio, imagen y cantidad de cada producto 'li'.
            nombre: item.querySelector(".nombre-item").textContent,
            precio: item.querySelector(".precio-item").textContent,
            imagen: item.querySelector("img").src,
            cantidad: parseInt(item.querySelector(".cantidad-item").textContent)
        });
    });

    //! Guardamos el array 'datos' en localStorage como una cadena JSON, junto con el total y la cantidad de productos.
    localStorage.setItem("carrito", JSON.stringify(datos));
    localStorage.setItem("totalCarrito", total.textContent);
    localStorage.setItem("cantidadProductos", cantidad.textContent);
}

//! Función para cargar el carrito desde localStorage
function cargarCarrito() {
    //! Leemos los datos del carrito desde localStorage y los convertimos de JSON a un array de objetos.
    let datos = JSON.parse(localStorage.getItem("carrito"));

    //! Si no hay datos o el carrito está vacío, salimos de la función.
    if (!datos || datos.length === 0) return;

    //! Sí hay datos: cargamos el total y la cantidad de productos desde localStorage, y luego recorremos cada producto para crear los elementos 'li' correspondientes en el carrito.
    total.textContent = localStorage.getItem("totalCarrito") || 0;
    agregraProductos = parseInt(localStorage.getItem("cantidadProductos")) || 0;
    cantidad.textContent = agregraProductos;

    datos.forEach(producto => {
        const li = document.createElement("li");

        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "gap-3"
        );

        // li.innerHTML = `<img src="${producto.imagen}" width="40">
        //     <span class="nombre-item">${producto.nombre}</span>
        //     <span>$<span class="precio-item">${producto.precio}</span></span>`;

        li.innerHTML = `<img src="${producto.imagen}" width="40">
            <span class="nombre-item">${producto.nombre}</span>
            <span>$<span class="precio-item">${producto.precio}</span></span>
            <span class="cantidad-item">${producto.cantidad}</span>`; 

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btn-eliminar");

        li.append(btnEliminar);

        btnEliminar.addEventListener("click", function () {
            let cantidadItem = li.querySelector(".cantidad-item");
            let valor = parseInt(cantidadItem.textContent);

            if (valor > 1) {
                cantidadItem.textContent = valor - 1;
            } else {
                li.remove();
            }

            total.textContent = parseFloat(total.textContent) - parseFloat(producto.precio);

            agregraProductos--;
            cantidad.textContent = agregraProductos;

            // Guardamos después de eliminar
            guardarCarrito();
        });

        itemsCarrito.append(li);
    });
}

// CARGAR el carrito al iniciar la página
cargarCarrito();

// OBSERVAR cambios en la lista para guardar automáticamente
const observer = new MutationObserver(() => {
    guardarCarrito();
});

observer.observe(itemsCarrito, {
    childList: true,
    subtree: true,
    characterData: true
});