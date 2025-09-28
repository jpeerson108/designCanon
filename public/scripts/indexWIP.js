async function loadComponents() {
  const response = await fetch("/data/content.json")
  const components = await response.json()

  const grid = document.getElementById("componentGrid")

  components.forEach((component) => {
    const card = document.createElement("article")
    card.classList.add("component-card")

    card.innerHTML = `
        <img src="${component.image}" alt="${component.title}">
        <h3>${component.title}</h3>
        <p>${component.category}</p>
        `

    grid.appendChild(card)
  })
}

loadComponents()
