document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded")
  const buttons = document.querySelectorAll("button")
  console.log("Found buttons:", buttons.length)

  buttons.forEach((button) => {
    console.log("Setting up button:", button.textContent)
    setupHoverReplace(button)
  })
})

function setupHoverReplace(button) {
  const originalText = button.textContent
  button.textContent = ""

  const textWrapper = document.createElement("div")
  textWrapper.classList.add("button-text-wrapper")

  const originalContainer = document.createElement("div")
  originalContainer.classList.add("letter-container", "original")

  const duplicateContainer = document.createElement("div")
  duplicateContainer.classList.add("letter-container", "duplicate")

  const letters = originalText.split("")

  letters.forEach((letter) => {
    const originalSpan = document.createElement("span")
    originalSpan.classList.add("letter")
    originalSpan.textContent = letter
    originalContainer.appendChild(originalSpan)

    const duplicateSpan = document.createElement("span")
    duplicateSpan.classList.add("letter")
    duplicateSpan.textContent = letter
    duplicateContainer.appendChild(duplicateSpan)
  })

  textWrapper.appendChild(originalContainer)
  textWrapper.appendChild(duplicateContainer)
  button.appendChild(textWrapper)

  let isAnimating = false

  button.addEventListener("mouseenter", () => {
    if (isAnimating) return
    isAnimating = true

    const originalLetters = originalContainer.querySelectorAll(".letter")
    const duplicateLetters = duplicateContainer.querySelectorAll(".letter")

    animateLetters(originalLetters, duplicateLetters, "enter", () => {
      isAnimating = false
    })
  })

  button.addEventListener("mouseleave", () => {
    if (isAnimating) return
    isAnimating = true

    const originalLetters = originalContainer.querySelectorAll(".letter")
    const duplicateLetters = duplicateContainer.querySelectorAll(".letter")

    animateLetters(originalLetters, duplicateLetters, "leave", () => {
      isAnimating = false
    })
  })
}

function animateLetters(
  originalLetters,
  duplicateLetters,
  direction,
  callback
) {
  const staggerDelay = 30
  const animationDuration = 300

  originalLetters.forEach((letter, index) => {
    setTimeout(() => {
      if (direction === "enter") {
        letter.classList.add("move-up")
      } else {
        letter.classList.remove("move-up")
      }
    }, index * staggerDelay)
  })

  duplicateLetters.forEach((letter, index) => {
    setTimeout(() => {
      if (direction === "enter") {
        letter.classList.add("move-up")
      } else {
        letter.classList.remove("move-up")
      }
    }, index * staggerDelay)
  })

  const totalDuration =
    originalLetters.length * staggerDelay + animationDuration
  setTimeout(callback, totalDuration)
}
