const dialogueBox = document.querySelector(".dialogue-box")
const dropdownSelector = document.querySelector(".dropdown-selector")
const closeIcon = document.querySelector(".top-bar-close-icon")
const dropdownCount = document.querySelector(".dropdown-count")
const avatarListItems = document.querySelectorAll(".avatars ul li")
const additionalCount = avatarListItems.length - 4

dropdownSelector.addEventListener("click", () => {
  dialogueBox.classList.remove("inactive")
  dropdownSelector.classList.add("inactive")
})

avatarListItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (dialogueBox.classList.contains("inactive")) {
      dialogueBox.classList.remove("inactive")
      dropdownSelector.classList.add("inactive")
    }
  })
})

closeIcon.addEventListener("click", () => {
  dialogueBox.classList.add("inactive")
  dropdownSelector.classList.remove("inactive")
})

if (additionalCount > 0) {
  dropdownCount.textContent = `+${additionalCount}`
}
