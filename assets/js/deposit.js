//VERIFICACIÓN DE UN LOGIN ACTIVO EN LOCALSTORAGE
let login = localStorage.getItem("login");

if(!login){
    alert("No has iniciado sesión, por favor ingresa tus datos para continuar.");
    location.href = "index.html";
}

//JS COMPARTIDO HISTORIAL DE TRANSACCIONES

let historialTransacciones =
    JSON.parse(localStorage.getItem("historialTransacciones")) || [];

function guardarHistorial() {
    localStorage.setItem(
        "historialTransacciones",
        JSON.stringify(historialTransacciones)
    );
}

// FORMATEADOR
const formatoCL = new Intl.NumberFormat("es-CL");

//PERSISTENCIA DE SALDO EN LA CUENTA
let saldo = localStorage.getItem("saldo");
if(saldo){
    saldo = Number(saldo);
}else{
    saldo = 200000;
}

//INPUT DE INGRESO DE SALDO
const  montoSaldo = document.getElementById("monto-saldo");
montoSaldo.innerText = formatoCL.format(saldo);

function actualizarSaldo(monto){
    if (monto <= 0 || isNaN(monto)) return;
    saldo += monto;
    alert("Se ha depositado exitosamente $" + formatoCL.format(monto));
    montoSaldo.textContent = formatoCL.format(saldo);
    //VALOR INGRESADO GUARDADO EN LOCALSTORAGE
    localStorage.setItem("saldo", saldo);

    // NUEVA TRANSACCIÓN (INGRESO)
    let nuevaTransaccion = {
        tipo: "ingreso",
        nombre: "Depósito",
        apellido: "",
        banco: "Cuenta Propia",
        tipoDeCuenta: "Ingreso",
        cbu: "-",
        monto: monto,
        fecha: new Date().toISOString()
    };

    historialTransacciones.push(nuevaTransaccion);
    guardarHistorial();
}

const formDeposit = document.getElementById("form-deposit");

formDeposit.addEventListener("submit", function(event){
    event.preventDefault();
    let montoDeposito = Number(
        document.getElementById("formGroupExampleInput").value
    ); 
    
    actualizarSaldo(montoDeposito);
});

//EVENTO AL CERRAR SESIÓN
const btnLogout = document.getElementById("cerrar-session-button");

btnLogout.addEventListener("click", function () {
    localStorage.removeItem("login");
    localStorage.removeItem("saldo");

    alert("Sesión cerrada correctamente.");
    location.href = "index.html";
});