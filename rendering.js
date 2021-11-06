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

function deletePost (key, domElement) {
    const request = new XMLHttpRequest()
    const URL = `https://desafio-js-fa573-default-rtdb.firebaseio.com/${key}.json`

    request.responseText = 'text' 
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

