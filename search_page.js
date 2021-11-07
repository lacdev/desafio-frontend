// Funcionalidad de la barra de busqueda 

let postList;
const textSearch = document.querySelector('#textSearch')
const formulario = document.querySelector('#searchBar');
const boton = document.querySelector('#searchButton');
const resultado = document.querySelector('#postContainer')

const filtrar = () => {
   
    resultado.innerHTML ='';
    const texto = formulario.value.toLowerCase();
    textSearch.innerHTML = `<li>Search results for ${texto}</li>`;
    
    for(let post in postList){
        //console.log(postList[post]) 
        let nombre = postList[post].name.toLowerCase();
        if(nombre.indexOf(texto) !==-1){
            console.log(nombre)
            resultado.innerHTML += `<li>${postList[post].name}</li>`
        }
    }
    if(resultado.innerHTML === '') {
        resultado.innerHTML = `<li>No se encontraron posts relacionados con tu busqueda...</li>`
    }

//    Object.entries(postList).forEach((post) => {
//     const title = post[1].title.toLowerCase();
//     const content = post[1].contenido.toLowerCase();
    
//     if(title.includes(texto)) {
//         console.log(post)
//     }

//     if(content.includes(texto)) {
//         console.log(post)
//     }

//    }) 
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
       // console.log(posts)
       

    }
}

boton.addEventListener('click', filtrar )
getPosts()

 