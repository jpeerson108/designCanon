document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger)

  // Dynamically create 16 block elements per row
  const blocksRows = document.querySelectorAll(".blocks-row")
  blocksRows.forEach((row) => {
    for (let i = 0; i < 33; i++) {
      const block = document.createElement("div")
      block.className = "block"
      row.appendChild(block)
    }
  })

  const blockContainers = document.querySelectorAll(".blocks-container")
  blockContainers.forEach((container) => {
    const rows = container.querySelectorAll(".blocks-row")
    const numRows = rows.length

    rows.forEach((row, rowIndex) => {
      let blocks = Array.from(row.querySelectorAll(".block"))
      let isTop = container.classList.contains("top")

      let randomizedOrder = gsap.utils.shuffle(blocks.map((block, idx) => idx))

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          let progress = self.progress
          let rowDelay = 0.3 * (numRows - rowIndex - 1)
          let adjustedProgress = Math.max(0, Math.min(1, progress - rowDelay))

          updateBlocksOpacity(blocks, randomizedOrder, isTop, adjustedProgress)
        },
      })
    })
  })

  function updateBlocksOpacity(blocks, order, isTop, progress) {
    blocks.forEach((block, idx) => {
      let offset = order.indexOf(idx) / blocks.length
      let adjustedProgress = (progress - offset) * blocks.length
      let opacity = isTop
        ? 1 - Math.min(1, Math.max(0, adjustedProgress))
        : Math.min(1, Math.max(0, adjustedProgress))

      block.style.opacity = opacity
    })
  }
})
