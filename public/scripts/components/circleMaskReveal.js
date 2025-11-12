const baseImage = document.querySelector(".base-img")

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

if (isTouchDevice) {
  const images = baseImage.querySelectorAll("img")
  images.forEach((image) => {
    image.style.webkitTouchCallout = "none"
    image.style.userSelect = "none"
  })

  baseImage.addEventListener("touchstart", function (event) {
    event.preventDefault()
    this.classList.add("active")
  })

  baseImage.addEventListener("touchend", function (event) {
    event.preventDefault()
    this.classList.remove("active")
  })

  baseImage.addEventListener("touchcancel", function () {
    this.classList.remove("active")
  })
}
