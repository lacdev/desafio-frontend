console.log('Filtering Posts Js')

const filterButtonsContainer = document.querySelector(
  '.filter-buttons-container'
)

filterButtonsContainer.addEventListener('click', (event) => {
  if (event.target.id === 'feed-button') {
    filterByFeed()
  }

  if (event.target.id === 'newest-button') {
    filterByNewest()
  }

  if (event.target.id === 'oldest-button') {
    filterByOldest()
  }

  if (event.target.id === 'year-button') {
    filterByYear()
  }

  if (event.target.id === 'month-button') {
    filterByMonth()
  }
})

const removeFeed = () => {
  while (articles.firstChild) {
    articles.removeChild(articles.firstChild)
  }
}

const filterByFeed = () => {
  removeFeed()
  getPostsFetch()
}

const filterByNewest = () => {
  removeFeed()

  const url = 'http://localhost:5000/posts'

  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const postsArray = response.data.posts
      const sortedArray = postsArray.sort((a, b) => {
        let fecha1 = a.date
        let fecha2 = b.date

        if (fecha1 > fecha2) {
          return -1
        }

        if (fecha1 < fecha2) {
          return 1
        }

        return 0
      })
      sortedArray.forEach((post) => {
        renderPost(post)
      })
    })
    .catch((error) => console.log(error))
}

const filterByOldest = () => {
  removeFeed()

  const url = 'http://localhost:5000/posts'

  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const postsArray = response.data.posts
      const sortedArray = postsArray.sort((a, b) => {
        let fecha1 = a.date
        let fecha2 = b.date

        if (fecha1 < fecha2) {
          return -1
        }

        if (fecha1 > fecha2) {
          return 1
        }

        return 0
      })
      sortedArray.forEach((post) => {
        renderPost(post)
      })
    })
    .catch((error) => console.log(error))
}

const filterByYear = () => {
  removeFeed()

  const url = 'http://localhost:5000/posts'

  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const postsArray = response.data.posts

      let currentYear = new Date().getFullYear()
      const filteredArray = postsArray.filter((post) => {
        return post.date.includes(currentYear)
      })

      filteredArray.forEach((post) => {
        renderPost(post)
      })
    })
    .catch((error) => console.log(error))
}

const filterByMonth = () => {
  removeFeed()

  const url = 'http://localhost:5000/posts'

  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const postsArray = response.data.posts

      let currentYear = new Date().getFullYear()
      let currentMonth = new Date().getMonth() + 1
      let currentYearAndMonth = `${currentYear}-${currentMonth}`

      const filteredArray = postsArray.filter((post) => {
        return post.date.includes(currentYearAndMonth)
      })

      filteredArray.forEach((post) => {
        renderPost(post)
      })
    })
    .catch((error) => console.log(error))
}
