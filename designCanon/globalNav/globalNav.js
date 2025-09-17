const navAboutText = document.getElementById("about-text")
const navAboutIcon = document.getElementById("about-icon")

navAboutIcon.addEventListener("mouseenter", (e) => {
  navAboutText.classList.add("show-nav-text")
})

navAboutIcon.addEventListener("mouseleave", (e) => {
  navAboutText.classList.remove("show-nav-text")
})
