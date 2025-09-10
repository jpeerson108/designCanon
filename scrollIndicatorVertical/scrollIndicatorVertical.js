const counter = document.querySelector(".percent")

TweenLite.set(counter, {
  xPercent: -5,
  //   yPercent: -5,
})

function progress() {
  const windowScrollTop = $(window).scrollTop()
  const docHeight = $(document).height()
  const windowHeight = $(window).height()
  const progress = (windowScrollTop / (docHeight - windowHeight)) * 100

  const $bgColor = progress > 99 ? "#fff" : "#fff"
  const $textColor = progress > 99 ? "#fff" : "#222"

  // This adds a % counter to the progress bar
  //   $("h1")
  //     .text(Math.round(progress) + "%")
  //     .css({ color: $textColor })

  $(".fill")
    .height(progress + "%")
    .css({ backgroundColor: $bgColor })
}

progress()
$(document).on("scroll", progress)

console.log("hi")
