async function loadComponents() {
  const response = await fetch("/data/content.json")
  const components = await response.json()

  const grid = document.getElementById("componentGrid")

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

    if (component.new) {
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
