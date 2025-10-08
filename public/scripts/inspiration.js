const grid = document.querySelector(".content-grid")

// Open card links in new tab
grid.addEventListener("click", (e) => {
  const link = e.target.closest(".content-card a[href]")
  if (!link || !grid.contains(link)) return

  e.preventDefault()
  window.open(link.href, "_blank", "noopener,noreferrer")
})
