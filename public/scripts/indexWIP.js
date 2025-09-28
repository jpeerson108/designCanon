async function loadComponents() {
  const response = await fetch("/data/content.json")
  const components = await response.json()

  const grid = document.getElementById("componentGrid")

  // Default sort cards by newest date
  components.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Dynamically create each card via JSON data
  components.forEach((component) => {
    const card = document.createElement("article")
    card.classList.add("component-card")

    card.innerHTML = `
        <a href="${component.href}"><img src="${component.image}" alt="${component.title}"></a>
        <div class="component-data">
        <a href="${component.href}"><h3>${component.title}</h3></a>
        <p>Category: ${component.category}</p>
        </div>
        `

    // Add "New!" label to dates within the last month
    const today = new Date()
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(today.getMonth() - 1)

    const componentDate = new Date(component.date)
    if (componentDate >= oneMonthAgo) {
      const newLabel = document.createElement("a")
      newLabel.classList.add("new-label")
      newLabel.textContent = "New!"
      newLabel.href = component.href

      card.appendChild(newLabel)
    }

    grid.appendChild(card)
  })
}

loadComponents()
