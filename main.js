console.log("Desafio Frontend Js14")

/* ----------------------------- Lista de pasos ----------------------------- 
.- Tener las variables que tiene el html o DOM para imprimir o pintar dinamicamente el archivo
.- Crear la función para los metodos de petición 
.- obtener con el get los datos de la bd 

*/
const $publicacion = document.querySelector(".main-post"), 
$imagen = document.querySelector(".imageurl"),
$autor = document.querySelector(".autor"),
$fecha = document.querySelector(".fecha"),
$tags = document.querySelector(".tags"),
$titulo = document.querySelector(".titulo"),
$template = document.querySelector(".imprimir"),
$contenido = document.querySelector(".contenido-post"),
$editar = document.querySelector("modificar")
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
        succes:(respuesta) => { renderPost(respuesta)  },
        error: (err) => {console.log(err)},
        data:null
    })
}

 
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

const putPost = () => {
    let idfake = "-MniCq-1zu_afiH_LwPg";
    crud({
        url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${idfake}.json`,
        succes:(respuesta) => { renderPost(respuesta)  },
        error: (err) => {console.log(err)},
        data:{
            name: $autor.value,
            title: $titulo.value,
            fecha: $fecha.value,
            imageURL: $imagen.value,
            contenido: $contenido.value,
        }
    })
}
