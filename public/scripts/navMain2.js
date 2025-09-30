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

// Hide navbar on scroll-down, show on scroll-up
// let lastScrollY = window.scrollY
// const navbar = document.querySelector("nav")

// window.addEventListener("scroll", () => {
//   if (window.scrollY > lastScrollY) {
//     navbar.classList.add("hidden")
//   } else {
//     navbar.classList.remove("hidden")
//   }
//   lastScrollY = window.scrollY
// })

// ^ Not sure if I want to keep this but leaving it for now
