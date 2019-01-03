const submitRegister = document.querySelector("#submit-register-button");
const registerEmail = document.querySelector("#register-email-field");
const registerPassword = document.querySelector("#register-password-field");

const api = "http://localhost:8080/api/users/";

const registerRequest = () => {
    console.log(registerEmail.value);
    console.log(registerPassword.value);
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
};

submitRegister.addEventListener("click", registerRequest);



/*
* NAVBAR
*/
const login = document.querySelectorAll('.login-navbar')
const register = document.querySelectorAll('.register-navbar')

const showRegister = () => {
    document.querySelector('.login-page').setAttribute('style', 'display: none');
    document.querySelector('.register-page').setAttribute('style', 'display: block');
    console.log("hello");
}

const showLogin = () => {
    document.querySelector('.register-page').setAttribute('style', 'display: none');
    document.querySelector('.login-page').setAttribute('style', 'display: block');
    console.log("noo");
}

register.forEach(e => e.addEventListener('click', showRegister));
login.forEach(e => e.addEventListener('click', showLogin));