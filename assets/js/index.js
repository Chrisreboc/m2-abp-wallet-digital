//VERIFICACIÓN DE UN LOGIN ACTIVO EN LOCALSTORAGE
let login = localStorage.getItem("login");

if(login){
    alert("Su sesión se encuentra activa.");
    location.href = "menu.html";
}

//CREDENCIALES DE ACCESO SIMULADAS
const EMAIL_DB = "admin@admin.cl";
const PASSWORD_DB = "12345";

//CHEQUEO DE DATOS EN FORMULARIO
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function(event){
    event.preventDefault();

    //CAPTURA DE VALORES EN INPUTS
    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;

    if (EMAIL_DB == email && PASSWORD_DB == password){
        alert("Se ha iniciado sesión correctamente.");
        formLogin.reset();

        location.href = "menu.html";

        //PERSISTENCIA DEL LOGIN
        localStorage.setItem("login", true);
    }else{
        alert("El email o contraseña estan incorrectos, vuelve a intentar.")
    }
});