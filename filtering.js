console.log("Filtering Posts Js")

const filterButtonsContainer = document.querySelector(".filter-buttons-container")

console.log(filterButtonsContainer)

filterButtonsContainer.addEventListener('click', (event) => {
    console.log(event.target.id)
    console.log(articles)
    if (event.target.id === "feed-button") {
        filterByFeed()
    }

    if (event.target.id === "newest-button") {
        filterByNewest()
    }

    if (event.target.id === "oldest-button") {
        filterByOldest()
    }

    if (event.target.id === "year-button") {
        filterByYear()
    }

    if (event.target.id === "month-button") {
        filterByMonth()
    }
})

const filterByFeed = (array) => {
    array = postArray
    removeFeed()
    array.forEach((post) => {
        renderPost(post[1], post[0])
    })
}   

const removeFeed = () => {
    while(articles.firstChild) {
        articles.removeChild(articles.firstChild)
    }
}

const filterByNewest = (array) => {
    array = postArray
    removeFeed()

    let arrayToSort = [...array]
    const sortedByNewest = arrayToSort.sort((a, b) => {
        let fecha1 = a[1].fecha
        let fecha2 = b[1].fecha

        if (fecha1 > fecha2) {
            return -1
        }

        if (fecha1 < fecha2) {
            return 1
        }
    
        return 0

    })

    sortedByNewest.forEach((post) => {
        renderPost(post[1], post[0])
    })
}

const filterByOldest = (array) => {
    array = postArray
    removeFeed()
    let arrayToSort = [...array]
    const sortedByOldest = arrayToSort.sort((a, b) => {
        let fecha1 = a[1].fecha
        let fecha2 = b[1].fecha

        if (fecha1 < fecha2) {
            return -1
        }

        if (fecha1 > fecha2) {
            return 1
        }
    
        return 0

    })

    sortedByOldest.forEach((post) => {
        renderPost(post[1], post[0])
    })
}

const filterByYear = (array) => {
    array = postArray
    removeFeed()
    let arrayToFilter = [...array]
    let currentYear = new Date().getFullYear()
   const filteredArray = arrayToFilter.filter((post) => {
        return post[1].fecha.includes(currentYear)
    })

    filteredArray.forEach((post) => {
        renderPost(post[1], post[0])
    })
}


const filterByMonth = (array) => {

    array = postArray
    removeFeed()
    let arrayToFilter = [...array]

    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth() + 1
    let currentYearAndMonth = `${currentYear}-${currentMonth}`

    const filteredArray = arrayToFilter.filter((post) => {
            return post[1].fecha.includes(currentYearAndMonth)
        })

    filteredArray.forEach((post) => {
        renderPost(post[1], post[0])
    })
}
