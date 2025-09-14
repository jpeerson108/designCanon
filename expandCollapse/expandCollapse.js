document.addEventListener("click", (e) => {
  const icon = e.target.closest(".plus-icon")
  if (!icon) return // only run when .plus-icon is clicked

  const body = icon.parentElement.nextElementSibling

  body.classList.toggle("show")
})
