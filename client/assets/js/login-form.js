const submitRegister = document.querySelector("#submit-register-button");
const submitLogin = document.querySelector("#submit-login-button");

const usersApi = "http://localhost:8080/api/users/";
const tasksApi = "http://localhost:8080/api/tasks/";

const tasksArray = []; //  Contains every tasks
let firstLoad = true; // Flag used to load the array the first

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
    initTasks();
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

const updateTaskState = (id, isDone) => {
  axios
    .put(tasksApi + id, { isDone: isDone })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const addCheckboxListener = checkbox => {
  checkbox.addEventListener("change", () => {
    checkbox.nextElementSibling.classList.toggle("checked-task");
    if (checkbox.checked) {
      console.log(checkbox.id.slice(1));
      checkbox.dataset.done = true;
      updateTaskState(checkbox.id.slice(1), true);
    } else {
      checkbox.dataset.done = false;
      updateTaskState(checkbox.id.slice(1), false);
    }
  });
};

const addDeleteListener = button => {
  button.parentNode.addEventListener("mouseenter", () => {
    button.classList.toggle("delete-task-button-active");
  });
  button.parentNode.addEventListener("mouseleave", () => {
    button.classList.toggle("delete-task-button-active");
  });
  button.addEventListener("click", () => {
    button.parentNode.remove();
    axios.delete(tasksApi + button.dataset.id).then(console.log("deleted"));
  });
};

/**
 * Initialize all checkboxes at start
 */

const initCheckboxes = () => {
  const checkboxes = document.querySelectorAll(".todo-checkbox");
  checkboxes.forEach(checkbox => {
    const that = checkbox;
    addCheckboxListener(that);
  });
};

/**
 * Initialize all the tasks at start with an API call
 */

const initTasks = () => {
  console.log("Refreshing tasks");
  const tasksList = document.querySelector("#list-todo-section");
  if (firstLoad) {
    // Use the API call to retrieve the list
    axios
      .get(tasksApi + user)
      .then(res => {
        const tasks = res.data;
        tasks.forEach(task => {
          tasksArray.push(task); // Push every task object in the array
          const node = document.createElement("div");
          node.classList.toggle("todo");
          const taskSpan = document.createElement("span");
          taskSpan.dataset.id = "x" + task._id;
          taskSpan.innerHTML = ` ${task.name}`;

          const checkboxNode = document.createElement("input");
          checkboxNode.setAttribute("type", "checkbox");
          checkboxNode.setAttribute("id", `x${task._id}`);
          checkboxNode.dataset.done = task.isDone;
          checkboxNode.setAttribute("class", "todo-checkbox");

          const deleteButton = document.createElement("div");
          deleteButton.innerHTML = " X ";
          deleteButton.setAttribute("class", "delete-task-button");
          deleteButton.dataset.id = task._id;
          node.appendChild(checkboxNode);
          node.appendChild(taskSpan);
          node.appendChild(deleteButton);
          tasksList.appendChild(node);
          addDeleteListener(deleteButton);

          if (task.isDone) {
            checkboxNode.checked = true;
            checkboxNode.nextElementSibling.classList.toggle("checked-task");
          }
        });
      })
      .catch(err => console.log(err))
      .then(() => {
        firstLoad = false;
        initCheckboxes();
      });
  }
};

const taskField = document.querySelector("#add-task-field");

const addTask = () => {
  if (taskField.value == "") {
    document.querySelector("#add-task-error-message").innerHTML =
      "Task cannot be empty";
  } else {
    const newTask = {
      name: taskField.value,
      importance: 1,
      id: user
    };

    tasksArray.push(newTask);
    const tasksList = document.querySelector("#list-todo-section");
    const node = document.createElement("div");
    node.classList.toggle("todo");
    const taskSpan = document.createElement("span");
    taskSpan.dataset.id = newTask.id;
    taskSpan.innerHTML = `${newTask.name}`;

    const checkboxNode = document.createElement("input");
    checkboxNode.setAttribute("type", "checkbox");
    checkboxNode.setAttribute("id", `x${newTask.id}`);
    checkboxNode.dataset.done = false;
    checkboxNode.setAttribute("class", "todo-checkbox");

    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = " X ";
    deleteButton.setAttribute("class", "delete-task-button");
    deleteButton.dataset.id = newTask.id;

    node.appendChild(checkboxNode);
    node.appendChild(taskSpan);
    node.appendChild(deleteButton);
    tasksList.appendChild(node);
    addDeleteListener(deleteButton);
    addCheckboxListener(checkboxNode);

    axios
      .post(tasksApi + "add", newTask)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

taskField.addEventListener("keypress", e => {
  if (e.key == "Enter") {
    addTask();
  }
});

const deleteAllButton = document.querySelector("#delete-all-message");
deleteAllButton.addEventListener("click", () => {
  while (document.querySelector("#list-todo-section").firstChild) {
    const currentNode = document.querySelector("#list-todo-section").firstChild;
    const id = currentNode.firstChild.id.slice(1);
    currentNode.removeChild(currentNode.firstChild);
    axios.delete(tasksApi + id).then(console.log("deleted"));
  }
});
