const formContainer = document.getElementById("form-container")
const form = document.getElementById("form")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const message = document.getElementById("message")
const submissionMessage = document.querySelector(".submission-message")

const firstNameField = document.getElementById("firstNameField")
const lastNameField = document.getElementById("lastNameField")
const emailField = document.getElementById("emailField")
const messageField = document.getElementById("messageField")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const emailValue = email.value.trim()
  const isValidEmail =
    emailValue.includes("@") &&
    emailValue.indexOf("@") > 0 &&
    emailValue.indexOf("@") < emailValue.length - 1

  let isFirstNameValid = true
  let isLastNameValid = true
  let isEmailValid = true
  let isMessageValid = true

  if (firstName.value === "") {
    firstNameField.classList.add("error")
    isFirstNameValid = false
  } else {
    firstNameField.classList.remove("error")
  }

  if (lastName.value === "") {
    lastNameField.classList.add("error")
    isLastNameValid = false
  } else {
    lastNameField.classList.remove("error")
  }

  if (emailValue === "" || !isValidEmail) {
    emailField.classList.add("error")
    isEmailValid = false
  } else {
    emailField.classList.remove("error")
  }

  if (message.value === "") {
    messageField.classList.add("error")
    isMessageValid = false
  } else {
    messageField.classList.remove("error")
  }

  const allFieldsValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid

  if (allFieldsValid) {
    formContainer.classList.add("hidden")
    submissionMessage.classList.remove("hidden")
  }
})
