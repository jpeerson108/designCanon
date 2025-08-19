import { sliderData } from "./sliderData"

const config = {
  SCROLL_SPEED: 1.75,
  LERP_FACTOR: 0.05,
  MAX_VELOCITY: 150,
}

const totalSliderCount = sliderData.length

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

function createSlideElement(index) {
  const slide = document.createElement("div")
  slide.className = "slide"

  if (state.isMobile) {
    slide.style.width = "175px"
    slide.style.height = "250px"
  }
}

console.log("Hi")
