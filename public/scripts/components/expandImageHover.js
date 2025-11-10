const imageContainers = document.querySelectorAll(".image-container")

imageContainers.forEach((container) => {
  container.addEventListener("mouseenter", (event) => {
    imageContainers.forEach((otherContainer) => {
      otherContainer.classList.remove("active")
    })

    container.classList.add("active")

    const bounds = container.getBoundingClientRect()
    const mouseX = event.clientX - bounds.left
    const containerWidth = bounds.width

    const fromLeft = mouseX
    const fromRight = containerWidth - mouseX

    if (fromLeft < fromRight) {
      container.style.transformOrigin = "left center"
    } else {
      container.style.transformOrigin = "right center"
    }
  })
})