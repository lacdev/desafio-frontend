console.log("rendering JS")

const articles = document.querySelector(".articles")

function renderPost (post, key) {
    const { name, fecha, imageURL, title, content, tags } = post
    
        const card = document.createElement('div')
        card.classList.add("card")
        card.setAttribute("data-id", key)
        const imageContainer = document.createElement('div')
        imageContainer.classList.add("image-container")
        const image = document.createElement("img")
        image.setAttribute("src", imageURL)
        image.classList.add("post-image")
        imageContainer.appendChild(image)
        card.appendChild(imageContainer)
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
        titleLink.setAttribute("href", `./pages/post.html?id=${key}`) 
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
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("btn-danger", "delete-post")
        deleteButton.setAttribute("id", `${key}`)
        deleteButton.textContent = "Eliminar Post"
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault()
            const cardElement = event.target.closest(".card")
            deletePost(event.target.id, deletefromDOM(cardElement), cardElement)
            // const cardElement = event.target.closest(".card")
            // cardElement.remove()
            // console.log(event.target.closest(".card").dataset.id) 
            //  console.log(event.target)
            // console.log(event.target.id)
            //Tomar el data-id attribute del card que tiene que ser igual al id del key
            //Mandar a llamar el metodo DELETE id tiene que ser igual al id de la base de datos. 
            //Eliminarlo de la base de datos
            //on success. Eliminarlo del DOM.
        })
        card.appendChild(deleteButton)
        articles.appendChild(card)
    console.log(post)
}

function deletefromDOM (element) {
    element.remove()
}

function getPosts () {
    const request = new XMLHttpRequest()
    const URL = "https://desafio-js-fa573-default-rtdb.firebaseio.com/.json"

    request.responseType = 'json'
    request.responseText = 'text' 
    request.open('GET', URL)
    request.send()
    console.log(request)

    request.onload = function() {
        const posts = request.response; 

        for (let key in posts) {
            console.log(key)
            renderPost(posts[key], key)
        }
        console.log(posts)
    }
}

function deletePost (key, success, domElement) {
    const request = new XMLHttpRequest()
    const URL = `https://desafio-js-fa573-default-rtdb.firebaseio.com/${key}.json`

    request.responseText = 'text' //Da string
    console.log(key)
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            console.log(request.responseText);
            deletefromDOM(domElement)
          }
        } else {
          console.log(request.readyState);
        }
      });
    request.open('DELETE', URL)
    request.send()
    console.log(request)
}

getPosts()

// const postsArray = [
//     {
//     name: "Alan Medina",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--iXdS49-U--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mm5uqgq9eej1l4x8wchd.png",
//     title: "Don't Optimize Your React App, Use Preact Instead",
//     content: "Mi contenido",
//     tags: ["React", "HTML", "Programming", "Components"]
//     },
//     {name: "German Martinez",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRcOIbcX--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87imm1ntaiou8jjzp7ap.jpg",
//     title: "You don't need useState + useEffect",
//     content: "Mi contenido",
//     tags: ["React", "Javascript", "Code Quality", "Components"],},
//     {name: "Alejandra Paez",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--dMGHjPjl--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vadgli9prwpdsdnk6ax9.jpeg",
//     title: "How to get the size of a directory in Linux",
//     content: "Mi contenido",
//     tags: ["Linux", "Terminal", "Code Quality", "System"],},
//     {name: "Selene Ch",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--GOga6uCd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e4uvfof3yvto0uqqaplr.png",
//     title: "Accessibility Auditing My Portfolio Site - Part 2",
//     content: "Mi contenido",
//     tags: ["a11y", "React", "CSS", "Webdev"],},
//     {name: "Carlos Martinez",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--TsBFItO8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/69nr2p10bpnq7us04vrt.png",
//     title: "1 line of code: How to get length of the shortest string of an Array",
//     content: "Mi contenido",
//     tags: ["Performance", "Javascript", "Code Quality", "Webdev"],},
//     {name: "Manuel Ramon",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--IFHxNcPD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpcz578s0ywr20wa1a9p.jpeg",
//     title: "Getting Started with Gatsby.js",
//     content: "Mi contenido",
//     tags: ["React", "Javascript", "Webdev", "Gatsby"],},
//     {name: "Ivan Diaz",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s---a3NKFqq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lgys2sbkxngso70nsus1.jpg",
//     title: "Day 27 of 100 Days of Code & Scrum: Rest Day & Company Banner",
//     content: "Mi contenido",
//     tags: ["100daysOfCode", "Javascript", "Beginners", "Programming"],},
// ]

// const post = {
//     name: "German Martinez",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRcOIbcX--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87imm1ntaiou8jjzp7ap.jpg",
//     title: "You don't need useState + useEffect",
//     content: "Mi contenido",
//     tags: ["React", "Javascript", "Code Quality", "Components"],
// }

// function createPosts (arrayOfPosts) {
//     arrayOfPosts.forEach((post) => {
//         renderPost(post)
//     })
// }

