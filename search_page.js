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

// let postList;

const formulario = document.querySelector('#searchBar');
const boton = document.querySelector('#searchButton');
const resultado = document.querySelector('#postContainer')

const filtrar = () => {
   
    resultado.innerHTML ='';
   
    const texto = formulario.value.toLowerCase();
    
    for(let post in posts){
        let nombre = post.nombre.toLowerCase();
        if(nombre.indexOf(texto) !==-1){
            resultado.innerHTML += `<li>${post.nombre}</li>`
        }
    }
    if(resultado.innerHTML === '') {
        resultado.innerHTML = `<li>No se encontraron posts relacionados con tu busqueda...</li>`
    }
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
        const posts = request.response; 
        //JSON convertido a objeto
       // console.log(posts)
       filtrar(posts)

    }
}

boton.addEventListener('click', getPosts() )

 