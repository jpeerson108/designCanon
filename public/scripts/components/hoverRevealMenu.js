const button = document.querySelectorAll(".btn")
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches

button.forEach((btn) => {
  const btnText = btn.querySelector(".btn-text")

  const navLink = btn.getAttribute("href")
  let isCurrentPage = false

  if (navLink && navLink !== "#") {
    const navURL = new URL(navLink, window.location.href)
    const navPathEnding = navURL.pathname.split("/").pop()

    if (window.location.pathname.endsWith(navPathEnding)) {
      btnText.classList.add("active")
      isCurrentPage = true
    }
  }

  if (isTouchDevice) {
    btn.addEventListener("click", (event) => {
      if (isCurrentPage) {
        event.preventDefault()
        btnText.classList.toggle("active")
        return
      }

      const isActive = btnText.classList.contains("active")

      if (!isActive) {
        event.preventDefault()
        btnText.classList.add("active")

        setTimeout(() => {
          window.location.href = navLink
        }, 300)
      }
    })
  } else {
    btn.addEventListener("mouseenter", () => {
      btnText.classList.add("active")
    })

    btn.addEventListener("mouseleave", () => {
      if (!isCurrentPage) {
        btnText.classList.remove("active")
      }
    })
  }
})
