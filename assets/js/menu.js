let menu = [];

async function obtenerPlatos() {
    try {
        const platosJson = await fetch('../platos.json');
        const platos = await platosJson.json();
        menu = platos;
        const entradas = menu.filter(p => p.categoria === 'entrada');
        renderizarMenu(entradas, carta)
    } catch (e) {
        alert('¡Un error ha ocurrido! La lista de platos no puede ser mostrada.')
    };
};


// Creación de menú
const carta = document.getElementById('listaMenu')

function renderizarMenu(array, destino) {
    destino.innerHTML = "";
    array.forEach(articulo => {
        const filaMenu = document.createElement('div')
        filaMenu.className = 'menuFila'
        filaMenu.innerHTML = `
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
    let comanda = JSON.parse(localStorage.getItem('cliente'))

    if (comanda.pedido) {
        let busquedaPlato = comanda.pedido.find(p => p.id === producto.id);
        if (busquedaPlato) {
            busquedaPlato.cantidad = busquedaPlato.cantidad + cantidad;
        } else {
            const nuevoPlato = {
                id: producto.id,
                plato: producto.plato,
                precio: producto.precio,
                cantidad: cantidad
            }
            comanda.pedido.push(nuevoPlato)
        }
    } else {
        let pedido = []
        let nuevoPedido = {
            id: producto.id,
            plato: producto.plato,
            precio: producto.precio,
            cantidad: cantidad
        }
        pedido.push(nuevoPedido)
        comanda.pedido = pedido
    }
    localStorage.setItem('cliente', JSON.stringify(comanda))
}

function vistaFiltros() {
    const botonesFiltros = document.querySelectorAll('.seleccionMenu');
    botonesFiltros.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idbtn = e.currentTarget.id;
            if (idbtn !== 'verTodo') {
                const platosFiltrados = menu.filter(p => p.categoria === idbtn);
                renderizarMenu(platosFiltrados, carta);
            } else {
                renderizarMenu(menu, carta)
            }
        })
    })

}





vistaFiltros()
obtenerPlatos()


