console.log("Desafio Frontend Js14")

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
//     name: "Leo Mora", 
//     title: "Next JS Starter Kit with TypeScript and Tailwind CSS",
//     fecha: "2020-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--g4gcBJd5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://github.com/ixartz/Next-js-Boilerplate/raw/master/public/assets/images/nextjs-starter-banner.png%3Fraw%3Dtrue",
//     contenido: "I've just updated my Next JS Starter Template to the latest version, Next JS 12. The perfect starter kit to start your Next JS in seconds with TypeScript.",
//     tags: [
//         "NextJs", "TailwindCSS", "React", "Webdev"
//     ]
// }

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