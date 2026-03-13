// Renderizaciones

function renderizarPedido() {

    const pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
    const pedido = document.getElementById('listaPedido')
    const lugarConsumo = pedidosTotales.tipo;
    pedido.innerHTML = ""

    if (!pedidosTotales.pedido || pedidosTotales.pedido.length === 0) {
        if (!pedidosTotales.pedidosComandados) {
            sinPedidos();
            return;
        } else {
            pedido.innerHTML = `<p class="mensaje-vacio">Usted no cuenta con ningún pedido pendiente.</p>`;
            renderizarAccionesPedidos(pedidosTotales.tipo);
            renderizarPedidosComandados();
        }
    }


    pedidosTotales.pedido.forEach(comanda => {
        const filaPedido = document.createElement('div')
        filaPedido.className = 'pedidosFila'
        filaPedido.innerHTML = `
                                <div class='pedido-info'>
                                    <span class='pedido-nombre-plato'>${comanda.plato}</span>
                                    <span class='pedido-cantidad-detalle'>Cantidad ordenada: ${comanda.cantidad}</span>
                                </div>
                                <div class='pedido-precio'>
                                    <span class='precio-subtotal'>Total: $${comanda.precio * comanda.cantidad}</span>
                                    <span class='precio-unitario'>Unitario: $${comanda.precio}</span>
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
        pedido.appendChild(filaPedido)
    })

    renderizarAccionesPedidos(lugarConsumo)
    renderizarPedidosComandados()
    botonesPedidos()
    accionesPedidos()
    renderizarTotales()
}

function sinPedidos() {
    const pedido = document.querySelector('#listaPedido');
    const btnRealizarPedido = document.querySelector('#boton-pedido');
    const totales = document.querySelector('#contenedor-totales');

    pedido.innerHTML = "";
    btnRealizarPedido.innerHTML = "";
    totales.innerHTML = "";

    pedido.innerHTML = '<p class="mensaje-vacio">Usted aún no ha realizado ningún pedido.</p>';;
}

function renderizarTotales() {
    const comanda = JSON.parse(localStorage.getItem('cliente'))
    const contenedorTotales = document.getElementById('contenedor-totales');
    const contenedorTotalesComandados = document.getElementById('contenedor-totalesComandados');
    contenedorTotales.innerHTML = "";

    if (comanda.pedido && comanda.pedido.length > 0) {
        const totales = totalesPedido(comanda.pedido)
        const filaTotales = document.createElement('div');
        filaTotales.className = 'pedidosTotales';
        filaTotales.innerHTML = `
                                <p class="total-texto">Total del pedido: <span class="total-monto">$${totales.totalPedido}</span></p>
                                <p class="cantidad-texto">Platos seleccionados: ${totales.cantidadPedido}</p>
                                `;
        contenedorTotales.appendChild(filaTotales)
    }

    if ((comanda.pedido && comanda.pedido.length === 0 && comanda.pedidosComandados)) {
        const totales = totalesPedido(comanda.pedidosComandados)
        const filaTotales = document.createElement('div');
        filaTotales.className = 'pedidosTotales';
        filaTotales.innerHTML = `
                                <p class="total-texto">Total de la cuenta: <span class="total-monto">$${totales.totalPedido}</span></p>
                                <p class="cantidad-texto">Platos Consumidos: ${totales.cantidadPedido}</p>
                                `;
        contenedorTotalesComandados.appendChild(filaTotales)
    }
}

function renderizarAccionesPedidos(decisionComensal) {
    const botonPedido = document.querySelector('#boton-pedido');
    const botonCuenta = document.querySelector('#boton-cuenta');
    const existenciaPedidos = JSON.parse(localStorage.getItem('cliente'))
    const cantidadPedidos = existenciaPedidos.pedido.length;
    botonPedido.innerHTML = "";
    botonCuenta.innerHTML = "";

    if (decisionComensal === 'local') {
        if (cantidadPedidos > 0 && !(existenciaPedidos.pedidosComandados)) {
            botonPedido.innerHTML = `
                                <button type='button' class='btn-decisionPedido' id='btn-realizarPedido'>Realizar pedido</button>
                                `
        }
        if (cantidadPedidos > 0 && existenciaPedidos.pedidosComandados) {
            botonPedido.innerHTML = `
                                <button type='button' class='btn-decisionPedido' id='btn-realizarPedido'>Realizar pedido</button>
                                `
        }
        if (cantidadPedidos === 0 && existenciaPedidos.pedidosComandados) {
            botonCuenta.innerHTML = `
                                <button type='button' class='btn-decisionPedido' id='btn-pedirCuenta'>Pedir cuenta</button>
                                `
        }
    } else {
        botonPedido.innerHTML = `
                                <button type='button' class='btn-decisionPedido' id='btn-pedirCuentaDelivery'>Realizar pedido</button>
                                `
    }
};

function renderizarPedidosComandados() {
    const comanda = JSON.parse(localStorage.getItem('cliente'));
    const renderComandas = document.querySelector('#listaPedidosComandados');
    renderComandas.innerHTML = ""

    const encabezado = document.createElement('h2')
    encabezado.innerText = 'Resumen de pedidos'

    if (comanda.pedidosComandados) {
        renderComandas.appendChild(encabezado)
        comanda.pedidosComandados.forEach(platoExistente => {
            const fila = document.createElement('div');
            fila.className = 'pedidoFilaComanda'
            fila.innerHTML = `                   
                                        <div class='pedido-info'>
                                    <span class='pedido-nombre-plato'>${platoExistente.plato}</span>
                                    <span class='pedido-cantidad-detalle'>Cantidad ordenada: ${platoExistente.cantidad}</span>
                                </div>
                                <div class='pedido-precio'>
                                    <span class='precio-subtotal'>Total: $${platoExistente.precio * platoExistente.cantidad}</span>
                                    <span class='precio-unitario'>Unitario: $${platoExistente.precio}</span>
                                </div>
                                        `
            renderComandas.appendChild(fila)
        })
    }
}

// Funcionalidad botones

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
            renderizarPedido()
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
                renderizarPedido()
            }
        })
    })
    eliminarPedidos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idBoton = e.currentTarget.id
            const idProducto = parseInt(idBoton.split("-")[2])
            let pedidosTotales = JSON.parse(localStorage.getItem('cliente'))
            const platoSeleccionado = pedidosTotales.pedido.find(p => p.id === idProducto)
            const productoFiltrados = pedidosTotales.pedido.filter(p => p.id !== idProducto)

            Swal.fire({
                title: "¿Desea eliminar el plato?",
                html: `<p>Usted eliminara <strong>${platoSeleccionado.plato}</strong> de su pedido.</p>
                        <hr>
                        <p><strong>¿Desea continuar?</strong></p>`
                ,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "¡Si! Quiero eliminarlo"
            }).then((result) => {
                if (result.isConfirmed) {
                    pedidosTotales.pedido = productoFiltrados
                    localStorage.setItem('cliente', JSON.stringify(pedidosTotales))
                    renderizarPedido()
                    Swal.fire({
                        title: "¡Plato eliminado!",
                        text: "El plato fue eliminado de su selección.",
                        icon: "success"
                    });
                }
            });
        })
    })
}

function accionesPedidos() {
    const comanda = JSON.parse(localStorage.getItem('cliente'));
    const btnAccionesPedidos = document.querySelectorAll('.btn-decisionPedido');
    btnAccionesPedidos.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idbtn = e.currentTarget.id;
            switch (idbtn) {

                case 'btn-realizarPedido':
                    Swal.fire({
                        title: "¿Desea confirmar el pedido?",
                        html: `<p>Una vez confirmado el pedido será enviado a la cocina para su preparación.</p>
                        <hr>
                        <p><strong>¿Desea continuar?</strong></p>`
                        ,
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Confirmar pedido"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (comanda.pedidosComandados) {
                                comanda.pedido.forEach(nuevoPedido => {
                                    let busquedaPlato = comanda.pedidosComandados.find(platosExistentes => platosExistentes.id === nuevoPedido.id);
                                    if (busquedaPlato) {
                                        busquedaPlato.cantidad = busquedaPlato.cantidad + nuevoPedido.cantidad
                                    } else {
                                        comanda.pedidosComandados.push(nuevoPedido);
                                    }
                                })
                                comanda.pedido = []
                            } else {
                                comanda.pedidosComandados = [];
                                comanda.pedido.forEach(p => comanda.pedidosComandados.push(p));
                                comanda.pedido = []
                            }
                            localStorage.setItem('cliente', JSON.stringify(comanda))
                            comanda.pedido = []
                            renderizarPedido()
                            Swal.fire({
                                title: "¡Pedido confirmado!",
                                text: "Su comida será preparada y servida a la brevedad.",
                                icon: "success"
                            });
                        }
                    });
                    break;

                case 'btn-pedirCuenta':
                    const { totalPedido, cantidadPedido } = totalesPedido(comanda.pedidosComandados)

                    Swal.fire({
                        title: '🧾 Resumen del pedido',
                        html: `
                                <div style="text-align: left;">
                                    <p><strong>Cliente:</strong> ${'Mesa: ' + comanda.mesa}</p>
                                    <hr>
                                    <p>Cantidad de platos: ${cantidadPedido}</p>
                                    <p style="font-size: 1.2rem;"><strong>Total a pagar: $${totalPedido}</strong></p>
                                </div>
                            `,
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#28a745',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, finalizar y pagar',
                        cancelButtonText: 'Volver al pedido'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('cliente');

                            Swal.fire({
                                title: '¡Muchas gracias!',
                                text: 'Un mozo se acercará para que puedas realizar el pago',
                                icon: 'success',
                                confirmButtonText: 'Cerrar'
                            }).then(() => {
                                //No sabia como hacer para poder redirigir al inicio luego de hacer click en cerrar.
                                //Se me ocurrió simular un click en un botón que solo viva en memoria y funcionó. No sé que tan prolijo es, y si existen formas mejores (seguramente). Pero es lo que se me ocurrió.
                                const redirigirInicio = document.createElement('a');
                                redirigirInicio.href = '../index.html';
                                redirigirInicio.click();
                            });
                        }
                    });
                    break;

                case 'btn-pedirCuentaDelivery':


                    const { totalPedido: totalTakeaway, cantidadPedido: cantidadTakeaway } = totalesPedido(comanda.pedido)

                    Swal.fire({
                        title: '🧾 Resumen del pedido',
                        html: `
                                <div style="text-align: left;">
                                    <p>¡Hola <strong>${comanda.nombre}</strong>!</p>
                                    <hr>
                                    <p>Agendamos tu número <strong>${comanda.telefono}</strong> y nos comunicaremos con vos ante cualquier eventualidad.</p>
                                    <hr>
                                    <p><strong>Detalle del pedido: </strong></p>
                                    <p>Cantidad de platos: ${cantidadTakeaway}</p>
                                    <p style="font-size: 1.2rem;"><strong>Total a pagar: $${totalTakeaway}</strong></p>
                                </div>
                            `,
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#28a745',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, finalizar y pagar',
                        cancelButtonText: 'Volver al pedido'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('cliente');

                            Swal.fire({
                                title: '¡Muchas gracias!',
                                html: '<p>Recordá <strong>acercarte a la caja</strong> cuando llegues el local y <strong>abonar el pedido a tu nombre</strong>.</p>',
                                icon: 'success',
                                confirmButtonText: 'Cerrar'
                            }).then(() => {
                                const redirigirInicio = document.createElement('a');
                                redirigirInicio.href = '../index.html';
                                redirigirInicio.click();
                            });
                        }
                    });
                    break;
            };
        });
    });
}

// Otras funciones

function totalesPedido(datos) {
    const total = datos.reduce((acc, producto) => {
        acc.totalPedido = (producto.precio * producto.cantidad) + acc.totalPedido
        acc.cantidadPedido = acc.cantidadPedido + producto.cantidad
        return acc
    }, { totalPedido: 0, cantidadPedido: 0 })
    return total
}

renderizarPedido();