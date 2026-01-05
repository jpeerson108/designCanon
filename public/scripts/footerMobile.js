const footerMobilePieMenu = document.getElementById("footer-mobile-pie-menu")
const footerMobileWrapper = document.querySelector(".footer-mobile-wrapper")

footerMobilePieMenu.addEventListener("click", () => {
  footerMobileWrapper.classList.toggle("active")
})
