const allSectionItems = document.querySelectorAll(".content-section-item")
const allMediaWrappers = document.querySelectorAll(
  ".content-section-media-wrapper"
)
const timeoutDelay = 3500

let currentIndex = 0
let intervalId = null
let isPaused = false

function setActiveSlide(index, skipAnimation = false) {
  // Remove active class from all items
  allSectionItems.forEach((item) => {
    item.classList.remove("active")
    const bullet = item.querySelector(".custom-bullet")
    if (bullet) {
      bullet.classList.remove("active")
    }
  })

  allMediaWrappers.forEach((wrapper) => {
    wrapper.classList.remove("active")
  })

  // Add active class to current index
  const currentItem = allSectionItems[index]
  const currentMediaWrapper = allMediaWrappers[index]

  if (currentItem && currentMediaWrapper) {
    currentItem.classList.add("active")
    currentMediaWrapper.classList.add("active")

    const customBullet = currentItem.querySelector(".custom-bullet")
    const customBulletFiller = currentItem.querySelector(
      ".custom-bullet-filler"
    )

    if (skipAnimation) {
      if (customBullet) {
        customBullet.classList.add("active")
      }
    } else {
      // Bullet fills with css keyframes
      if (customBulletFiller) {
        customBulletFiller.style.animation = "none"
        customBulletFiller.offsetHeight
        customBulletFiller.style.animation = `fillBullet ${timeoutDelay}ms linear forwards`
      }
    }
  }
}

function startLoop() {
  if (isPaused) return

  intervalId = setInterval(() => {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % allSectionItems.length
      setActiveSlide(currentIndex)
    }
  }, timeoutDelay)
}

function pauseLoop() {
  isPaused = true
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function resumeLoop() {
  isPaused = false
  startLoop()
}

allSectionItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    pauseLoop()
    currentIndex = index
    setActiveSlide(currentIndex, true)

    setTimeout(() => {
      resumeLoop()
      setActiveSlide(currentIndex)
    }, 10000)
  })
})

if (allSectionItems.length > 0) {
  setActiveSlide(0)
  startLoop()
}
