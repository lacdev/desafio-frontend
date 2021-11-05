// Funcionalidad de la barra de busqueda 



// const posts = [
//     {
//         nombre: 'Manuel',
//         title: 'Metodologia CRUD',
//         contenido: 'En este post veremos los metodos de CRUD'
//     },
//     {
//         nombre: 'Ramon',
//         title: 'Metodologia HTML',
//         contenido: 'En este post veremos los metodos de HTML'
//     }
// ]

let postList;
const formulario = document.querySelector('#searchBar');
const boton = document.querySelector('#searchButton');
const card = document.querySelector('#postContainer')

const filtrar = () => {
  
    // event.preventDefault();
    const texto = formulario.value.toLowerCase();
    console.log(Object.entries(postList))
    Object.entries(postList).forEach((post) => {
        console.log(post)
        let nombre = post.title.toLowerCase();
        if(nombre.indexOf(texto) !== -1) {
            
            card.innerHTML += `<li>${post.nombre}</li>`
        }
        if(nombre.indexOf(texto) == -1) {
            card.innerHTML = `No se encontraron posts relacionados con tu busqueda`
        }
    })

}

function getPosts () {
    const request = new XMLHttpRequest()
    const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

    request.responseType = 'json'
    request.responseText = 'text' //Da string
    request.open('GET', URL)
    request.send()
    console.log(request)

    request.onload = function() {
         postList = request.response; 
        //JSON convertido a objeto
         filtrar(postList)
    }
}

boton.addEventListener('click',getPosts() )
 