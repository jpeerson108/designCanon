document.addEventListener("click", (e) => {
  const icon = e.target.closest(".plus-icon")
  if (!icon) return

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
