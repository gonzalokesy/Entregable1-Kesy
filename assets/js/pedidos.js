const pedido = document.getElementById('listaPedido')

function renderizarPedido(destino) {
    const pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
    const totales = totalPedido(pedidosTotales.pedido)
    destino.innerHTML = ""
    pedidosTotales.pedido.forEach(comanda => {
        const filaPedido = document.createElement('div')
        filaPedido.className = 'pedidosFila'
        filaPedido.innerHTML = `
                                <div class='pedido-info'>
                                <span>${comanda.plato}</span>
                                <span>Cantidad ordenada: ${comanda.cantidad}</span>
                                </div>
                                <div class='pedido-precio'>
                                <span>Precio unitario: ${comanda.precio}</span>
                                <span>Precio total: ${comanda.precio * comanda.cantidad}</span>
                                </div>

                                <div class='pedido-botones'>
                                <div class='pedido-contador'>
                                <button id='pedido-restar-${comanda.id}' class='boton-restar-pedido'>-</button>
                                <span id='pedido-contador-${comanda.id}' class='span-contador-pedido'>${comanda.cantidad}</span>
                                <button id='pedido-sumar-${comanda.id}' class='boton-sumar-pedido'>+</button>
                                </div>
                                <button id='pedido-eliminar-${comanda.id}'class='boton-eliminar-pedido'>Eliminar</button>
                                </div>
                               `
        const filaTotales = document.createElement('div')
        filaTotales.className = 'pedidosTotales'
        filaTotales.innerHTML = `
                                <p>Total del pedido: ${totales.totalPedido}</p>
                                <p>Cantidad de platos: ${totales.cantidadPedido}</p>
                                `
        destino.appendChild(filaPedido)
        destino.appendChild(filaTotales)
    })
    botonesPedidos()
}

function botonesPedidos() {
    const sumarPedidos = document.querySelectorAll('.boton-sumar-pedido')
    const restarPedidos = document.querySelectorAll('.boton-restar-pedido')
    const eliminarPedidos = document.querySelectorAll('.boton-eliminar-pedido')

    sumarPedidos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = parseInt(idBoton.split("-")[2])
            const pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
            const productoSeleccionado = pedidosTotales.pedido.find(p => idProducto === p.id)
            productoSeleccionado.cantidad = productoSeleccionado.cantidad + 1
            localStorage.setItem('cliente', JSON.stringify(pedidosTotales))
            renderizarPedido(pedido)
        })
    })
    restarPedidos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = parseInt(idBoton.split("-")[2])
            const pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
            const productoSeleccionado = pedidosTotales.pedido.find(p => idProducto === p.id)
            if (productoSeleccionado.cantidad > 1) {
                productoSeleccionado.cantidad = productoSeleccionado.cantidad - 1
                localStorage.setItem('cliente', JSON.stringify(pedidosTotales))
                renderizarPedido(pedido)
            }
        })
    })
    eliminarPedidos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = parseInt(idBoton.split("-")[2])
            let pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
            const productoFiltrados = pedidosTotales.pedido.filter(p => p.id !== idProducto)
            pedidosTotales.pedido = productoFiltrados
            localStorage.setItem('cliente', JSON.stringify(pedidosTotales))
            renderizarPedido(pedido)
        })
    })
}

function totalPedido(datos) {
    const total = datos.reduce((acc, producto) => {
        acc.totalPedido = (producto.precio * producto.cantidad) + acc.totalPedido
        acc.cantidadPedido = acc.cantidadPedido + producto.cantidad
        return acc
    }, { totalPedido: 0, cantidadPedido: 0 })
    return total
}

renderizarPedido(pedido)