//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
// Event listeners
listaCursos.addEventListener("click", agregarCurso);
carrito.addEventListener("click", eliminarCurso);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function leerDatosCurso(curso) {
    //Crea un objeto con el contenido del curso
    const precioNuevo = curso.querySelector(".precio span").textContent;//Guardo el precio con $
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: precioNuevo.slice(1),//le quito el carcater $
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //Actualiza la cantidad
        articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                const precioNumero = Number.parseInt(infoCurso.precio);//Convertir string a int
                curso.precio = precioNumero * curso.cantidad;
                return curso;
            }
            else {
                return curso;
            }
        });
    }
    else {
        articulosCarrito.push(infoCurso); //Agrega elementos al array
    }

    carritoHTML(); //Llama funcion que guarda en el icono carrito
}
function carritoHTML() {
    //limpiar HTML
    limpiarHTML();
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${curso.imagen}" width="100px"></td>
            <td>${curso.titulo}</td>
            <td>$ ${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
    `;
        contenedorCarrito.appendChild(row); //agrega elementos a la etiqueta tbody
    });
}
//Elimina los cursos del tbody
function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}
//Elimina los cursos seleccionados del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute("data-id");
        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();//iterar sobre el carrito el HTML
    }
}
// Vacia elementos del carrito
function vaciarCarrito(e) {
    if (e.target.classList.contains('button')) {
        articulosCarrito = [];
        carritoHTML();
    }
}