let carrito = JSON.parse(localStorage.getItem("carritoCompleto")) || []
const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")


function ponerCarrito() {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "block"
    const modalHeader = document.createElement("div")
    modalHeader.className ="modal-header"
    modalHeader.innerHTML = `
        <h1 class="titulo modal-header-title"> Carrito </h1>
    `
    modalContainer.append(modalHeader);

    const modalBoton = document.createElement("h1")
    modalBoton.innerText = "X"
    modalBoton.className = "modal-header-button"

    modalBoton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })
    

    modalHeader.appendChild(modalBoton)


    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${producto.imagen}">
        <h3>${producto.nombre}</h3>
        <p>Precio por unidad: $${producto.precio}</p>
        <p>Cantidad:  ${producto.cantidad}</p>
        <span class="restar"> - </span>
        <span class="sumar"> + </span>
        <p>Total:$${producto.cantidad * producto.precio}</p>
        `

        modalContainer.appendChild(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--
            }
            guardado()
            ponerCarrito()
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            producto.cantidad++
            guardado()
            ponerCarrito()
        })

        

        let eliminar = document.createElement("span")
        eliminar.innerText = "X"
        eliminar.className = "delete-product"
        carritoContent.appendChild(eliminar)


        eliminar.addEventListener("click", eliminarProducto)
    })
    
    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: $${total}`
    modalContainer.appendChild(totalBuying)
}
    
verCarrito.addEventListener("click", ponerCarrito)

function eliminarProducto() {
    const foundId = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })
    carritoContador()
    guardado()
    ponerCarrito()
}

function carritoContador() {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

carritoContador()