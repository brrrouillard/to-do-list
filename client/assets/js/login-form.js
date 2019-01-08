const submitRegister = document.querySelector("#submit-register-button");
const registerEmail = document.querySelector("#register-email-field");
const registerPassword = document.querySelector("#register-password-field");

const api = "http://localhost:8080/api/users/";

const showPage = pageName => {
  if (pageName == "login-page") {
    document
      .querySelector(".login-page")
      .setAttribute("style", "display: block");
    document
      .querySelector(".register-page")
      .setAttribute("style", "display: none");
    document
      .querySelector(".todos-page")
      .setAttribute("style", "display: none");
  } else if (pageName == "register-page") {
    document
      .querySelector(".register-page")
      .setAttribute("style", "display: block");
    document
      .querySelector(".login-page")
      .setAttribute("style", "display: none");
    document
      .querySelector(".todos-page")
      .setAttribute("style", "display: none");
  } else if (pageName == "todos-page") {
    document
      .querySelector(".todos-page")
      .setAttribute("style", "display: block");
    document
      .querySelector(".register-page")
      .setAttribute("style", "display: none");
    document
      .querySelector(".login-page")
      .setAttribute("style", "display: none");
  }
};

const registerRequest = () => {
  if (registerEmail.value == "" || registerPassword.value == "") {
    document.querySelector("#register-error-message").innerHTML =
      "Please enter a valid email and password";
  } else {
    axios
      .post(api + "/register", {
        email: registerEmail.value,
        password: registerPassword.value
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

submitRegister.addEventListener("click", registerRequest);

/*
 * NAVBAR
 */
const login = document.querySelectorAll(".login-navbar");
const register = document.querySelectorAll(".register-navbar");

register.forEach(e =>
  e.addEventListener("click", event => showPage("register-page"))
);
login.forEach(e =>
  e.addEventListener("click", event => showPage("login-page"))
);
