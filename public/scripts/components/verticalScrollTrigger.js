const NEXT = 1
const PREV = -1

function preloadImages(selector) {
  return new Promise((resolve) => {
    const images = document.querySelectorAll(selector)
    let loadedCount = 0
    const totalImages = images.length

    if (totalImages === 0) {
      resolve()
      return
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++
        if (loadedCount === totalImages) resolve()
      } else {
        img.addEventListener("load", () => {
          loadedCount++
          if (loadedCount === totalImages) resolve()
        })
        img.addEventListener("error", () => {
          loadedCount++
          if (loadedCount === totalImages) resolve()
        })
      }
    })
  })
}

class SlideShow {
  DOM = {
    el: null,
    slides: null,
    slidesInner: null,
  }

  current = 0
  slidesTotal = 0
  isAnimating = false

  constructor(DOM_el) {
    this.DOM.el = DOM_el
    this.DOM.slides = [...this.DOM.el.querySelectorAll(".slide")]
    this.DOM.slidesInner = this.DOM.slides.map((item) =>
      item.querySelectorAll(".slide-inner")
    )

    this.DOM.slides[this.current].classList.add("slide--current")
    this.slidesTotal = this.DOM.slides.length
  }

  next() {
    this.navigate(NEXT)
  }

  prev() {
    this.navigate(PREV)
  }

  navigate(direction) {
    if (this.isAnimating) return false
    this.isAnimating = true

    const previous = this.current
    this.current =
      direction === 1
        ? this.current < this.slidesTotal - 1
          ? ++this.current
          : 0
        : this.current > 0
        ? --this.current
        : this.slidesTotal - 1

    const currentSlide = this.DOM.slides[previous]
    const currentInner = this.DOM.slidesInner[previous]
    const upcomingSlide = this.DOM.slides[this.current]
    const upcomingInner = this.DOM.slidesInner[this.current]

    gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: "power4.inOut",
        },
        onStart: () => {
          this.DOM.slides[this.current].classList.add("slide--current")
        },
        onComplete: () => {
          this.DOM.slides[previous].classList.remove("slide--current")
          this.isAnimating = false
        },
      })

      .addLabel("start", 0)
      .to(currentSlide, { yPercent: -direction * 100 }, "start")
      .to(currentInner, { yPercent: -direction * 30 }, "start")

      .fromTo(
        upcomingSlide,
        { yPercent: direction * 100 },
        { yPercent: 0 },
        "start"
      )
      .fromTo(
        upcomingInner,
        { yPercent: -direction * 30 },
        { yPercent: 0 },
        "start"
      )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, Observer)

  const slides = document.querySelector(".slides")
  const slideShow = new SlideShow(slides)

  let lastTime = 0
  const delay = 300

  Observer.create({
    type: "wheel,touch",
    onDown: () => {
      const now = Date.now()
      if (now - lastTime > delay) {
        slideShow.prev()
        lastTime = now
      }
    },
    onUp: () => {
      const now = Date.now()
      if (now - lastTime > delay) {
        slideShow.next()
        lastTime = now
      }
    },
    wheelSpeed: -1,
    tolerance: 30,
  })

  preloadImages(".slide-img").then(() => {
    document.body.classList.remove("loading")
  })
})
