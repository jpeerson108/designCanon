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

  function createSquares() {
    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div")
      square.classList.add("square")
      squareContainer.appendChild(square)
      squares.push(square)
    }
  }

  function animateSquares() {
    gsap.fromTo(
      squares,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.3,
        duration: 0.001,
        stagger: {
          each: 0.008,
          from: "random",
        },
      }
    )

    gsap.to(squares, {
      opacity: 0,
      delay: 1,
      duration: 0.001,
      stagger: {
        each: 0.008,
        from: "random",
      },
    })
  }

  let overlayVisibile = false

  document.getElementById("toggle").addEventListener("click", () => {
    squareContainer.innerHTML = ""
    squares = []
    createSquares()
    animateSquares()

    gsap.to(menu, 0.025, {
      opacity: overlayVisibile ? 0 : 1,
      visibility: overlayVisibile ? "hidden" : "visible",
      delay: 1,
    })

    gsap.to(menu, {
      zIndex: overlayVisibile ? -1 : 0,
      delay: overlayVisibile ? 0 : 2,
    })

    overlayVisibile = !overlayVisibile
  })
})
