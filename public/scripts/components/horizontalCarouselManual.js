// Carousel configuration
const slideWidth = 375
const slideGap = 20
const slideStepSize = slideWidth + slideGap
const rightEndDistance = 120

// DOM elements
const carouselTrack = document.querySelector(".carousel-track")
const previousButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")
const slides = document.querySelectorAll(".carousel-slide")
const carouselWrapper = document.querySelector(".carousel-wrapper")

// State
let currentIndex = 0
let maxIndex = 0

// Calculate max index on load and resize
function calculateMaxIndex() {
  const viewportWidth = carouselWrapper.offsetWidth
  const lastSlideRightEdge =
    slides.length * slideWidth + (slides.length - 1) * slideGap
  const maxScroll = lastSlideRightEdge - (viewportWidth - rightEndDistance)
  maxIndex = Math.ceil(maxScroll / slideStepSize)
}

// Move carousel
function moveToIndex(index) {
  const isLastIndex = index === maxIndex
  let translateAmount

  if (isLastIndex) {
    // Position last slide exactly rightEndDistance from right edge
    const viewportWidth = carouselWrapper.offsetWidth
    const lastSlideRightEdge =
      slides.length * slideWidth + (slides.length - 1) * slideGap
    translateAmount = lastSlideRightEdge - (viewportWidth - rightEndDistance)
  }

  if (!isLastIndex) {
    // Normal step-based scrolling
    translateAmount = index * slideStepSize
  }

  carouselTrack.style.transform = `translateX(-${translateAmount}px)`
  currentIndex = index
  updateButtons()
}

// Update button states
function updateButtons() {
  previousButton.disabled = currentIndex === 0
  previousButton.classList.toggle("active", currentIndex > 0)

  nextButton.disabled = currentIndex === maxIndex
  nextButton.classList.toggle("active", currentIndex < maxIndex)
}

// Navigation
function goToPrevious() {
  if (currentIndex === 0) return
  moveToIndex(currentIndex - 1)
}

function goToNext() {
  if (currentIndex === maxIndex) return
  moveToIndex(currentIndex + 1)
}

// Event listeners
previousButton.addEventListener("click", goToPrevious)
nextButton.addEventListener("click", goToNext)

window.addEventListener("resize", () => {
  calculateMaxIndex()
  if (currentIndex > maxIndex) {
    moveToIndex(maxIndex)
  }
  if (currentIndex <= maxIndex) {
    moveToIndex(currentIndex)
  }
})

// Initialize
calculateMaxIndex()
updateButtons()
