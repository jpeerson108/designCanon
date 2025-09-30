const menuBox = document.querySelectorAll(".menu-box")

menuBox.forEach((box) => {
  const menuText = box.querySelector(".nav-menu-text")
  const link = box.querySelector("a")
  const navLink = link ? link.getAttribute("href") : null

  if (!menuText) return

  let hideTimeout

  // Add/Remove class on hover
  box.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout)
    menuText.classList.add("show")
    box.classList.add("hovering")
  })

  box.addEventListener("mouseleave", () => {
    if (box.classList.contains("active")) return
    hideTimeout = setTimeout(() => {
      menuText.classList.remove("show")
      box.classList.remove("hovering")
    }, 0)
  })

  // Active page detection
  if (navLink && navLink !== "#") {
    const navURL = new URL(navLink, window.location.href)
    const navPathEnding = navURL.pathname.split("/").pop()

    if (window.location.pathname.endsWith(navPathEnding)) {
      box.classList.add("active")
      menuText.classList.add("show")
    }
  }
})
