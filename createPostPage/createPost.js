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
    const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(fecha)
    const post = {
        name: nameTag.value,
        title: title.value,
        date: fecha,
        imageURL: imageURL.value,
        content: content.value,
        tags: tagValue().split(", ")
    }

    savePost(post);
});

function tagValue(){
    const tagValues = document.getElementsByClassName("filter-option-inner-inner");
    console.log(tagValues)
    console.log(tagValues[0].innerText)

    return tagValues[0].innerText
}

const savePost = ((post)=> {
    const url = 'http://localhost:5000/posts'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(post),
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
})

// const savePost = (post) => {
//     const url = 'http://localhost:5000/posts'
//     fetch(url, {method: 'POST', body: JSON.stringify(post)})
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))
// }


// function createPost (post) {
//     const request = new XMLHttpRequest()
//     const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

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