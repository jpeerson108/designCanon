// Check if browser supports Navigation API
if ("navigation" in window && "startViewTransition" in document) {
  window.navigation.addEventListener("navigate", (e) => {
    // If link click is external, do not run
    if (!e.canIntercept || e.hashChange || e.downloadRequest || e.formData) {
      return
    }

    e.intercept({
      handler: async () => {
        const response = await fetch(e.destination.url)
        const text = await response.text()

        // Set the new page html and title using clicked page content
        const transition = document.startViewTransition(() => {
          // const body extracts entire content of html, including <body> tags
          const body = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1]
          document.body.innerHTML = body

          const title = text.match(/<title[^>]*>(.*?)<\/title>/i)[1]
          document.title = title
        })

        transition.ready.then(() => {
          window.scrollTo(0, 0)
        })
      },
      scroll: "manual",
    })
  })
}
