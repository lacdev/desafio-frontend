// const post = { 
//     name: "Selene", 
//     title: "Mi quinto post",
//     fecha: "2022-10-04",
//     imageURL: "YEAHEAYEAHEAH",
//     contenido: "Mi super contenido de Selene",
//     tags: [
//         "CSS",
//         "HTML",
//         "React",
//         "NodeJs"
//     ]
// }

const upload = document.getElementById("upload");

const title = document.getElementById("new-title");
const nameTag = document.getElementById("name-tag");
const imageURL = document.getElementById("image-url");
const content = document.getElementById("post-content");


upload.addEventListener('click', send => {
    const date = new Date();
    const fecha = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    console.log(fecha)
    const post = {
        name: nameTag.value,
        title: title.value,
        fecha: fecha,
        imageURL: imageURL.value,
        contenido: content.value,
        tags: []
    }

    createPost(post);
});

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