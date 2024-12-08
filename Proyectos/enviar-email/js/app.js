//Espera a que cargue todo el HTML para ejecutarse
document.addEventListener("DOMContentLoaded", function () {
    //creamos un objeto
    const email = {
        email: "",
        asunto: "",
        mensaje: "",
    };
    //seleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");
    //Asignar eventos
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    formulario.addEventListener("submit", enviarEmail);
    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        resetFormulario();
    });
    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();
            //Crear alerta de envío
            const alertaExito = document.createElement('P');
            alertaExito.classList.add(
                "bg-green-500",
                "text-white",
                "p-2",
                "text-center",
                "rounded-lg",
                "mt-10",
                "font-bold",
                "text-sm",
                "uppercase"
            );
            alertaExito.textContent = "Mensaje enviado correctamente";
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }
    function validar(e) {
        if (e.target.value.trim() === "") {
            mostrarAlerta(
                `el campo ${e.target.id} es obligatorio`,
                e.target.parentElement
            );
            email[e.target.id] = "";
            comprobarEmail();
            return;
        }
        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement);
            email[e.target.id] = "";
            comprobarEmail();
            return;
        }
        //Llama a la funcion validar email
        limpiarAlerta(e.target.parentElement); //Funcion que limpia la alerta
        //Asignar valores al objeto
        email[e.target.id] = e.target.value.trim().toLowerCase();
        //Comprobar objeto
        comprobarEmail();
    }
    function mostrarAlerta(mensaje, referencia) {
        //Comprobar si ya existe una alerta
        limpiarAlerta(referencia);
        //Generar alerta HTML
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
        //Inyectar el error al formulario
        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600");
        //Si encuentra la alerta la remueve
        if (alerta) {
            alerta.remove();
        }
    }
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    function comprobarEmail() {
        if (Object.values(email).includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }
    function resetFormulario() {
        //Reiniciar el objeto
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();
    }
});
//Fin DOMContentLoaded