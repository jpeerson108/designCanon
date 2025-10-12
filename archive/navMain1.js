const btnWrappers = document.querySelectorAll(".btn-wrapper")

btnWrappers.forEach((wrapper) => {
  const btnText = wrapper.querySelector(".btn-text-expand")

  if (!btnText) return

  let hideTimeout

  // Hover events
  wrapper.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout)
    btnText.classList.add("btn-text-show")
  })

  wrapper.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      btnText.classList.remove("btn-text-show")
    }, 500)
  })

  // Active page detection
  const navLink = wrapper.getAttribute("href")
  if (navLink && navLink !== "#") {
    const navURL = new URL(navLink, window.location.href)
    const navPathEnding = navURL.pathname.split("/").pop()

    if (window.location.pathname.endsWith(navPathEnding)) {
      wrapper.classList.add("active")
      btnText.classList.add("btn-text-show")
    }
  }
})
