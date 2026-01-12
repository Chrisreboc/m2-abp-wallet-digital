

//INICIO LÓGICA SALDO

let saldo = 200000;

if(localStorage.getItem("saldo")){
    saldo = Number(localStorage.getItem("saldo"));
}else{
    localStorage.setItem("saldo", saldo);
}

function descontarSaldo(monto){
    saldo = saldo - monto;

    if(saldo < 0){
        alert("Usted no cuenta con suficientes fondos.");
    }else{
        localStorage.setItem("saldo", saldo);
        return saldo;
    }
}

function aumentarSaldo(monto){
    saldo = saldo + monto;
    localStorage.setItem("saldo",saldo);
    return saldo;
}

//FIN LÓGICA SALDO