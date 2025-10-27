document.addEventListener("click", (event) => {
  const icon = event.target.closest(".plus-icon")
  if (!icon) return

  const allBodies = document.querySelectorAll(".show")
  const allIcons = document.querySelectorAll(".plus-icon.active")

  allBodies.forEach((body) => {
    if (body !== icon.parentElement.nextElementSibling) {
      body.style.height = body.scrollHeight + "px"
      body.offsetHeight
      body.style.height = "0"
      body.classList.remove("show")
    }
  })

  allIcons.forEach((activeIcon) => {
    if (activeIcon !== icon) {
      activeIcon.classList.remove("active")
    }
  })

  const body = icon.parentElement.nextElementSibling

  if (body.classList.contains("show")) {
    // Collapse
    body.style.height = body.scrollHeight + "px"
    body.offsetHeight
    body.style.height = "0"
    body.classList.remove("show")
    icon.classList.remove("active")
  } else {
    // Expand
    body.style.height = body.scrollHeight + "px"
    body.classList.add("show")
    icon.classList.add("active")
    body.addEventListener(
      "transitionend",
      () => {
        body.style.height = "auto"
      },
      { once: true }
    )
  }
})
