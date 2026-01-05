const footerMobilePieMenu = document.getElementById("footer-mobile-pie-menu")
const footerMobileWrapper = document.querySelector(".footer-mobile-wrapper")
const footerMobileBackdrop = document.querySelector(".footer-mobile-backdrop")
const footerMobilePieMenuText = document.querySelector(
  ".footer-mobile-item.pie-menu .footer-mobile-text"
)

footerMobilePieMenu.addEventListener("click", () => {
  footerMobileWrapper.classList.toggle("active")
})

footerMobileBackdrop.addEventListener("click", () => {
  footerMobileWrapper.classList.remove("active")
})

footerMobilePieMenuText.addEventListener("click", () => {
  footerMobileWrapper.classList.remove("active")
})
