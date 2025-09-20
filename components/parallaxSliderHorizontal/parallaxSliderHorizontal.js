import { sliderData } from "./sliderData"

// Config below defines slide parameters

const config = {
  SCROLL_SPEED: 1.75, // Scroll Speed
  LERP_FACTOR: 0.05, // Smoothing
  MAX_VELOCITY: 150, // How much a single drag can move the track
}

const totalSlideCount = sliderData.length

// State holds all the dynamic values that will change over time

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

  // Checks if mobile
  if (state.isMobile) {
    slide.style.width = "175px"
    slide.style.height = "250px"
  }

  // Creates container for image
  const imageContainer = document.createElement("div")
  imageContainer.className = "slide-image"

  // Creates image and pulls from sliderData import object
  const img = document.createElement("img")
  const dataIndex = index % totalSlideCount
  img.src = sliderData[dataIndex].img
  img.alt = sliderData[dataIndex].title

  // Overlay show on slide hover when not moving
  const overlay = document.createElement("div")
  overlay.className = "slide-overlay"

  const title = document.createElement("p")
  title.className = "project-title"
  title.textContent = sliderData[dataIndex].title

  // Creates an arrow near the slide title on hover
  const arrow = document.createElement("div")
  arrow.className = "project-arrow"
  arrow.innerHTML = `
    <svg viewBox="0 0 24 24">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
    `

  // If the drag distance is super low and if the state isn't in drag
  // Assign the URL from dataIndex as an href
  slide.addEventListener("click", (e) => {
    if (state.dragDistance < 10 && !state.hasActuallyDragged) {
      window.location.href = sliderData[dataIndex].url
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

  // keep currentX within [-4 * sequenceWidth, -1 * sequenceWidth]
  if (state.currentX > -sequenceWidth * 1) {
    state.currentX -= sequenceWidth
    state.targetX -= sequenceWidth
  } else if (state.currentX < -sequenceWidth * 4) {
    state.currentX += sequenceWidth
    state.targetX += sequenceWidth
  }

  track.style.transform = `translate3d(${state.currentX}px,0,0)`
}

// Parallex Effect

// Adjusts position of each image based on how far it is from the center of the screen
function updateParallax() {
  // Calculate center point of viewport
  const viewportCenter = window.innerWidth / 2

  // Load through all slides, get bounding boxes
  state.slides.forEach((slide) => {
    const img = slide.querySelector("img")
    if (!img) return

    const slideRect = slide.getBoundingClientRect()

    if (slideRect.right < -500 || slideRect.left > window.innerWidth + 500) {
      return
    }

    // Offset depending on how far image is from center
    // Gives parallax effect
    const slideCenter = slideRect.left + slideRect.width / 2
    const distanceFromCenter = slideCenter - viewportCenter
    const parallaxOffset = distanceFromCenter * -0.25

    img.style.transform = `translateX(${parallaxOffset}px) scale(2.25)`
  })
}

// Tracking Velocity
function updateMovingState() {
  state.velocity = Math.abs(state.currentX - state.lastCurrentX)
  state.lastCurrentX = state.currentX

  // If velocity is super low, consider slider not moving
  const isSlowEnough = state.velocity < 0.1
  const hasBeenStillLongEnough = Date.now() - state.lastScrollTime > 200
  state.isMoving =
    state.hasActuallyDragged || !isSlowEnough || !hasBeenStillLongEnough

  // Sync velocity to CSS style tag --slider-moving
  // Helps with displaying overlay
  document.documentElement.style.setProperty(
    "--slider-moving",
    state.isMoving ? "1" : "0"
  )
}

// Animation Loop
function animate() {
  state.currentX += (state.targetX - state.currentX) * config.LERP_FACTOR

  updateMovingState()
  updateSlidePositions()
  updateParallax()

  requestAnimationFrame(animate)
}

// Vertical Scroll Ignore
function handleWheel(e) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

  e.preventDefault()
  state.lastScrollTime = Date.now()

  const scrollDelta = e.deltaY * config.SCROLL_SPEED
  const clamped = Math.max(
    -config.MAX_VELOCITY,
    Math.min(scrollDelta, config.MAX_VELOCITY)
  )
  state.targetX -= clamped // down = left, up = right
}

// Mobile touch
function handleTouchStart(e) {
  state.isDragging = true
  state.startX = e.touches[0].clientX
  state.lastX = state.targetX
  state.dragDistance = 0
  state.hasActuallyDragged = false
  state.lastScrollTime = Date.now()
}

function handleTouchMove(e) {
  if (!state.isDragging) return

  const deltaX = (e.touches[0].clientX - state.startX) * 1.5
  state.targetX = state.lastX + deltaX
  state.dragDistance = Math.abs(deltaX)

  if (state.dragDistance > 5) {
    state.hasActuallyDragged = true
  }

  state.lastScrollTime = Date.now()
}

function handleTouchEnd() {
  state.isDragging = false
  setTimeout(() => {
    state.hasActuallyDragged = false
  }, 100)
}

function handleMouseDown(e) {
  e.preventDefault()
  state.isDragging = true
  state.startX = e.clientX
  state.lastMouseX = e.clientX
  state.lastX = state.targetX
  state.dragDistance = 0
  state.hasActuallyDragged = false
  state.lastScrollTime = Date.now()
}

function handleMouseMove(e) {
  if (!state.isDragging) return

  e.preventDefault()
  const deltaX = (e.clientX - state.lastMouseX) * 2
  state.targetX += deltaX
  state.lastMouseX = e.clientX
  state.dragDistance += Math.abs(deltaX)

  if (state.dragDistance > 5) {
    state.hasActuallyDragged = true
  }

  state.lastScrollTime = Date.now()
}

function handleMouseUp() {
  state.isDragging = false
  setTimeout(() => {
    state.hasActuallyDragged = false
  }, 100)
}

function handleResize() {
  initializeSlides()
}

function initializeEventListeners() {
  const slider = document.querySelector(".slider")

  slider.addEventListener("wheel", handleWheel, { passive: false })
  slider.addEventListener("touchstart", handleTouchStart)
  slider.addEventListener("touchmove", handleTouchMove)
  slider.addEventListener("touchend", handleTouchEnd)
  slider.addEventListener("mousedown", handleMouseDown)
  slider.addEventListener("mouseleave", handleMouseUp)
  slider.addEventListener("dragstart", (e) => e.preventDefault())

  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
  window.addEventListener("resize", handleResize)
}

function initializeSlider() {
  initializeSlides()
  initializeEventListeners()
  animate()
}

document.addEventListener("DOMContentLoaded", initializeSlider)
