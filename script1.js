const btnModoOscuro = document.getElementById("modo-oscuro");


function cambiarModoOscuro() {
    document.body.classList.toggle("alto-contraste");
}

btnModoOscuro.addEventListener("click", cambiarModoOscuro);


const form = document.querySelector('form');
const inputNombre = document.getElementById('nom');
const inputApellido = document.getElementById('ape');
const inputEmail = document.getElementById('mail');
const inputFecha = document.getElementById('fech');
const selectPais = document.getElementById('paises');

const errorNombre = document.getElementById('control-nombre');
const errorApellido = document.getElementById('control-apellido');
const errorEmail = document.getElementById('control-email');
const errorFecha = document.getElementById('control-fechanac');
const errorPais = document.getElementById('control-paises');

function mostrarError(span, mensaje){
    span.textContent = mensaje;
    span.style.color = "red";
}

function limpiarError(span){
    span.textContent = "";
}

function validarNombre(input, span, etiqueta){
    let valor = input.value.trim();
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

    if (valor === ""){
        mostrarError(span, `El campo ${etiqueta} es obligatorio.`);
        return false;
    }

    if (!soloLetras.test(valor)){
        mostrarError(span, "Solo se permiten letras");
        return false;
    }
    limpiarError(span);
    return true;
}

function validarEmail(input, span){
    let valor = input.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        mostrarError(span, "El email es obligatorio.");
        return false;
    }

    if (!regexEmail.test(valor)) {
        mostrarError(span, "Ingrese un email válido.");
        return false;
    }
    limpiarError(span);
    return true;
}

function calcularFechaMaxima() {
    const hoy = new Date();
    const anio = hoy.getFullYear() - 18;
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // +1 porque los meses van de 0 a 11
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

function validarFecha(input, span){
    if(!input.value){
        mostrarError(span, "La fecha de nacimiento es obligatoria.");
        return false;
    }

    let fecha = new Date(input.value);
    let min = new Date(input.min);
    let max = new Date(calcularFechaMaxima());

    if(fecha < min){
        mostrarError(span, "La fecha ingresada no es válida.");
        return false;
    }
    if(fecha > max){
        mostrarError(span, "La persona debe tener mayoría de edad.");
        return false;
    }
    limpiarError(span);
    return true;
}

function validarPais(select, span){
    if(!select.value){
        mostrarError(span, "Debe seleccionar el país.");
        return false;
    }
    limpiarError(span);
    return true;
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    let nombreOk = validarNombre(inputNombre, errorNombre, "nombre");
    let apellidoOk = validarNombre(inputApellido, errorApellido, "apellido");
    let emailOk = validarEmail(inputEmail, errorEmail);
    let fechaOk = validarFecha(inputFecha, errorFecha);
    let paisOk = validarPais(selectPais, errorPais);

    if(nombreOk && apellidoOk && emailOk && fechaOk && paisOk){
        form.submit();
    }
});