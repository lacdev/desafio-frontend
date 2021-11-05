// Funcionalidad de la barra de busqueda 



const posts = [
    {
        nombre: 'Manuel',
        title: 'Metodologia CRUD',
        contenido: 'En este post veremos los metodos de CRUD'
    },
    {
        nombre: 'Ramon',
        title: 'Metodologia HTML',
        contenido: 'En este post veremos los metodos de HTML'
    }
]

let postList;
const formulario = document.querySelector('#searchBar');
const boton = document.querySelector('#searchButton');
const card = document.querySelector('#postContainer')

const filtrar = (event) => {
    event.preventDefault();
    console.log(formulario.value)
    const texto = formulario.value.toLowerCase();
    posts.forEach((post) => {
        let nombre = post.title.toLocaleLowerCase();
        if(nombre.indexOf(texto) !== -1) {
            
            card.innerHTML += `<li>${post.nombre}</li>`
        }
    })

}

boton.addEventListener('click', filtrar)