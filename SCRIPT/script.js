
let miCarrito = [];

let botonesAgregar = document.querySelectorAll(".agregar");
let itemsCarrito = document.getElementById("lista-carrito");
let cantidad = document.getElementById("cantidad");
let vaciarCarrito = document.getElementById("vaciarCarrito");

let agregraProductos = 0;

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {

        const card = this.closest(".card");
        const nombreProducto = card.querySelector(".producto-nombre").textContent;
        const imagenProducto = card.querySelector("img").src;

        let items = itemsCarrito.querySelectorAll("li");
        let encontrado = false;

        // buscar si ya existe
        items.forEach(item => {
            let nombre = item.querySelector(".nombre-item").textContent;

            if (nombre === nombreProducto) {
                let cantidadItem = item.querySelector(".cantidad-item");
                cantidadItem.textContent = parseInt(cantidadItem.textContent) + 1;
                encontrado = true;
            }
        });

        if (encontrado) {
            agregraProductos++;
            cantidad.textContent = agregraProductos;
            return;
        }

        const producto = {
            nombre: nombreProducto,
            imagen: imagenProducto
        };

        miCarrito.push(producto);

        const li = document.createElement("li");

        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "gap-3"
        );

        li.innerHTML = `
            <img src="${producto.imagen}" width="40">
            <span class="nombre-item">${producto.nombre}</span>
            <span class="cantidad-item">1</span>
        `;

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
    cantidad.textContent = agregraProductos;

})