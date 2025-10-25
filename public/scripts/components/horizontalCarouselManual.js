// horizontalCarouselManual.js

const track = document.querySelector(".carousel-track")
const slides = document.querySelectorAll(".carousel-slide")
const previousButton = document.getElementById("previous")
const nextButton = document.getElementById("next")
const wrapper = document.querySelector(".carousel-wrapper")

let currentIndex = 0

function getMaxIndex() {
  const wrapperWidth = wrapper.offsetWidth
  const trackWidth = track.scrollWidth
  const slideWidth = slides[0].offsetWidth
  const gap = parseInt(getComputedStyle(track).gap)

  const maxScroll = trackWidth - wrapperWidth
  return Math.ceil(maxScroll / (slideWidth + gap))
}

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth
  const gap = parseInt(getComputedStyle(track).gap)
  const maxIndex = getMaxIndex()
  let offset = currentIndex * (slideWidth + gap)

  if (currentIndex === maxIndex) {
    const wrapperWidth = wrapper.offsetWidth
    const trackWidth = track.scrollWidth
    offset = trackWidth - wrapperWidth
  }

  track.style.transform = `translateX(-${offset}px)`

  previousButton.disabled = currentIndex === 0
  nextButton.disabled = currentIndex >= maxIndex

  if (currentIndex === 0) {
    previousButton.classList.remove("active")
  } else {
    previousButton.classList.add("active")
  }

  if (currentIndex >= maxIndex) {
    nextButton.classList.remove("active")
  } else {
    nextButton.classList.add("active")
  }
}

previousButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--
    updateCarousel()
  }
})

nextButton.addEventListener("click", () => {
  const maxIndex = getMaxIndex()
  if (currentIndex < maxIndex) {
    currentIndex++
    updateCarousel()
  }
})

updateCarousel()
