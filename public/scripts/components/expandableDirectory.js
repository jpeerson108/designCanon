const dialogueBoxWrapper = document.querySelector(".dialogue-box-wrapper")
const dropdownSelector = document.querySelector(".dropdown-selector")
const closeIcon = document.querySelector(".top-bar-close-icon")

dropdownSelector.addEventListener("click", () => {
  dialogueBoxWrapper.classList.remove("inactive")
  dropdownSelector.classList.add("inactive")
})

closeIcon.addEventListener("click", () => {
  dialogueBoxWrapper.classList.add("inactive")
  dropdownSelector.classList.remove("inactive")
})
