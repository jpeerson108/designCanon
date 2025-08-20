import { sliderData } from "./sliderData"

// Config below defines slide parameters

const config = {
  SCROLL_SPEED: 1.75,
  LERP_FACTOR: 0.05,
  MAX_VELOCITY: 150,
}

const totalSlideCount = sliderData.length

const state = {
  currentX: 0,
  targetX: 0,
  slideWidth: 390,
  slides: [],
  isDragging: false,
  startX: 0,
  lastX: 0,
  lastMouseX: 0,
  lastScrollTime: Date.now(),
  isMoving: false,
  velocity: 0,
  lastCurrentX: 0,
  dragDistance: 0,
  hasActuallyDragged: false,
  isMobile: false,
}

function checkMobile() {
  state.isMobile = window.innerWidth < 1000
}

// The function below creates individual slide elements for DOM

function createSlideElement(index) {
  const slide = document.createElement("div")
  slide.className = "slide"

  if (state.isMobile) {
    slide.style.width = "175px"
    slide.style.height = "250px"
  }

  const imageContainer = document.createElement("div")
  imageContainer.className = "slide-image"

  const img = document.createElement("img")
  const dataIndex = index % totalSlideCount
  img.src = sliderData[dataIndex].img
  img.alt = sliderData[dataIndex].title

  const overlay = document.createElement("div")
  overlay.className = "slide-overlay"

  const title = document.createElement("p")
  title.className = "project-title"
  title.textContent = sliderData[dataIndex].title

  const arrow = document.createElement("div")
  arrow.className = "project-arrow"
  arrow.innerHTML = `
    <svg viewBox="0 0 24 24">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
    `

  // Don't allow drag if the user doesn't drag much
  slide.addEventListener("click", (e) => {
    e.preventDefault()
    if (state.dragDistance < 10 && !state.hasActuallyDragged) {
      window.localStorage.href = sliderData[dataIndex].url
      // Why is this sliderData url here?
    }
  })

  overlay.appendChild(title)
  overlay.appendChild(arrow)
  imageContainer.appendChild(img)
  slide.appendChild(imageContainer)
  slide.appendChild(overlay)

  return slide
}

// Create full set of slides and place them inside the drag

function initializeSlides() {
  const track = document.querySelector(".slide-track")
  track.innerHTML = ""
  state.slides = []

  checkMobile()
  state.slideWidth = state.isMobile ? 215 : 390

  // Create six copies so we don't hit a dead end before loop
  const copies = 6
  const totalSlides = totalSlideCount * copies

  // Infinite scrolling
  for (let i = 0; i < totalSlides; i++) {
    const slide = createSlideElement(i)
    track.appendChild(slide)
    state.slides.push(slide)
  }

  // Begin the start position in the middle of the 6 copies
  // Shift left by two full loops
  // Assign startOffset to currentX and targetX
  // Gives illusion of infinite scrolling
  const startOffset = -(totalSlideCount * state.slideWidth * 2)
  state.currentX = startOffset
  state.targetX = startOffset
}

// Endless Track
function updateSlidePositions() {
  const track = document.querySelector(".slide-track")
  const sequenceWidth = state.slideWidth * totalSlideCount

  if (state.currentX > -sequenceWidth * 1) {
    state.currentX -= sequenceWidth
    state.targetX -= sequenceWidth
  } else if (state.currentX < sequenceWidth * 4) {
    state.currentX += sequenceWidth
    state.targetX += sequenceWidth
  }
}
