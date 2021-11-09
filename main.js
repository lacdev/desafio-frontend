console.log("Desafio Frontend Js14")
const SearchButton = document.querySelector('#searchButton');

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

// Crear post prueba

const post = { 
    name: "Manuel Ramon", 
    title: "The power of problem solving in a team.",
    fecha: "2019-10-17",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--WFZJNTfs--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l7brbesq1p1ugg89f3l7.jpg",
    contenido: "But, in case you’re interested, let’s dive a bit deeper into what it really means to be a problem solver, since so many companies add it to their list of ‘desirable qualities’, and so many of us describe ourselves as ‘a problem solver’ when we’re adding to our CVs.",
    tags: [
        "Beginners", "Javascript", "Webdev", "Programming"
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

SearchButton.addEventListener('click', (event) =>{
    event.preventDefault();
    const formulario = document.querySelector('#search-bar');
    if(formulario.value == ''){
        return
    }
   window.location.href = `./pages/search_page.html?search=${formulario.value} `
})



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
