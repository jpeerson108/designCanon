let currentScroll = 0
let isScrollingDown = true
const arrows = document.querySelectorAll(".arrow")

let tween = gsap
  .to(".marquee-part", {
    xPercent: -100,
    repeat: -1,
    duration: 6,
    ease: "linear",
  })
  .totalProgress(0.5)

gsap.set(".marquee-inner", { xPercent: -50 })

window.addEventListener("scroll", function () {
  if (this.window.pageYOffset > currentScroll) {
    isScrollingDown = true
  } else {
    isScrollingDown = false
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  })

  arrows.forEach((arrow) => {
    if (isScrollingDown) {
      arrow.classList.remove("active")
    } else {
      arrow.classList.add("active")
    }
  })

  currentScroll = window.pageYOffset
})
