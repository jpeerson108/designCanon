const btnWrappers = document.querySelectorAll(".btn-wrapper")

btnWrappers.forEach((wrapper) => {
  const btnText = wrapper.querySelector(".btn-text")

  wrapper.addEventListener("mouseenter", () => {
    btnText.classList.add("btn-text-show")
  })

  wrapper.addEventListener("mouseleave", () => {
    btnText.classList.remove("btn-text-show")
  })
})
