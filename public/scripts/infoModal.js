const infoButton = document.getElementById("info-button")
const dialogContainer = document.querySelector(".dialog-container")
const dialogCloseButton = document.querySelector(".dialog-close-button")
const dialogBox = document.querySelector(".dialog-box")
const dialogBody = document.querySelector('.dialog-body');
const dialogBodyGradientTop = document.querySelector('.dialog-body-gradient-top');
const dialogBodyGradientBottom = document.querySelector('.dialog-body-gradient-bottom');

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

function handleDialogScroll() {
  const scrollTop = dialogBody.scrollTop;
  const scrollHeight = dialogBody.scrollHeight;
  const clientHeight = dialogBody.clientHeight;
  
  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
  
  if (isAtTop) {
    dialogBodyGradientTop.classList.remove('active');
  } else {
    dialogBodyGradientTop.classList.add('active');
  }
  
  if (isAtBottom) {
    dialogBodyGradientBottom.classList.remove('active');
  } else {
    dialogBodyGradientBottom.classList.add('active');
  }
}

dialogBody.addEventListener('scroll', handleDialogScroll);

handleDialogScroll();