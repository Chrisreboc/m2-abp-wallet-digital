# Proyecto ABP MÓDULO 2

**Autor**: Cristóbal Rebolledo

## Descripción del proyecto

el proyecto consiste en una wallet digital...

## Repositorio

Github: https://github.com/Chrisreboc/m2-abp-wallet-digital

## Deploy del proyecto:

https://chrisreboc.github.io/m2-abp-wallet-digital/

## Requerimientos:

💡 Desafío: Crea una billetera digital básica que incluya las siguientes pantallas:


Pantalla de inicio de sesión (login.html):


1. Agrega un evento al botón "Iniciar sesión".

- Implementa la funcionalidad de validar las credenciales ingresadas utilizando JavaScript. Check!

Si las credenciales son correctas:

- mostra un mensaje de éxito. Check!

- redirige a la pantalla del menú principal (menu.html). Check!

- Si las credenciales son incorrectas, mostrar un mensaje de error. Check!

- El boton de menu principal no debe verse en la pantalla login, ya que ahora tenemos que poder redirigir a la pantalla menú con el inicio de login. Check


2. Pantalla del menú principal (menu.html):


- Agregar eventos a estos tres botones: "Depositar", "Enviar Dinero" y "Últimos Movimientos" para que al hacer clic aparezca una leyenda que diga, redirigiendo a “nombre de la pantalla seleccionada”. EJemplo: redirigiendo a últimos movimientos. Check!

- Implementa la funcionalidad de los botones utilizando JavaScript para redirigir a las pantallas correspondientes. Check!


3. Pantalla de depósito (deposit.html):


Agregar evento al botón "Realizar depósito".

- Implementa la funcionalidad de actualizar el saldo de la cuenta con el monto depositado y mostrar el nuevo saldo en la pantalla del menú principal al hacer clic en "Realizar depósito". (Incrementando el monto inicial) CHECK!


4. Pantalla de enviar dinero (sendmoney.html):


- Agregar evento al botón "Agregar nuevo contacto" para abrir un formulario emergente donde se pueden agregar nuevos contactos. CHECK

Este formulario debe pedir los siguientes datos:

- Nombre y apellido CHECK

- número de CBU CHECK

- Alias CHECK

- Nombre del Banco CHECK

 - Al seleccionar un contacto y hacer clic en "Enviar dinero", mostrar un mensaje de confirmación y actualizar el saldo de la cuenta en la pantalla del menú principal. CHECK


5. Pantalla de Últimos movimientos (transactions.html):


Reemplazar la lista de movimientos codificada en el HTML con una lista ficticia de transacciones (listaTransacciones). Debes reemplazar esta lista ficticia con tu lista real de transacciones.

Filtrar por tipo de movimiento:

Agregar un elemento select en el formulario para filtrar los movimientos por tipo (compra, depósito, transferencia recibida) y utilizar jQuery para mostrar dinámicamente los últimos movimientos según el tipo seleccionado en el filtro

Cada vez que se selecciona un tipo de transacción en el filtro, se llama a la función mostrarUltimosMovimientos(filtro) que muestra los movimientos correspondientes en la lista. La función getTipoTransaccion(tipo) se utiliza para obtener el tipo de transacción en formato legible para mostrarlo en la lista.



Implementa la interactividad de las pantallas utilizando JavaScript:


Captura los eventos de los formularios y botones mediante JavaScript.

Valida los campos del formulario antes de enviar los datos.

Actualiza dinámicamente la información en la pantalla del menú principal cuando se realizan depósitos, envíos de dinero, etc.

💡Recorda que cada pantalla debe estar en su propio archivo HTML y debes enlazarlos correctamente entre sí utilizando enlaces o redirecciones según lo indique la consigna. Además, utiliza CSS y Bootstrap para personalizar la apariencia de las pantallas y hacerlas atractivas y responsive.