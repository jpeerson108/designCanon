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

let lastActiveIndex = -1

function updateMapHeights(scrollPos) {
  for (let i = 0; i < accumulatedHeights.length; i++) {
    if (i === 0 && scrollPos < accumulatedHeights[i]) {
      if (lastActiveIndex !== i) {
        if (lastActiveIndex >= 0) {
          mapDivs[lastActiveIndex].style.height = "100px"
        }
        mapDivs[i].style.height = `${sectionHeights[i]}px`
        lastActiveIndex = i
      }

      break
    } else if (
      i > 0 &&
      scrollPos >= accumulatedHeights[i - 1] &&
      scrollPos < accumulatedHeights[i]
    ) {
      if (lastActiveIndex !== i) {
        if (lastActiveIndex >= 0) {
          mapDivs[lastActiveIndex].style.height = "100px"
        }
        mapDivs[i].style.height = `${sectionHeights[i]}px`
        lastActiveIndex = i
      }

      break
    }
  }
}

const sectionTotalHeight = [...sectionDivs].reduce(
  (sum, section) => sum + section.clientHeight,
  0
)

const mapTotalHeight =
  [...mapDivs].reduce((sum, mapDiv) => sum + mapDiv.clientHeight, 0) +
  (mapDivs.length - 1) * 75

const sectionsScrollableHeight = sectionTotalHeight - window.innerHeight
const mapScrollableHeight = mapTotalHeight - window.innerHeight

// const scrollRatio = mapScrollableHeight / sectionsScrollableHeight

// const mapTranslateY = scrollPos * scrollRatio
// document.querySelector(
//   ".map"
// ).style.transform = `translateY(-${mapTranslateY}px)`

// updateMapHeights(scrollPos)

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY || window.pageYOffset

  const scrollRatio = mapScrollableHeight / sectionsScrollableHeight
  const mapTranslateY = scrollPos * scrollRatio

  document.querySelector(
    ".map"
  ).style.transform = `translateY(-${mapTranslateY}px)`

  updateMapHeights(scrollPos)
})
