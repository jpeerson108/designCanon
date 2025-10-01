// Fetch JSON data
async function loadContent() {
  const response = await fetch("/data/content.json")
  const content = await response.json()
  const grid = document.getElementById("contentGrid")
  const categoriesTrack = document.querySelector(".filter-track-categories")
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

  // Render component cards
  renderContent(content, grid)

  // Filter grid cards on category selection
  categoriesTrack.addEventListener("click", (e) => {
    if (!e.target.classList.contains("categories-btn")) return

    document
      .querySelectorAll(".categories-btn")
      .forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Filter cards
    const category = e.target.textContent
    if (category === "ALL") {
      renderContent(content, grid)
    } else {
      const filtered = content.filter(
        (c) => c.category.toUpperCase() === category
      )
      renderContent(filtered, grid)
    }
  })
}

function renderContent(cards, grid) {
  grid.innerHTML = ""
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

    grid.appendChild(card)
  })
}

loadContent()
