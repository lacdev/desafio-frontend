console.log("rendering JS")

const articles = document.querySelector(".articles")
console.log(articles)

const postsArray = [
    {name: "German Martinez",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRcOIbcX--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87imm1ntaiou8jjzp7ap.jpg",
    title: "You don't need useState + useEffect",
    content: "Mi contenido",
    tags: ["React", "Javascript", "Code Quality", "Components"],},
    {name: "Alejandra Paez",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--dMGHjPjl--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vadgli9prwpdsdnk6ax9.jpeg",
    title: "How to get the size of a directory in Linux",
    content: "Mi contenido",
    tags: ["Linux", "Terminal", "Code Quality", "System"],},
    {name: "Selene Ch",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--GOga6uCd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e4uvfof3yvto0uqqaplr.png",
    title: "Accessibility Auditing My Portfolio Site - Part 2",
    content: "Mi contenido",
    tags: ["a11y", "React", "CSS", "Webdev"],},
    {name: "Carlos Martinez",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--TsBFItO8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/69nr2p10bpnq7us04vrt.png",
    title: "1 line of code: How to get length of the shortest string of an Array",
    content: "Mi contenido",
    tags: ["Performance", "Javascript", "Code Quality", "Webdev"],},
    {name: "Manuel Ramon",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--IFHxNcPD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpcz578s0ywr20wa1a9p.jpeg",
    title: "Getting Started with Gatsby.js",
    content: "Mi contenido",
    tags: ["React", "Javascript", "Webdev", "Gatsby"],},
    {name: "Ivan Diaz",
    date: "2021-10-16",
    imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s---a3NKFqq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lgys2sbkxngso70nsus1.jpg",
    title: "Day 27 of 100 Days of Code & Scrum: Rest Day & Company Banner",
    content: "Mi contenido",
    tags: ["100daysOfCode", "Javascript", "Beginners", "Programming"],},
]

// const post = {
//     name: "German Martinez",
//     date: "2021-10-16",
//     imageURL: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRcOIbcX--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87imm1ntaiou8jjzp7ap.jpg",
//     title: "You don't need useState + useEffect",
//     content: "Mi contenido",
//     tags: ["React", "Javascript", "Code Quality", "Components"],
// }

function createPosts (arrayOfPosts) {
    arrayOfPosts.forEach((post) => {
        renderPost(post)
    })
}

function renderPost (post) {
    const {name, date, imageURL, title, content, tags} = post
    
        const card = document.createElement('div')
        card.classList.add("card")
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
        const fecha = document.createElement("h6")
        fecha.classList.add("date")
        fecha.textContent = date
        authorContainer.appendChild(fecha)
        card.appendChild(authorContainer)
        const titleContainer = document.createElement("div")
        titleContainer.classList.add("post-title-container")
        const titleLink = document.createElement("a")
        titleLink.setAttribute("href", "#")
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
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("btn-danger", "delete-post")
        deleteButton.textContent = "Eliminar Post"
        card.appendChild(deleteButton)
        articles.appendChild(card)
}