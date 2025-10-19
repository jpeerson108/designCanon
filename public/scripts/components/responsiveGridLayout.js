document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired")
  console.log("jQuery available:", typeof jQuery !== "undefined")
  console.log(
    "jaliswall available:",
    typeof jQuery !== "undefined" && typeof jQuery.fn.jaliswall !== "undefined"
  )
  console.log("Wall element found:", document.querySelector(".wall") !== null)
  console.log("Window width:", window.innerWidth)

  if (
    typeof jQuery !== "undefined" &&
    typeof jQuery.fn.jaliswall !== "undefined"
  ) {
    $(".wall").jaliswall({
      item: ".wall-item",
      columnClass: ".wall-column",
      columnCount: 3,
    })
    console.log("jaliswall initialized")

    setTimeout(() => {
      const columns = document.querySelectorAll(".wall-column")
      console.log("Number of columns created:", columns.length)
    }, 100)
  } else {
    console.error("jQuery or jaliswall not loaded yet")
  }
})
