const infoButton = document.getElementById("info-button")
const dialogContainer = document.querySelector(".dialog-container")
const dialogCloseButton = document.querySelector(".dialog-close-button")
const dialogBox = document.querySelector(".dialog-box")

function openModal() {
  dialogContainer.classList.add("active")
}

function closeModal() {
  dialogContainer.classList.remove("active")
}

infoButton.addEventListener("click", openModal)
dialogCloseButton.addEventListener("click", closeModal)

dialogContainer.addEventListener("click", (event) => {
  const clickedInsideDialogBox = dialogBox.contains(event.target)
  if (!clickedInsideDialogBox) {
    closeModal()
  }
})
