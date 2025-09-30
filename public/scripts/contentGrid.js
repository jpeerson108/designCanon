// Fetch JSON data
async function loadComponents() {
  const response = await fetch("/data/content.json")
  const components = await response.json()
  const grid = document.getElementById("componentGrid")
  const filterTrack = document.querySelector(".filter-track")
  const categories = [...new Set(components.map((c) => c.category))]
  const filters = ["All", ...categories]

  // Default sort cards by newest date
  components.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Render filter buttons
  filters.forEach((category) => {
    const filterBtn = document.createElement("button")
    filterBtn.textContent = category.toUpperCase()
    filterBtn.classList.add("filter-btn")
    if (category === "All") filterBtn.classList.add("active")
    filterTrack.appendChild(filterBtn)
  })

  // Render component cards
  renderComponents(components, grid)

  // Filter grid cards on category selection
  filterTrack.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return

    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Filter cards
    const category = e.target.textContent
    if (category === "ALL") {
      renderComponents(components, grid)
    } else {
      const filtered = components.filter(
        (c) => c.category.toUpperCase() === category
      )
      renderComponents(filtered, grid)
    }
  })
}

function renderComponents(cards, grid) {
  grid.innerHTML = ""
  cards.forEach((component) => {
    const card = document.createElement("article")
    card.classList.add("component-card")

    card.innerHTML = `
        <a href="${component.href}">
          <img src="${component.image}" alt="${component.title}">
        </a>
        <div class="component-data">
          <a href="${component.href}"><h3>${component.title}</h3></a>
          <p>Category: ${component.category}</p>
        </div>
        `

    grid.appendChild(card)
  })
}

loadComponents()
