// Funcionalidad de la barra de busqueda 

let postList;
const textSearch = document.querySelector('#textSearch')
const formulario = document.querySelector('#search-bar');
const boton = document.querySelector('#searchButton');
// const resultado = document.querySelector('#postContainer')


// funcion al cargar la pagina
window.addEventListener('load', (event) => {
    //console.log('page is fully loaded');
   
   getPosts()
   //console.log(search);
  });


  // obtener el valor del parametro en URL
  const urlparameter =  (paramName) => {
    const params = window.location.search; 
    const urlParams = new URLSearchParams(params);
   const param = urlParams.get(paramName);
   
   return param;
  }

const articles = document.querySelector("#postContainer")

let postArray = []

function renderPost (post, key) {

    const { name, fecha,  title, content, tags } = post
    
        const card = document.createElement('div')
        card.classList.add("card")
        card.setAttribute("data-id", key)
        // const imageContainer = document.createElement('div')
        // imageContainer.classList.add("image-container")
        // const image = document.createElement("img")
        // image.setAttribute("src", imageURL)
        // image.classList.add("post-image")
        // imageContainer.appendChild(image)
        // card.appendChild(imageContainer)
        const authorContainer = document.createElement("div")
        authorContainer.classList.add("author-info-container")
        const author = document.createElement("h4")
        author.textContent = name
        authorContainer.appendChild(author)
        const fechaText = document.createElement("h6")
        fechaText.classList.add("date")
        fechaText.textContent = fecha
        authorContainer.appendChild(fechaText)
        card.appendChild(authorContainer)
        const titleContainer = document.createElement("div")
        titleContainer.classList.add("post-title-container")
        const titleLink = document.createElement("a")
        titleLink.setAttribute("href", `./post.html?id=${key}`) 
        titleLink.classList.add("post-title")
        titleLink.textContent = title
        titleContainer.appendChild(titleLink)
        card.appendChild(titleContainer)
        const tagsContainer = document.createElement("div")
        tagsContainer.classList.add("tags-container")
        tags.forEach((tag) => {
            const pTag = document.createElement("p")
            pTag.classList.add("tag")
            pTag.textContent = `#${tag}`
            tagsContainer.appendChild(pTag)
        })
        card.appendChild(tagsContainer)
        const postBody = document.createElement("div")
        postBody.classList.add("post-body")
        postBody.textContent = content
        card.appendChild(postBody)
        // const deleteButton = document.createElement("button")
        // deleteButton.classList.add("btn-danger", "delete-post")
        // deleteButton.setAttribute("id", `${key}`)
        // deleteButton.textContent = "Eliminar Post"
        // deleteButton.addEventListener('click', (event) => {
        //     event.preventDefault()
        //     const cardElement = event.target.closest(".card")
        //     deletePost(event.target.id, deletefromDOM(cardElement), cardElement)
        // })
        // card.appendChild(deleteButton)
        articles.appendChild(card)
   // console.log(post)
}



const filtrar = (inicialValue = '') => {

    articles.innerHTML ='';

   let texto = inicialValue !== '' ? inicialValue : formulario.value.toLowerCase();
   console.log(texto)
    //const texto = formulario.value.toLowerCase();
    
    console.log(texto)
    //textSearch.innerHTML = `<li>Search results for ${texto}</li>`;
    
    console.log(postList)
    for(let post in postList){
        //console.log(postList[post]) 
        let titulo = postList[post].title.toLowerCase();
        let nombre = postList[post].name.toLowerCase();
        if(titulo.indexOf(texto) !==-1 || (nombre.indexOf(texto))!==-1){
            //console.log(nombre)
             renderPost(postList[post],post)
            // resultado.innerHTML += `<li>${postList[post].name}</li>`
        }
    }
    if(articles.innerHTML === '') {
        articles.innerHTML = `<li>No se encontraron posts relacionados con tu busqueda...</li>`
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
    // const request = new XMLHttpRequest()
    // const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

    // request.responseType = 'json'
    // request.responseText = 'text' //Da string
    // request.open('GET', URL)
    // request.send()
    // console.log(request)

    // request.onload = function() {
    //     postList = request.response; 
    //     //JSON convertido a objeto
    //    // console.log(posts)
    // }
    crud ({
        url:"https://desafio-js-fa573-default-rtdb.firebaseio.com/.json",
        method: "GET",
        succes: (respuesta) => {
            postList = respuesta
            const search = urlparameter('search')
            filtrar(search)
        }, 
        error: (err) => $form.insertAdjacentHTML("afterend, <p><b>${err}</b></p>"),
        // data: {   
        //     name: $autor.textContent,
        //     title: $titulo,
        //    imageURL: $imagen,
        //   contenido: $contenido,
        //    fecha: $fecha,
        //    tags: $tags
        //     }
        })

}

boton.addEventListener('click', event =>{
    event.preventDefault()
    filtrar()
}) 

const crud = (metodos) => {
    //Destructuración para el objeto 
    /* Url - para llamar a la db 
    method  - para llamar a (get,post,put o delete)
    sucess y error - identificar el estado de respuesta (200 - 400)
    data - para saber si se envia datos o no
    */
    let { url, method, succes, error, data } = metodos;
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", event => {
        //Validacion de estado de petición 0 - 4 
        if (request.readyState !== 4) return;
        //Validacion del estado de respuesta sea un 200 
        if (request.status >=200 && request.status < 300){
            let json = JSON.parse(request.responseText);
            succes(json);

        } else {
         let message = request.statusText || "Ocurrio un error";
         error(`Error ${request.status}: ${message}`);
        }
    });

    request.open(method ||'GET', url);
    request.setRequestHeader("Content-type", "application/json; chartset=utf-8");
    request.send(JSON.stringify(data));
  }
 