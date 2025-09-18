// const navAboutText = document.getElementById("about-text")
// const navAboutIcon = document.getElementById("about-icon")
// const navCheatSheetsText = document.getElementById("cheatSheets-text")
// const navCheatSheetsIcon = document.getElementById("cheatSheets-icon")
// const navTutorialsText = document.getElementById("tutorials-text")
// const navTutorialsIcon = document.getElementById("tutorials-icon")

const aboutWrapper = document.querySelector(".about-wrapper")

aboutWrapper = addEventListener("mouseenter", (e) => {
  aboutWrapper.classList.add("show-nav-text")
})

aboutWrapper = addEventListener("mouseleave", (e) => {
  aboutWrapper.classList.remove("show-nav-text")
})

// navAboutIcon.addEventListener("mouseenter", (e) => {
//   navAboutText.classList.add("show-nav-text")
// })

// navAboutIcon.addEventListener("mouseleave", (e) => {
//   navAboutText.classList.remove("show-nav-text")
// })

// navCheatSheetsIcon.addEventListener("mouseenter", (e) => {
//   navCheatSheetsText.classList.add("show-nav-text")
// })

// navCheatSheetsIcon.addEventListener("mouseleave", (e) => {
//   navCheatSheetsText.classList.remove("show-nav-text")
// })

// navTutorialsIcon.addEventListener("mouseenter", (e) => {
//   navTutorialsText.classList.add("show-nav-text")
// })

// navTutorialsIcon.addEventListener("mouseleave", (e) => {
//   navTutorialsText.classList.remove("show-nav-text")
// })
