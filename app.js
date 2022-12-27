const contenedor = document.getElementById("productoContainer");
productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML += `
                    <img src="${producto.imagen}" alt="..." />
                    <div class="contenidoCard">
                        <h3 class="tituloCard">${producto.nombre}</h3>
                        <div>
                            <p class="linea">${producto.descripcion}</p>
                            <p class="linea">$${producto.precio}</p>
                            <p class="linea">${producto.tipo}</p>
                        </div>
                    </div>
    `
    contenedor.appendChild(div)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar",
    comprar.className = "comprar"

    div.append(comprar)

    comprar.addEventListener("click", () => {

        const productoRepetido = carrito.some((repetido) => repetido.id === producto.id)

        if (productoRepetido) {
            carrito.map((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++
                }
            })
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                tipo: producto.tipo,
                precio: producto.precio,
                imagen: producto.imagen,
                descripcion: producto.descripcion,
                cantidad: producto.cantidad,
            })
        }

        carritoContador()
        guardado()
    })
});

function guardado() {
    localStorage.setItem("carritoCompleto", JSON.stringify(carrito))
}

