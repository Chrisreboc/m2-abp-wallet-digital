//VERIFICACIÓN DE UN LOGIN ACTIVO EN LOCALSTORAGE
let login = localStorage.getItem("login");

if(!login){
    alert("No has iniciado sesión, por favor ingresa tus datos para continuar.");
    location.href = "index.html";
}

// FORMATEADOR
const formatoCL = new Intl.NumberFormat("es-CL");

//SALDO DEFAULT INICIAL DE PRUEBA
let saldo = localStorage.getItem("saldo");
if(saldo) {
    saldo = Number(saldo);
}else{
    saldo = 200_000;
}

//INPUT DE INGRESO DE SALDO
const  montoSaldo = document.getElementById("monto-saldo");
montoSaldo.innerText = formatoCL.format(saldo);

//LEGENDA AL PRESIONAR DEPOSIT
function redireccionar (mensaje, enlace) {
    let mensajeRedireccion = document.getElementById("mensaje-redireccion");
    mensajeRedireccion.textContent = (mensaje);
    //DEIFINIENDO TIEMPO DE MUESTRA MENSAJE
    setTimeout(function(){
        location.href = enlace;
    }, 2000);
}

//EVENTO AL PRESIONAR DEPOSIT
const linkDeposit = document.getElementById("link-deposit");
linkDeposit.addEventListener("click", function(event){
    event.preventDefault();
    redireccionar("Redireccionando a Depositar...", "deposit.html");
});

//EVENTO AL PRESIONAR TRANSFERIR
const linkTransferir = document.getElementById("link-transferir");
linkTransferir.addEventListener("click", function(event){
    event.preventDefault();
    redireccionar("Redireccionando a Transferir...", "send-money.html");
});

//EVENTO AL PRESIONAR ÚLTIMOS MOVIMIENTOS
const linkUltmov = document.getElementById("link-ultmov");
linkUltmov.addEventListener("click", function(event){
    event.preventDefault();
    redireccionar("Redireccionando a últimos movimientos...", "transactions.html");
});

//EVENTO AL CERRAR SESIÓN
const btnLogout = document.getElementById("cerrar-session-button");

btnLogout.addEventListener("click", function () {
    localStorage.removeItem("login");
    localStorage.removeItem("saldo");

    alert("Sesión cerrada correctamente.");
    location.href = "index.html";
});