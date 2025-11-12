const baseImage = document.querySelector(".base-img")

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

if (isTouchDevice) {
  baseImage.addEventListener("touchstart", function (event) {
    event.preventDefault()
    this.classList.add("active")
  })

  baseImage.addEventListener("touchend", function () {
    this.classList.remove("active")
  })

  baseImage.addEventListener("touchcancel", function () {
    this.classList.remove("active")
  })
}
