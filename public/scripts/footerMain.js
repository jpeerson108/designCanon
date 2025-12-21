const footer = document.querySelector("footer")
const scrollThreshold = 60

function updateFooterState() {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const distanceFromBottom = documentHeight - (scrollPosition + windowHeight)

  if (scrollPosition > scrollThreshold) {
    footer.classList.remove("invisible")
  } else {
    footer.classList.add("invisible")
  }

  if (distanceFromBottom < 180) {
    footer.classList.remove("float")
  } else {
    footer.classList.add("float")
  }
}

window.addEventListener("scroll", updateFooterState)

updateFooterState()
