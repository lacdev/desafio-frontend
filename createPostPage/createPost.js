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
const tag1 = document.getElementById("inlineCheckbox1");
const tag2 = document.getElementById("inlineCheckbox2");
const tag3 = document.getElementById("inlineCheckbox3");
const tag4 = document.getElementById("inlineCheckbox4");
const tag5 = document.getElementById("inlineCheckbox5");
const tag6 = document.getElementById("inlineCheckbox6");



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
    const URL = "https://prueba-clase-18-default-rtdb.firebaseio.com/.json"

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