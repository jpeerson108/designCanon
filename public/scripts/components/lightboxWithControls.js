const gridItems = document.querySelectorAll(".grid-item")
const lightbox = document.querySelector(".lightbox")
const lightboxImage = document.querySelector(".lightbox-image")
const controls = document.querySelector(".controls")
const exitButton = document.querySelector(".exit-button")
const nextButton = document.querySelector(".next-button")
const prevButton = document.querySelector(".prev-button")

let currentIndex = 0
const totalImages = gridItems.length

function openLightbox(index) {
  currentIndex = index
  const imageSrc = gridItems[index].querySelector("img").src
  lightboxImage.src = imageSrc
  lightbox.classList.add("active")
  controls.classList.add("active")
}

function closeLightbox() {
  lightbox.classList.remove("active")
  controls.classList.remove("active")
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % totalImages
  lightboxImage.src = gridItems[currentIndex].querySelector("img").src
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages
  lightboxImage.src = gridItems[currentIndex].querySelector("img").src
}

gridItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index))
})

exitButton.addEventListener("click", closeLightbox)
nextButton.addEventListener("click", showNextImage)
prevButton.addEventListener("click", showPreviousImage)

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox()
  }
})

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return

  if (event.key === "Escape") closeLightbox()
  if (event.key === "ArrowRight") showNextImage()
  if (event.key === "ArrowLeft") showPreviousImage()
})
