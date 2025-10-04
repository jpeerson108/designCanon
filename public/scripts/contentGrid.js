const categoriesTrack = document.querySelector(".filter-track-categories-inner")
const grid = document.getElementById("contentGrid")
let content = []

// Fetch JSON data
async function loadContent() {
  const response = await fetch("/data/content.json")
  content = await response.json()
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
let firstRender = true

function renderContent(cards, grid) {
  const today = new Date()
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(today.getMonth() - 1)

  const allCards = Array.from(grid.querySelectorAll(".content-card"))

  if (allCards.length > 0) {
    allCards.forEach((card) => card.classList.add("hidden"))

    let finished = 0
    allCards.forEach((card) => {
      card.addEventListener(
        "transitionend",
        () => {
          card.remove()
          finished++
          if (finished === allCards.length) {
            addNewCards(cards, grid, oneMonthAgo)
          }
        },
        { once: true }
      )
    })
  } else {
    addNewCards(cards, grid, oneMonthAgo, true)
    firstRender = false
  }
}

// Add cards and fade-in
function addNewCards(cards, grid, oneMonthAgo, instant = false) {
  cards.forEach((content, index) => {
    const card = document.createElement("article")
    card.classList.add("content-card")

    if (!instant) {
      card.classList.add("hidden")
    }

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

    // Staggered fade-in

    if (!instant) {
      const delay = index * 100
      card.style.transitionDelay = `${delay}ms`

      void card.offsetWidth
      card.classList.remove("hidden")

      card.addEventListener(
        "transitionend",
        () => {
          card.style.transitionDelay = ""
        },
        { once: true }
      )
    }
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

// Sort Button: Expand + stagger options on sort button click
const sortButton = document.querySelector(".sort-button")
const sortExpandedMenu = document.querySelector(".sort-expanded-menu")
const sortButtons = Array.from(sortExpandedMenu.querySelectorAll("li button"))

function sortExpandStagger() {
  sortExpandedMenu.classList.add("hide")

  requestAnimationFrame(() => {
    let finished = 0

    const onEnd = (e) => {
      if (e.propertyName !== "opacity") return
      finished += 1
      if (finished === sortButtons.length) {
        sortExpandedMenu.classList.remove("hide", "show")
        sortButtons.forEach((btn) =>
          btn.removeEventListener("transitionend", onEnd)
        )
      }
    }

    sortButtons.forEach((btn) =>
      btn.addEventListener("transitionend", onEnd, { once: false })
    )
  })
}

// Sort Button: Add active class & call expand function
sortButton.addEventListener("click", () => {
  const isShowing = sortExpandedMenu.classList.contains("show")

  if (isShowing) {
    sortButton.classList.remove("active")
    sortExpandStagger()

    // Reset sort on sort button close
    sortButtons.forEach((b) => b.classList.remove("active"))

    // Respect user's category selection
    const activeCategory = document.querySelector(
      ".categories-btn.active"
    ).textContent
    let filtered

    if (activeCategory === "ALL") {
      filtered = content
    } else {
      filtered = content.filter(
        (e) => e.category.toUpperCase() === activeCategory
      )
    }

    const resetSorted = sortContent(filtered, "newest")
    renderContent(resetSorted, grid)
  } else {
    sortExpandedMenu.classList.remove("hide")
    sortButton.classList.add("active")
    sortExpandedMenu.classList.add("show")
  }
})

// Sort Content Helper Function
function sortContent(cards, type) {
  const sorted = [...cards]

  switch (type) {
    case "newest":
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case "oldest":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case "az":
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "za":
      sorted.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return sorted
}

// Event listener on sort buttons
sortButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sortSelection = btn.dataset.sort

    sortButtons.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const activeCategory = document.querySelector(
      ".categories-btn.active"
    ).textContent
    let filtered

    if (activeCategory === "ALL") {
      filtered = content
    } else {
      filtered = content.filter(
        (e) => e.category.toUpperCase() === activeCategory
      )
    }

    const sorted = sortContent(filtered, sortSelection)
    renderContent(sorted, grid)
  })
})

// Search Functionality

// Remove default submit behavior on Enter
const searchForm = document.querySelector(".filter-track-search")
searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
})

const searchInput = document.querySelector(".search-input")

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase()
  // Optimize user input for matching

  content.forEach((item, index) => {
    const card = grid.children[index] // Grid order matches content array
    const title = (item.title || "").toLowerCase().trim()
    const category = (item.category || "").toLowerCase().trim()
    const matches = title.includes(query) || category.includes(query)

    if (matches) {
      showCard(card)
    } else {
      hideCard(card)
    }
  })
})

function showCard(card) {
  if (card.style.display === "none") {
    card.style.display = ""
    requestAnimationFrame(() => card.classList.remove("hidden"))
  } else {
    card.classList.remove("hidden")
  }
}

function hideCard(card) {
  if (card.classList.contains("hidden")) return

  card.classList.add("hidden")
  card.addEventListener(
    "transitionend",
    () => {
      if (card.classList.contains("hidden")) {
        card.style.display = "none" // Remove from grid flow
      }
    },
    { once: true } // Run cleanup once per fade
  )
}
