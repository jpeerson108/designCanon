const mapDivs = document.querySelectorAll(".map > div")
const sectionDivs = document.querySelectorAll(".sections > .sec")
const sectionHeights = []
const accumulatedHeights = []
const RATIO = 0.5

let accumulatedHeight = 0
sectionDivs.forEach((section) => {
  const height = section.clientHeight
  sectionHeights.push(height * RATIO)
  accumulatedHeight += height
  accumulatedHeights.push(accumulatedHeight)
})
