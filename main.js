console.log("Desafio Frontend Js14")

/* ----------------------------- Lista de pasos ----------------------------- 
.- Tener las variables que tiene el html o DOM para imprimir o pintar dinamicamente el archivo
.- Crear la función para los metodos de petición 
.- Bbtener con el get los datos de la bd 
.- Obtener el get de un solo dato.
.- Obtener el id de la base de datos para mostrarla en el html
.- Leer las etiquetas del html para poder imprimir o mostrar los en el html.
.- Crear el metodo para actualizar o editar el post que se esta imprimiendo. 
.- Utilizar la función con la creación del objeto que tiene la ulr, el metodo, evaluación exitosa o mensaje error.
.- Crear un evento para el boton de editar para que ocuando ocurra mandarle los datos a cambiar.
.- 

*/
const $publicacion = document.querySelector(".main-post"), 
$form = document.querySelector(".crud-form"),
$imagen = document.querySelector(".imageurl"),
$autor = document.querySelector(".autor"),
$fecha = document.querySelector(".fecha"),
$tags = document.querySelector(".tags"),
$titulo = document.querySelector(".titulo"),
$contenido = document.querySelector(".contenido-post"),
$editar = document.querySelector("modificar"),
//$template = document.querySelector(".imprimir"),
//Para no hacer varias incerciones al DOM asi que se abre el fragmento
$fragment = document.createDocumentFragment();

//Crear funcion para obtener los metodos del CRUD

const crud = (metodos) => {
    //Destructuración para el objeto 
    /* Url para llamar a la db 
    method para llamar a (get,post,put o delete)
    sucess y error identificar el estado de respuesta (200 - 400)
    data para saber si se envia datos o no
    */
    let { url, method, succes, error, data } = metodos;
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", event => {
        //Validacion de estado de petición 0 - 4 
        if (request.readyState !== 4) return;

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

//Iniciar a crear el la carga para imprimir los elementos obtenidos de la DB
const getPost = () => {
    let idfake = "-MniCCuY7Hro49xVMH-M";
   crud({
        url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${idfake}.json`,
        succes:(respuesta) => { 
            renderPost(respuesta) 
         },
        error: (err) => {
            console.log(err)
        },
        data:null
    })
}

//Función de lo que cada selector de arriba tomara de la bd
const renderPost = (respuesta) => {

    $autor.textContent = respuesta.name
    $fecha.textContent = respuesta.fecha
    $titulo.textContent = respuesta.title
    $contenido.textContent = respuesta.contenido
    $imagen.src = respuesta.imageURL

    respuesta.tags.forEach((tag) => {
        const pTag = document.createElement("p");
            pTag.classList.add("tag");
            pTag.textContent = tag;
            $tags.appendChild(pTag);
    })
}

document.addEventListener("DOMContentLoaded", getPost);
/* ------------------------- Pasos para hacer el PUT ------------------------ 
1. Tener el boton que desencadenara el evento 
2. Abrir el form o el modul para hacer la edición 
3. Pintar el modul con los datos a transformar 
4. Guardar los cambios. 

*/
const putPost = () => {
    let idfake = "-MniCq-1zu_afiH_LwPg";
    crud({
        url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${idfake}.json`,
        method: "PUT",
        succes: (respuesta) => { 
            renderPost(respuesta)  },
        error: (err) => {
            console.log(err)   },
        data:{
            name: $autor.value,
            title: $titulo.value,
            fecha: $fecha.value,
            imageURL: $imagen.value,
            contenido: $contenido.value,
        }
    })
}

/* --------------------------------- Prueba --------------------------------- */


document.addEventListener("click", event => {


})
document.addEventListener('button', event => {
    let idfake = "-MniCq-1zu_afiH_LwPg";
//Identificar si esta con o sin datos 
    if(event.target.id.value){      
        //UPDATE- PUT
        crud ({
            url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${idfake}.json`,
            method: "PUT",
            succes: (respuesta) => location.reload,
            error: (err) => $form.insertAdjacentHTML("afterend, <p><b>${err}</b></p>"),
            data: {
                name: event.target.author.value,
                title: event.target.titulopost.value,
                imageURL: event.target.fondoimagen.value,
                contenido: event.target.info.value
                }
            })
    }

})
//Pruebas de funciones GET,POST,PUT,DELETE en Firebase.

// function getPosts () {
//     const request = new XMLHttpRequest()
//     const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

//     request.responseType = 'json'
//     request.responseText = 'text' //Da string
//     request.open('GET', URL)
//     request.send()
//     console.log(request)

//     request.onload = function() {
//         const posts = request.response; 
//         //JSON convertido a objeto
//         console.log(posts)
//     }

// }

/* 

Form:

en los inputs del form

un event listener y cuando de click o create post

los input.value de cada cuadrito.

van a rellenar el objeto dinamicante por ejemplo.

const author = querySelector("#author")

author.addEventlistener("input", () => {

})

Al momento de darle a agregar post

const post = {
    name: ${author.value} = al valor actual de ese input,
    title: ${title.value} 
}

*/

//Function para crear posts dinamicos

// function createPost () {

// }

//Crear post dinamico 

// const post = { 
//     name: "Ivan Diaz", 
//     title: "Day 27 of 100 Days of Code & Scrum: Rest Day & Company Banner",
//     fecha: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s---a3NKFqq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lgys2sbkxngso70nsus1.jpg",
//     contenido: "Mi contenido",
//     tags: [
//         "100daysOfCode", "Javascript", "Beginners", "Programming"
//     ]
// }

// function createPost (post) {
//     const request = new XMLHttpRequest()
//     const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

//     //Requerido para debuggear estado de peticion.
//     request.addEventListener("readystatechange", () => {
//         if (request.readyState === 200) {
//             console.log(request.responseText)
//         }  else {
//             console.log(request.readyState)
//         }
//     })
//     request.open('POST', URL, true)
//     request.send(JSON.stringify(post))
//     console.log(request)

// }

//Cuando el usuario de click a delete

// function deletePosts () {
//     const request = new XMLHttpRequest()
//     const URL = `https://desafio-js-fa573-default-rtdb.firebaseio.com/${key}.json`

//     request.responseText = 'text' //Da string

//     request.addEventListener("readystatechange", () => {
//         if (request.readyState === 4) {
//           if (request.status === 200) {
//             console.log(request.responseText);
//             const posts = JSON.parse(request.responseText)
//             console.log(posts)
//             for (let key in posts) {
//                 console.log(key)
//             }
//           }
//         } else {
//           console.log(request.readyState);
//         }
//       });
//     request.open('DELETE', URL)
//     request.send()
//     console.log(request)

// }
