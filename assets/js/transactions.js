let login = localStorage.getItem("login");

if(!login){
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

//DEFINIR FORMATO DIVISA
function formatearCLP(valor) {
    return valor.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP"
    });
}

// LEER HISTORIAL
let historialTransacciones =
    JSON.parse(localStorage.getItem("historialTransacciones")) || [];

function agregarTransaccionesDOM(listaTransacciones) {

    let transacciones = "";

    for (let i = listaTransacciones.length - 1; i >= 0; i--) {
        const transaccion = listaTransacciones[i]; {

        let {
            nombre,
            apellido,
            banco,
            tipoDeCuenta,
            cbu,
            monto,
            fecha,
            tipo
        } = transaccion;

        let formatoMonto = formatearCLP(Number(monto));
        let formatoFecha = moment(fecha).format("DD/MM/YY HH:mm");

        let claseMonto = tipo === "ingreso"
            ? "text-bg-success"
            : "text-bg-danger";

        transacciones += `
        <div class="row list-group-item list-group-item-action image-contact d-flex m-0">
            <div class="col-3 align-content-center border rounded my-1">
                <img src="./assets/img/account_circle_24dp_999999_FILL0_wght400_GRAD0_opsz24.svg">
            </div>
            <div class="col-9 text-start p-1 border rounded my-1">
                <p class="m-0">Transferido a:</p>
                <h4 class="m-0">${nombre} ${apellido}</h4>
                <span class="badge rounded-pill ${claseMonto} my-1">
                    ${formatoMonto}
                </span>
                <p class="m-0">${banco}</p>
                <p class="m-0">${tipoDeCuenta}</p>
                <p class="m-0">${cbu}</p>
                <small class="text-muted">${formatoFecha}</small>
            </div>
        </div>
        `;

        }

        $("#historialTransacciones").html(transacciones);
    }
}

// MAIN
agregarTransaccionesDOM(historialTransacciones);