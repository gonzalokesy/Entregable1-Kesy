const menu = [
    {
        id: 1,
        plato: 'Chorizo y Morcilla de Campo',
        descripcion: 'Dúo clásico a la leña acompañado de salsa criolla y chimichurri casero.',
        precio: 4500,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 2,
        plato: 'Ojo de Bife (400g)',
        descripcion: 'Corte premium a la parrilla en su punto justo, con sal de mar y romero.',
        precio: 18500,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 3,
        plato: 'Tira de Asado Especial',
        descripcion: 'Costillar cortado transversalmente, cocción lenta para máxima ternura.',
        precio: 16200,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 4,
        plato: 'Vacío tierno',
        descripcion: 'Corte jugoso con capa de grasa crocante, servido con papas fritas rústicas.',
        precio: 17800,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 5,
        plato: 'Vino Malbec reserva',
        descripcion: 'Copa de la casa, ideal para maridar con carnes rojas.',
        precio: 3500,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 6,
        plato: 'Cerveza tirada (Pinta)',
        descripcion: 'Variedad Golden o IPA artesanal bien helada.',
        precio: 2800,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 7,
        plato: 'Limonada con menta y jengibre',
        descripcion: 'Refrescante jarra individual con almíbar natural.',
        precio: 2200,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 8,
        plato: 'Flan casero mixto',
        descripcion: 'Acompañado de dulce de leche colonial y crema.',
        precio: 3200,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 9,
        plato: 'Panqueques con dulce de leche',
        descripcion: 'Dos unidades caramelizadas a la plancha.',
        precio: 3000,
        img: '../assets/img/imgMuestra.jpg'
    },
    {
        id: 10,
        plato: 'Vigilante clásico',
        descripcion: 'Dúo de queso fresco y dulce de membrillo o batata.',
        precio: 2900,
        img: '../assets/img/imgMuestra.jpg'
    }
];

// Creación de menú
const carta = document.getElementById('listaMenu')

function renderizarMenu(array, destino) {
    array.forEach(articulo => {
        const filaMenu = document.createElement('div')
        filaMenu.className = 'menuFila'
        filaMenu.innerHTML = `
                              <div class='imgContenedor'><img src='${articulo.img}' alt='Imagen de muestra de comida'/></div>
                              <span class='carta-id'>${articulo.id}</span>
                              <div carta-info>
                              <h2 class='carta-nombre'>${articulo.plato}</h2>
                              <p class='carta-descripcion'>${articulo.descripcion}</p>
                              </div>     
                              <p class='carta-precio'>${articulo.precio}</p>
                              <div class='botones'>
                              <div class='contador'>
                              <button id='restar-${articulo.id}' class='boton-restar'>-</button>
                              <span id='contador-${articulo.id}' class='span-contador'>0</span>
                              <button id='sumar-${articulo.id}' class='boton-sumar'>+</button>
                              </div>
                              <button id='agregar-${articulo.id}'class='boton-agregar'>Agregar</button>
                              </div>
                              `
        destino.appendChild(filaMenu)
    })
    activarBotones()
}

function activarBotones() {
    const botonesSumar = document.querySelectorAll('.boton-sumar')
    const botonesRestar = document.querySelectorAll('.boton-restar')
    const botonesAgregar = document.querySelectorAll('.boton-agregar')
    botonesSumar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = idBoton.split('-')[1]
            const spanCantidad = document.getElementById(`contador-${idProducto}`)
            let valorActual = parseInt(spanCantidad.innerText)
            valorActual = valorActual + 1
            spanCantidad.innerText = valorActual
        })
    })
    botonesRestar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = idBoton.split('-')[1]
            const spanCantidad = document.getElementById(`contador-${idProducto}`)
            let valorActual = parseInt(spanCantidad.innerText)
            if (valorActual > 0) {
                valorActual = valorActual - 1
                spanCantidad.innerText = valorActual
            }
        })
    })
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = parseInt(idBoton.split('-')[1])
            const spanCantidad = document.getElementById(`contador-${idProducto}`)
            let cantidad = parseInt(spanCantidad.innerText)
            if (cantidad > 0) {
                const buscarProducto = menu.find(plato => plato.id === idProducto)
                agregarAlPedido(buscarProducto, cantidad)
                spanCantidad.innerText = '0'
            } else {
                alert('La cantidad a agregar al pedido debe ser mayor que 0')
            }
        })
    })
}

function agregarAlPedido(producto, cantidad) {
    let pedido = JSON.parse(localStorage.getItem('pedido'))
    if (pedido == null) {
        const primerPedido = {
            id: producto.id,
            plato: producto.plato,
            precio: producto.precio,
            img: producto.img,
            cantidad: cantidad
        }
        pedido = []
        pedido.push(primerPedido)
        localStorage.setItem('pedido', JSON.stringify(pedido))
    } else {
        const busquedaProducto = pedido.find(p => p.id === producto.id)
        if (busquedaProducto) {
            busquedaProducto.cantidad = busquedaProducto.cantidad + cantidad
        } else {
            pedido.push({
                id: producto.id,
                plato: producto.plato,
                precio: producto.precio,
                img: producto.img,
                cantidad: cantidad
            })
        }
        localStorage.setItem('pedido', JSON.stringify(pedido))
    }
}


renderizarMenu(menu, carta)

