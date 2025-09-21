import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import Lenis from "lenis"

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis()
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  const animeTextParagraphs = document.querySelectorAll(".anime-text p")

  const wordHighlightBgColor = "60, 60, 60"

  const keywords = ["enlightenment", "seldom", "wisdom", "facing", "face"]

  animeTextParagraphs.forEach((paragraph) => {
    const text = paragraph.textContent
    const words = text.split(/\s+/)
    paragraph.innerHTML = ""

    words.forEach((word) => {
      if (word.trim()) {
        const wordContainer = document.createElement("div")
        wordContainer.className = "word"

        const wordText = document.createElement("span")
        wordText.textContent = word

        const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "")
        if (keywords.includes(normalizedWord)) {
          wordContainer.classList.add("keyword-wrapper")
          wordText.classList.add("keyword", normalizedWord)
        }

        wordContainer.appendChild(wordText)
        paragraph.appendChild(wordContainer)
      }
    })
  })

  const animeTextContainers = document.querySelectorAll(".anime-text-container")

  animeTextContainers.forEach((container) => {
    ScrollTrigger.create({
      trigger: container,
      pin: container,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress
        const words = Array.from(
          container.querySelectorAll(".anime-text .word")
        )
        const totalWords = words.length

        words.forEach((word, index) => {
          const wordText = word.querySelector("span")

          if (progress <= 0.7) {
            const progressTarget = 0.7
            const revealProgress = Math.min(1, progress / progressTarget)

            const overlapWords = 15
            const totalAnimationLength = 1 + overlapWords / totalWords

            const wordStart = index / totalWords
            const wordEnd = wordStart + overlapWords / totalWords

            const timelineScale =
              1 /
              Math.min(
                totalAnimationLength,
                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
              )

            const adjustedStart = wordStart * timelineScale
            const adjustedEnd = wordEnd * timelineScale
            const duration = adjustedEnd - adjustedStart

            const wordProgress =
              revealProgress <= adjustedStart
                ? 0
                : revealProgress >= adjustedEnd
                ? 1
                : (revealProgress - adjustedStart) / duration

            word.style.opacity = wordProgress

            const backgroundFadeStart =
              wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart)
            word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`

            const textRevealThreshold = 0.9
            const textRevealProgress =
              wordProgress >= textRevealThreshold
                ? (wordProgress - textRevealThreshold) /
                  (1 - textRevealThreshold)
                : 0
            wordText.style.opacity = Math.pow(textRevealProgress, 0.5)
          } else {
            const reverseProgress = (progress - 0.7) / 0.3
            word.style.opacity = 1
            const targetTextOpacity = 1

            const reverseOverlapWords = 5
            const reverseWordStart = index / totalWords
            const reverseWordEnd =
              reverseWordStart + reverseOverlapWords / totalWords

            const reverseTimelineScale =
              1 /
              Math.max(
                (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
              )

            const reverseAdjustedStart = reverseWordStart * reverseTimelineScale
            const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale
            const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart

            const reverseWordProgress =
              reverseProgress <= reverseAdjustedStart
                ? 0
                : reverseProgress >= reverseAdjustedEnd
                ? 1
                : (reverseProgress - reverseAdjustedStart) / reverseDuration

            if (reverseWordProgress > 0) {
              wordText.style.opacity =
                targetTextOpacity * (1 - reverseWordProgress)
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`
            } else {
              wordText.style.opacity = targetTextOpacity
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`
            }
          }
        })
      },
    })

    // Check GSAP API Docs for exact property options for things like ScrollTrigger.create
  })
})
