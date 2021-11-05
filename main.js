console.log("Desafio Frontend Js14")

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
        console.log(posts)
    }
}

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

function createPost () {

}

//Crear post dinamico 

const post = { 
    name: "Selene", 
    title: "Mi quinto post",
    fecha: "2022-10-04",
    imageURL: "YEAHEAYEAHEAH",
    contenido: "Mi super contenido de Selene",
    tags: [
        "CSS",
        "HTML",
        "React",
        "NodeJs"
    ]
}

function createPost (post) {
    const request = new XMLHttpRequest()
    const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

    //Requerido para debuggear estado de peticion.
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 200) {
            console.log(request.responseText)
        }  else {
            console.log(request.readyState)
        }
    })
    request.open('POST', URL, true)
    request.send(JSON.stringify(post))
    console.log(request)
}

//Cuando el usuario de click a delete

function deletePosts () {
    const request = new XMLHttpRequest()
    const URL = `https://desafio-js-fa573-default-rtdb.firebaseio.com/.json`

    request.responseText = 'text' //Da string

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            console.log(request.responseText);
            const posts = JSON.parse(request.responseText)
            console.log(posts)
            for (let key in posts) {
                console.log(key)
            }
          }
        } else {
          console.log(request.readyState);
        }
      });
    request.open('GET', URL)
    request.send()
    console.log(request)
}