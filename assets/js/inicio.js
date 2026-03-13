function botoneraInicio() {
    const botonesInicio = document.querySelectorAll('.boton-opcion')
    botonesInicio.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idbtn = e.currentTarget.id;
            vistaInicio(idbtn)
        })
    })
}

function vistaInicio(id) {
    const contenedor = document.querySelector('#contenedor-vistas')
    if (id === 'boton-mesa') {
        contenedor.innerHTML = `
        <form id="formulario-inicio" action="./pages/menu.html">
        <div class='campo-formulario'>
        <label for="mesa-cliente">Ingrese su número de mesa</label>
        <input id="mesa-cliente" required>
        <d/iv>
        <button type="submit" class="btn-principal">MENU</button>
        </form>
        `
    } else {
        contenedor.innerHTML = `
            <form id="formulario-inicio" action="./pages/menu.html">
            <div class='campo-formulario'>
            <label for="nombre-cliente">Nombre</label>
            <input id="nombre-cliente"type="text" required>
            </div>
            <div class='campo-formulario'>
            <label for="telefono-cliente">Télefono</label>
            <input id="telefono-cliente"type="text" required>
            </div>
            <button type="submit" class="btn-principal">MENU</button>
            </form>
            `
    };
    enviarFormulario();
};

function enviarFormulario() {
    const formulario = document.querySelector('#formulario-inicio');
    formulario.addEventListener('submit', () => {
        const numeroMesa = document.querySelector('#mesa-cliente');
        const nombreCliente = document.querySelector('#nombre-cliente');
        const telefonoCliente = document.querySelector('#telefono-cliente');
        let datosCliente = {}

        if (numeroMesa) {
            datosCliente = {
                tipo: 'local',
                mesa: numeroMesa.value
            };
        } else {
            datosCliente = {
                tipo: 'takeAway',
                nombre: nombreCliente.value,
                telefono: telefonoCliente.value
            };
        };
        localStorage.setItem('cliente', JSON.stringify(datosCliente))
    });
};

botoneraInicio()
