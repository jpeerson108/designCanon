const btnWrappers = document.querySelectorAll(".btn-wrapper")

btnWrappers.forEach((wrapper) => {
  const btnText = wrapper.querySelector(".btn-text")

  // Hover events
  wrapper.addEventListener("mouseenter", () => {
    btnText.classList.add("btn-text-show")
    console.log("hi")
  })

  wrapper.addEventListener("mouseleave", () => {
    btnText.classList.remove("btn-text-show")
  })

  // Active page detection
  const navLink = wrapper.getAttribute("href")

  if (navLink && navLink !== "#") {
    const navURL = new URL(navLink, window.location.href)
    const navPathEnding = navURL.pathname.split("/").pop()

    if (window.location.pathname.endsWith(navPathEnding)) {
      wrapper.classList.add("active")
      btnText.classList.add("show")
    }
  }
})
