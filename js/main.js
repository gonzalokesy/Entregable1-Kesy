const numbers = [];

const entryNumbers = () => {
    let number = Number(prompt('Por favor ingrese un número: '));
    if (isNaN(number) || number === null || number === "") {
        alert("Debe ingresar un número válido, por favor intente de nuevo");
    } else {
        if (numbers.indexOf(number) === -1) {
            numbers.push(number);
            alert(`El número ${number} fue cargado con éxito.`);
        } else {
            alert(`El número ${number} ya existe y no puede volver a ser cargado.`);
        };
    }

};

const listNumbers = (array) => {
    let list = array.join(",")
    alert(`Los números ingresados son los siguientes: ${list}`)
}

const qNumbers = (array) => {
    let quantity = array.length;
    alert(`La cantidad de números ingresados es de:  ${quantity}`)
}

const addAllNumbers = (array) => {
    let result = 0
    for (let i = 0; i < array.length; i++) {
        result = result + array[i]
    }
    return result
}

const deleteNumber = () => {
    let value = Number(prompt(`Ingrese valor a eliminar: `))
    let position = numbers.indexOf(value);

    if (position !== -1) {
        numbers.splice(position, 1)
        alert(`El elemento ${value} se ha eliminado con éxito. La lista actualizada es: ${numbers.join(",")}`)
    } else {
        alert(`El elemento ${value} no existe en la lista. Los elementos existentes son: ${numbers.join(",")}. Por favor vuelva a intentarlo.`)
    }
}

const searchNumber = (number) => {
    let search = numbers.indexOf(number);
    if (search !== -1) {
        alert(`El número ${number} existe y está en la posición ${search}`)
    } else {
        alert(`El número ${number} no fue cargado.`)
    }
}

const optionsMenu = () => {
    let quit = false
    while (quit === false) {
        let option = Number(prompt(`Ingrese la opción deseada: 
            1 - Ingresar número.
            2 - Listar números ingresados.
            3 - Conocer la cantidad de número ingresados.
            4 - Sumar todos los números.
            5 - Eliminar un número.
            6 - Buscar un número.
            7 - Salir.`
        ))
        switch (option) {
            case 1:
                entryNumbers();
                break;
            case 2:
                listNumbers(numbers)
                break;
            case 3:
                qNumbers(numbers)
                break;
            case 4:
                alert(`La suma de todos los números cargados es de: ${addAllNumbers(numbers)}`)
                break;
            case 5:
                deleteNumber()
                break;
            case 6:
                let number = Number(prompt("Ingrese el número que desea buscar: "))
                searchNumber(number)
                break;
            case 7:
                quit = true;
                console.log("Usted ha salido de la aplicación. Muchas gracias por utilziarla.");
                alert("Aplicación cerrada.");
                break;
        };
    };
};

optionsMenu()

