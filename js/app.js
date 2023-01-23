// VARIABLES

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaCurso = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];





// esta primera funcion manda llamar a todos los eventListener
cargarEventListener();
function cargarEventListener (){
    // cuando agregas un curso a presionando 'agregar al carrito'
    listaCurso.addEventListener('click', agregarCurso);
    // Eliminar cursos del Carrito
    carrito.addEventListener('click',eliminarCurso);
    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito=[];
        limpiarHTML();
    } )
};


// FUNCIONES
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    }
} 

// Elimina un curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => {
            if(curso.id === cursoId){
                curso.cantidad--;
                if (curso.cantidad < 1){
                    delete curso;
                }
                else{
                    return curso;
                }
            }
            else 
            {
                return curso;
            }
        });
        

        carritoHTML();
        
    }
}
// LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK
function leerDatosCurso(curso){
    // console.log(curso);

// Crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
}
//console.log(infoCurso)


// Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

if (existe) {
    //actualizamos  la cantidad
    const cursos = articulosCarrito.map(curso=> {
        if (curso.id === infoCurso.id){
        curso.cantidad++;
        return curso; // retorna el obj actualizado 
    } else{
        return curso;// retorna los obj que no son duplicados
    }
});
    articulosCarrito = [... cursos];
} else{
    // Agrega elem al array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

}




    // console.log(articulosCarrito);
    carritoHTML();

}

// Muestra el carrito en el Html

function carritoHTML(){

    // Limpiar el HTML (para que no agregue y repita elementos)
    
    limpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width= "100">
        </td>
        <td>
            ${titulo}
        </td>
        
        <td>
            ${precio}
        </td>

        <td>
            ${cantidad}
        </td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML (){
    // Forma Lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild) 
    }
}