window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".content-overlay")
  gsap.set(menu, { opacity: 0 })

  const squareContainer = document.getElementById("square-container")

  const squareSize = 100
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const numCols = Math.ceil(screenWidth / squareSize)
  const numRows = Math.ceil(screenHeight / squareSize)

  const numSquares = numCols * numRows

  squareContainer.style.width = `${numCols * squareSize}px`
  squareContainer.style.height = `${numRows * squareSize}px`

  let squares = []

  const inactiveToggle = document.querySelector(".toggle.inactive")
  const activeToggle = document.querySelector(".toggle.active")

  // Set button text content here
  inactiveToggle.textContent = "Click This Thing"
  activeToggle.textContent = "Do It Again!"

  gsap.set(activeToggle, { opacity: 0, visibility: "hidden" })

  function createSquares() {
    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div")
      square.classList.add("square")
      squareContainer.appendChild(square)
      squares.push(square)
    }
  }

  function animateSquares(callback) {
    // Total animation time
    const staggerTime = 0.003
    const totalFillTime = squares.length * staggerTime
    const coverTime = 0.1 + totalFillTime

    gsap.fromTo(
      squares,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.1,
        duration: 0.001,
        stagger: {
          each: staggerTime,
          from: "random",
        },
        onComplete: () => {
          if (callback) callback()
        },
      }
    )

    gsap.to(squares, {
      opacity: 0,
      delay: coverTime + 0.2,
      duration: 0.001,
      stagger: {
        each: staggerTime,
        from: "random",
      },
      onComplete: () => {
        // Clear all squares when animation completes
        squareContainer.innerHTML = ""
        squares = []
      },
    })
  }

  let overlayVisible = false

  // Inactive toggle click handler
  inactiveToggle.addEventListener("click", () => {
    createSquares()
    animateSquares(() => {
      inactiveToggle.style.opacity = 0
      inactiveToggle.style.visibility = "hidden"

      menu.style.opacity = 1
      menu.style.visibility = "visible"
      menu.style.zIndex = 0

      activeToggle.style.opacity = 1
      activeToggle.style.visibility = "visible"
    })

    overlayVisible = true
  })

  // Active toggle click handler
  activeToggle.addEventListener("click", () => {
    createSquares()
    animateSquares(() => {
      menu.style.opacity = 0
      menu.style.visibility = "hidden"
      menu.style.zIndex = -1

      activeToggle.style.opacity = 0
      activeToggle.style.visibility = "hidden"

      inactiveToggle.style.opacity = 1
      inactiveToggle.style.visibility = "visible"
    })

    overlayVisible = false
  })
})
