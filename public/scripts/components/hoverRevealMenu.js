const button = document.querySelectorAll(".btn")

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

  btn.addEventListener("mouseenter", () => {
    btnText.classList.add("active")
  })

  btn.addEventListener("mouseleave", () => {
    if (!isCurrentPage) {
      btnText.classList.remove("active")
    }
  })
})
