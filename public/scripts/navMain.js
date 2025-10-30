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

    // Handle homepage separately
    if (navURL.pathname === "/" && window.location.pathname === "/") {
      box.classList.add("active")
      menuText.classList.add("show")
      return
    }
    if (navURL.pathname === "/") {
      return
    }

    // Match subpages by their ending
    if (navPathEnding && window.location.pathname.endsWith(navPathEnding)) {
      box.classList.add("active")
      menuText.classList.add("show")
    }
  }
})

// Switch text with logo when user is 100px from top of screen
const navLogoText = document.querySelector(".nav-logo-text")
const navLogo = document.querySelector(".nav-logo")
const scrollThreshold = 100

window.addEventListener("scroll", function () {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop

  if (currentScrollPosition <= scrollThreshold) {
    navLogoText.classList.add("active")
    navLogo.classList.remove("active")
    return
  }

  navLogoText.classList.remove("active")
  navLogo.classList.add("active")
})
