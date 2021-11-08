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
let $publicacion = document.querySelector(".main-post"), 
$form = document.querySelector(".crud-form"),
$imagen = document.querySelector(".imageurl"),
$autor = document.querySelector(".autor"),
$fecha = document.querySelector(".fecha"),
$tags = document.querySelector(".tags"),
$titulo = document.querySelector(".titulo"),
$contenido = document.querySelector(".contenido-post"),
$editar = document.querySelector("modificar"),
//Para no hacer varias incerciones al DOM asi que se abre el fragmento
$fragment = document.createDocumentFragment();

//Crear funcion para obtener los metodos del CRUD

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
    const postId = urlparameter("id")
    //let idfake = "-MniCCuY7Hro49xVMH-M";
   crud({
        url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${postId}.json`,
        succes:(respuesta) => { 
            renderPost(respuesta) 
         },
        error: (err) => {
            console.log(err)
        },
        data:null
    })
}

//Función de lo que cada selector de cada elemento de html se tomara de la bd
//Respuesta .- Indica cada elemento de la bd se a igual al selector de cada querySelector por clase. 
const renderPost = (respuesta) => {
    //Selectores para el modal que se muestren sus valores
    let coverimagen = document.querySelector("#imagen-url")
    coverimagen.value = respuesta.imageURL
    let titlecontent = document.querySelector("#title-post")
    titlecontent.value = respuesta.title
    let contentpost = document.querySelector("#contenido-post")
    contentpost.value = respuesta.contenido


    $autor.textContent = respuesta.name
    $fecha.textContent = respuesta.fecha
    $titulo.textContent = respuesta.title
    $contenido.textContent = respuesta.contenido
    $imagen.src = respuesta.imageURL
   // console.log("Esto es respuesta", respuesta);
    $tags.innerHTML = "";
    const children = respuesta.tags;
      console.log(children);
    children.forEach((tag) => {
        const pTag = document.createElement("p");
            pTag.classList.add("tag");
            pTag.textContent = tag;
            $tags.appendChild(pTag);
    
    })
    
    //document.querySelector("#exampleModal").modal("hide");
}


document.addEventListener("DOMContentLoaded", getPost);
/* ------------------------- Pasos para hacer el PUT ------------------------ 
1. Tener el boton que desencadenara el evento 
2. Abrir el form o el modul para hacer la edición 
3. Pintar el modul con los datos a transformar 
4. Guardar los cambios. 
*/



 
 

document.getElementById("salvar").addEventListener("click", event => {
    //console.log(event);
   // console.log("🚀 ~ file: renderpost.js ~ line 122 ~ $contenido.textContent", $contenido.textContent);
    let $contenido = document.querySelector("#contenido-post").value;
    let $imagen = document.querySelector("#imagen-url").value;
    let $titulo = document.querySelector("#title-post").value;
    let  date = new Date();
    let $fecha = `${date.getFullYear()}-${date.getMonth() +1 }-${date.getDate()}`;
   // console.log("🚀 ~ file: renderpost.js ~ line 131 ~ document.getElementById ~ $contenido", $contenido)
   /* Array - sirve para obtenerlo como objeto de este tipo y no como HTMLCollection 
      childNodes - con el fin de traerme lo que se crea apartir del selector tags que son los parrafos de cada 
      tag
      map - para acceder a la propiedad de texto de cada tag
   */
   
   let $tags = Array.from(document.querySelector(".tags").childNodes).map((htmlTag) => {
     return htmlTag.innerText;
   })
   console.log("🚀 ~ file: renderpost.js ~ line 145 ~ document.getElementById ~ $tags", $tags)
   //console.log($tags)
    const postId = urlparameter("id")
    crud ({
        url:`https://desafio-js-fa573-default-rtdb.firebaseio.com/${postId}.json`,
        method: "PATCH",
        succes: (respuesta) => { renderPost ({ 
            name: $autor.textContent,
            title: $titulo,
           imageURL: $imagen,
          contenido: $contenido,
           fecha: $fecha,
           tags:  $tags
        })},
        error: (err) => $form.insertAdjacentHTML("afterend, <p><b>${err}</b></p>"),
        data: {   
            name: $autor.textContent,
            title: $titulo,
           imageURL: $imagen,
          contenido: $contenido,
           fecha: $fecha,
           tags: $tags
            }
        })

})

const urlparameter =  (paramName) => {
    const params = window.location.search; 
    const urlParams = new URLSearchParams(params);
   const param = urlParams.get(paramName);
   
   return param; 
}
  