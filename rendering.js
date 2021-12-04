console.log('rendering JS')

const articles = document.querySelector('.articles')

function renderPost(post) {
  const { _id, name, date, imageURL, title, content, tags } = post

  const card = document.createElement('div')
  card.classList.add('card')
  card.setAttribute('data-id', _id)

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('image-container')
  const image = document.createElement('img')
  image.setAttribute('src', imageURL)
  image.classList.add('post-image')
  imageContainer.appendChild(image)
  card.appendChild(imageContainer)

  const authorContainer = document.createElement('div')
  authorContainer.classList.add('author-info-container')
  const author = document.createElement('h4')
  author.textContent = name
  authorContainer.appendChild(author)

  const fechaText = document.createElement('h6')
  fechaText.classList.add('date')
  fechaText.textContent = date
  authorContainer.appendChild(fechaText)
  card.appendChild(authorContainer)

  const titleContainer = document.createElement('div')
  titleContainer.classList.add('post-title-container')
  const titleLink = document.createElement('a')
  titleLink.setAttribute('href', `./pages/post.html?id=${_id}`)
  titleLink.classList.add('post-title')
  titleLink.textContent = title
  titleContainer.appendChild(titleLink)
  card.appendChild(titleContainer)

  const tagsContainer = document.createElement('div')
  tagsContainer.classList.add('tags-container')
  tags.forEach((tag) => {
    const pTag = document.createElement('p')
    pTag.classList.add('tag')
    pTag.textContent = `#${tag}`
    tagsContainer.appendChild(pTag)
  })
  card.appendChild(tagsContainer)

  const postBody = document.createElement('div')
  postBody.classList.add('post-body')
  postBody.textContent = content
  card.appendChild(postBody)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn-danger', 'delete-post')
  deleteButton.setAttribute('id', `${_id}`)
  deleteButton.textContent = 'Eliminar Post'
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault()
    const cardElement = event.target.closest('.card')
    deletePostsFetch(event.target.id)
    deletefromDOM(cardElement)
  })

  card.appendChild(deleteButton)
  articles.appendChild(card)
}

function deletefromDOM(element) {
  element.remove()
}

function getPostsFetch() {
  const url = 'http://localhost:5000/posts'
  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const postsArray = response.data.posts
      postsArray.forEach((post) => {
        renderPost(post)
      })
    })
    .catch((error) => console.log(error))
}

function deletePostsFetch(id) {
  const url = `http://localhost:5000/posts/${id}`
  fetch(url, { method: 'DELETE' }, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

window.addEventListener('load', getPostsFetch)
