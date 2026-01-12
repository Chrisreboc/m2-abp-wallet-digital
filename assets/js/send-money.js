//VERIFICACIÓN DE UN LOGIN ACTIVO EN LOCALSTORAGE
let login = localStorage.getItem("login");

if (!login) {
    alert("No has iniciado sesión, por favor ingresa tus datos para continuar.");
    location.href = "index.html";
}

//EVENTO AL CERRAR SESIÓN
const btnLogout = document.getElementById("cerrar-session-button");

btnLogout.addEventListener("click", function () {
    localStorage.removeItem("login");
    localStorage.removeItem("saldo");

    alert("Sesión cerrada correctamente.");
    location.href = "index.html";
});

//JS COMPARTIDO

let historialTransacciones =
    JSON.parse(localStorage.getItem("historialTransacciones")) || [];

function guardarHistorial() {
    localStorage.setItem(
        "historialTransacciones",
        JSON.stringify(historialTransacciones)
    );
}

//FORMATO DIVISA

function formatearCLP(valor) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0
    }).format(valor);
}

//LISTA DE CONTACTOS PREDETERMINADA

let contacto1 = {
    nombre: "Ana",
    apellido: "Jimenez",
    alias: "Anita",
    tipoDeCuenta: "Cuenta Corriente",
    cbu: "111111111",
    banco: "Banco 1"
}

let contactos = [contacto1];

function crearInfoContacto(contacto) {

    if (!contacto) {
        return "";
    }

    let { nombre, apellido, cbu, alias, banco, tipoDeCuenta } = contacto;

    let infoContacto = `
        <div class="d-flex justify-content-center pb-2">
            <div class="align-content-center border rounded my-1 col-2">
                <img src="./assets/img/account_circle_24dp_999999_FILL0_wght400_GRAD0_opsz24.svg">
            </div>
            <ul class="text-start p-3 border rounded my-1 list-group list-unstyled col-10">
                <li class="fs-5 fw-bold">${nombre} ${apellido}</li>
                <hr class="my-1">
                <li>${alias}</li>
                <li>${banco}</li>
                <li>${tipoDeCuenta}</li>
                <li>${cbu}</li>
            </ul>
        </div>
    `;

    return infoContacto;
}

function agregarContactosDom(listaContactos) {

    let elementosLista = "";

    listaContactos.forEach(contacto => {
        elementosLista += crearInfoContacto(contacto);
    });

    $("#contactListContainer").html(elementosLista);
}

//CARGAR CONTACTOS GUARDADOS
const contactosGuardados = localStorage.getItem("contactos");

if (contactosGuardados) {
    contactos = JSON.parse(contactosGuardados);
} else {
    guardarContactosLocalStorage(); // guarda el contacto default
}

agregarContactosDom(contactos);

//FUNCIÓN GUARDAR CONTACTOS EN LOCALSTORAGE

function guardarContactosLocalStorage() {
    localStorage.setItem("contactos", JSON.stringify(contactos));
}

//INICIO FUNCION AGREGAR NUEVOS CONTACTOS

$("#formAddContacto").on("submit", function (event) {
    event.preventDefault();

    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let alias = $("#alias").val();
    let banco = $("#banco option:selected").text();
    let tipoDeCuenta = $("#tipoDeCuenta option:selected").text();
    let cbu = $("#cbu").val();

    let nuevoContacto = {
        nombre,
        apellido,
        alias,
        banco,
        tipoDeCuenta,
        cbu,
    };

    contactos.push(nuevoContacto);
    guardarContactosLocalStorage();
    agregarContactosDom(contactos);


    alert(`El contacto ${nombre} ${apellido}, se ha agregado con exito.`);

    const modalElement = document.getElementById("modalAgregarContacto");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    $("#formAddContacto")[0].reset();

    modal.hide();

    document.getElementById("btnAbrirModalContacto").focus();

});
// FIN FUNCIÓN AGREGAR NUEVOS CONTACTOS

//INICIO FUNCION BUSCAR CONTACTOS
$("#searchContact").on("input", function (event) {

    let textoBusqueda = $(this).val();

    //Convertir a minúsculas y quitar espacios
    textoBusqueda = textoBusqueda.toLowerCase();

    //Quitar espacios adicionales
    textoBusqueda = textoBusqueda.trim();

    let contactosFiltrados = contactos.filter(function (contacto) {

        let nombre = contacto.nombre.toLowerCase();
        let apellido = contacto.apellido.toLowerCase();
        let alias = contacto.alias.toLowerCase();

        let nombreApellido = `${nombre} ${apellido};`;

        //Reglas de filtrado
        let reglaNombre = nombre.includes(textoBusqueda);
        let reglaApellido = apellido.includes(textoBusqueda);
        let reglaAlias = alias.includes(textoBusqueda);
        let reglaNombreApellido = nombreApellido.includes(textoBusqueda);

        if(reglaNombre || reglaApellido || reglaAlias || reglaNombreApellido){
            return contacto;
        }

    });

    agregarContactosDom(contactosFiltrados);

});
//FIN EVENTO BUSACAR CONTACTOS

//INICIO LÓGICA FORM ENVIAR DINERO

let saldo = Number(localStorage.getItem("saldo")) || 0;

// SELECT CONTACTOS
function crearInfoContactoSelect(contacto) {
    if (!contacto) return "";

    let { cbu, alias, banco } = contacto;

    return `
      <option value="${cbu}">
        ${alias} - ${cbu} - ${banco}
      </option>
    `;
}

function agregarContactoSelect(listaContactos) {
    let opciones = `<option value="" disabled selected>Selecciona Contacto</option>`;

    listaContactos.forEach(contacto => {
        opciones += crearInfoContactoSelect(contacto);
    });

    $("#enviarContacto").html(opciones);
}

// SALDO
function actualizarSaldosDOM() {
    $(".outputSaldo").text(formatearCLP(saldo));
    $("#enviarMonto").attr("max", saldo);
}

// FORM ENVIAR DINERO
$("#formEnviarDinero").on("submit", function (event) {
    event.preventDefault();

    let monto = Number($("#enviarMonto").val());
    let cbuDestino = $("#enviarContacto").val();

    if (monto > saldo) {
        alert(`Saldo insuficiente.\nSaldo disponible: ${formatearCLP(saldo)}`);
        return;
    }

    // BUSCAR CONTACTO
    let contacto = contactos.find(c => c.cbu === cbuDestino);

    if (!contacto) {
        alert("Contacto no encontrado");
        return;
    }

    // CREAR TRANSACCIÓN
    let nuevaTransaccion = {
        tipo: "egreso",
        nombre: contacto.nombre,
        apellido: contacto.apellido,
        banco: contacto.banco,
        tipoDeCuenta: contacto.tipoDeCuenta,
        cbu: contacto.cbu,
        monto: monto,
        fecha: new Date().toISOString()
    };

    historialTransacciones.push(nuevaTransaccion);
    guardarHistorial();



    // ACTUALIZAR SALDO
    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    alert(`Se enviaron ${formatearCLP(monto)} a la cuenta ${cbuDestino}`);

    const modalElement = document.getElementById("modalEnviarDinero");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    $("#formEnviarDinero")[0].reset();

    actualizarSaldosDOM();

    
});

// MAIN
function main() {
    agregarContactosDom(contactos);
    agregarContactoSelect(contactos);
    actualizarSaldosDOM();
}

main();





