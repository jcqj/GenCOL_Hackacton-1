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
            // cantidad.textContent = agregraProductos;
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
            // cantidad.textContent = agregraProductos;
        });


        itemsCarrito.append(li);

        agregraProductos++;
        // cantidad.textContent = agregraProductos;
    });
});



vaciarCarrito.addEventListener("click", function() {
    miCarrito = [];
    itemsCarrito.innerHTML = "";
    agregraProductos = 0;
    total.textContent = 0;
})