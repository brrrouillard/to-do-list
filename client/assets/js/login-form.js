const submitRegister = document.querySelector("#submit-register-button");
const submitLogin = document.querySelector("#submit-login-button");

const usersApi = "http://localhost:8080/api/users/";
const tasksApi = "http://localhost:8080/api/tasks/";

// TO DO : change this variable with user retrieved using JWT token
let user = "5c2e1a697dbba64fbfa73167";

/**
 * Show the page specified in parameter
 *
 * @params The page to show
 */

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
    refreshTasks();
    document
      .querySelector(".register-page")
      .setAttribute("style", "display: none");
    document
      .querySelector(".login-page")
      .setAttribute("style", "display: none");
  }
};

/**
 * Handles registration form
 */

const registerRequest = () => {
  const registerEmail = document.querySelector("#register-email-field");
  const registerPassword = document.querySelector("#register-password-field");

  if (registerEmail.value == "" || registerPassword.value == "") {
    document.querySelector("#register-error-message").innerHTML =
      "Please enter a valid email and password";
  } else {
    document.querySelector("#register-error-message").innerHTML =
      "Registration successful !";
    axios
      .post(usersApi + "register", {
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

/**
 * Handles login form
 */

const loginRequest = () => {
  const loginEmail = document.querySelector("#login-email-field");
  const loginPassword = document.querySelector("#login-password-field");
  const errorMessage = document.querySelector("#login-error-message");
  if (loginEmail.value == "" || loginPassword.value == "") {
    errorMessage.innerHTML = "Please enter a valid email and password";
  } else {
    errorMessage.innerHTML = "";
    //
    showPage("todos-page");
  }
};

submitRegister.addEventListener("click", registerRequest);
submitLogin.addEventListener("click", loginRequest);

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

/*
 * TO-DO LIST LISTENERS
 */


/**
 * Refresh tasks when a checkbox is ticked
 */

const refreshCheckboxes = () => {
  const checkboxes = document.querySelectorAll(".todo-checkbox");
  checkboxes.forEach(checkbox => {
    let that = checkbox;
    checkbox.addEventListener("change", () => {
      if (that.checked) {
        document
          .querySelector(`[data-id="${that.id}"]`)
          .classList.toggle("checked-task");
      } else {
        document
          .querySelector(`[data-id="${that.id}"]`)
          .classList.toggle("checked-task");
      }
    });
  });
};

/**
 * Refresh all the tasks in the To-Do list
 */

const refreshTasks = () => {
  console.log("Refreshing tasks");
  const tasksList = document.querySelector("#list-todo-section");
  tasksList.innerHTML = "";
  axios
    .get(tasksApi + user)
    .then(res => {
      const tasks = res.data;
      tasks.forEach(task => {
        const node = document.createElement("div");
        const taskName = document.createElement("span");
        taskName.dataset.id = task._id;
        taskName.innerHTML = `${task.name}`;
        node.innerHTML = `<input type="checkbox" id="${
          task._id
        }" class="todo-checkbox"> `;
        node.appendChild(taskName);
        tasksList.appendChild(node);
      });
    })
    .catch(err => console.log(err))
    .then(() => {
      refreshCheckboxes();
    });
};

const taskField = document.querySelector("#add-task-field");

const addTask = () => {
  if (taskField.value == "") {
    document.querySelector("#add-task-error-message").innerHTML =
      "Task cannot be empty";
  } else {
    axios
      .post(tasksApi + "add", {
        name: taskField.value,
        importance: 1,
        id: user
      })
      .then(function(response) {
        refreshTasks();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

taskField.addEventListener("keypress", e => {
  if (e.key == "Enter"){
    addTask();
  }
})