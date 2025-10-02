const categoriesTrack = document.querySelector(".filter-track-categories-inner")
const grid = document.getElementById("contentGrid")

// Fetch JSON data
async function loadContent() {
  const response = await fetch("/data/content.json")
  const content = await response.json()
  const categoriesList = [...new Set(content.map((c) => c.category))]
  const categories = ["All", ...categoriesList]

  // Default sort cards by newest date
  content.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Render filter buttons
  categories.forEach((category) => {
    const filterBtn = document.createElement("button")
    filterBtn.textContent = category.toUpperCase()
    filterBtn.classList.add("categories-btn")
    if (category === "All") filterBtn.classList.add("active")
    categoriesTrack.appendChild(filterBtn)
  })

  // Render cards
  renderContent(content, grid)

  // Filter grid cards on category track selection
  categoriesTrack.addEventListener("click", (e) => {
    if (!e.target.classList.contains("categories-btn")) return

    document
      .querySelectorAll(".categories-btn")
      .forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Filter cards in grid
    const category = e.target.textContent
    if (category === "ALL") {
      renderContent(content, grid)
    } else {
      const filtered = content.filter(
        (e) => e.category.toUpperCase() === category
      )
      renderContent(filtered, grid)
    }
  })
}

// Render cards function
function renderContent(cards, grid) {
  grid.innerHTML = ""
  const today = new Date()
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(today.getMonth() - 1)

  cards.forEach((content) => {
    const card = document.createElement("article")
    card.classList.add("content-card")

    card.innerHTML = `
        <a href="${content.href}">
          <img src="${content.image}" alt="${content.title}">
        </a>
        <div class="content-data">
          <a href="${content.href}"><h3>${content.title}</h3></a>
          <p>Category: ${content.category}</p>
        </div>
        `

    // Add "New!" label if <1Mo Old
    const contentDate = new Date(content.date)
    if (contentDate >= oneMonthAgo) {
      const newLabel = document.createElement("a")
      newLabel.classList.add("new-label")
      newLabel.textContent = "New!"
      card.appendChild(newLabel)
    }

    grid.appendChild(card)
  })
}

loadContent()

// Categories Track: Scroll pre-defined distance on arrow click
const arrowRight = document.querySelector(
  ".filter-track-categories-arrow-right"
)
const arrowLeft = document.querySelector(".filter-track-categories-arrow-left")
const fadeRight = document.querySelector(".filter-track-categories-fade-right")
const fadeLeft = document.querySelector(".filter-track-categories-fade-left")

const scrollAmount = 275

arrowRight.addEventListener("click", () => {
  categoriesTrack.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  })
})

arrowLeft.addEventListener("click", () => {
  categoriesTrack.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  })
})

// Categories Track: Show/hide arrows appropriately
function showHideArrows() {
  const maxScrollLeft =
    categoriesTrack.scrollWidth - categoriesTrack.clientWidth

  if (maxScrollLeft <= 0) {
    arrowLeft.classList.remove("visible")
    fadeLeft.classList.remove("visible")
    arrowRight.classList.remove("visible")
    fadeRight.classList.remove("visible")
    return
  }

  if (categoriesTrack.scrollLeft > 0) {
    arrowLeft.classList.add("visible")
    fadeLeft.classList.add("visible")
  } else {
    arrowLeft.classList.remove("visible")
    fadeLeft.classList.remove("visible")
  }

  if (categoriesTrack.scrollLeft >= maxScrollLeft - 1) {
    arrowRight.classList.remove("visible")
    fadeRight.classList.remove("visible")
  } else {
    arrowRight.classList.add("visible")
    fadeRight.classList.add("visible")
  }
}

arrowRight.style.transition = "none"
fadeRight.style.transition = "none"

window.addEventListener("load", showHideArrows)
categoriesTrack.addEventListener("scroll", showHideArrows)
window.addEventListener("resize", showHideArrows)
showHideArrows()

// Small fix so right arrow doesn't ease in on page load
setTimeout(() => {
  arrowRight.style.transition = ""
  fadeRight.style.transition = ""
}, 50)

// Categories Track: Dragging functionality
let isDown = false
let startX
let scrollLeft
let hasDragged = false
const dragThreshold = 5

categoriesTrack.addEventListener("mousedown", (e) => {
  isDown = true
  hasDragged = false
  categoriesTrack.classList.add("dragging")
  startX = e.pageX - categoriesTrack.offsetLeft
  scrollLeft = categoriesTrack.scrollLeft
})

document.addEventListener("mousemove", (e) => {
  if (!isDown || !categoriesTrack) return
  e.preventDefault()

  const xAmount = e.pageX - categoriesTrack.offsetLeft
  const walk = (xAmount - startX) * 1.5
  if (Math.abs(xAmount - startX) > dragThreshold) {
    hasDragged = true
  }

  categoriesTrack.scrollLeft = scrollLeft - walk
  document.body.classList.add("dragging-global")
})

document.addEventListener("mouseup", () => {
  isDown = false
  categoriesTrack.classList.remove("dragging")
  document.body.classList.remove("dragging-global")
})

categoriesTrack.addEventListener("click", (e) => {
  if (hasDragged) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
