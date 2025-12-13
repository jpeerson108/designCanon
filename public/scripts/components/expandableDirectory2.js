const dialogueBox = document.querySelector(".dialogue-box")
const dropdownSelector = document.querySelector(".dropdown-selector")
const closeIcon = document.querySelector(".top-bar-close-icon")

dropdownSelector.addEventListener("click", () => {
  dialogueBox.classList.remove("inactive")
  dropdownSelector.classList.add("inactive")
})

closeIcon.addEventListener("click", () => {
  dialogueBox.classList.add("inactive")
  dropdownSelector.classList.remove("inactive")
})
