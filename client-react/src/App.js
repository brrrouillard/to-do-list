import React, { Component } from "react";
import "./App.css";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

class App extends Component {
  state = {
    todos: [
      {
        name: "Finish this app",
        isDone: false,
        id: 1
      },
      {
        name: "Go to eat",
        isDone: false,
        id: 2
      }
    ]
  };

  addTodo = name => {
    if (name === "") return false;
    const newTodo = {
      name,
      isDone: false,
      id:
        this.state.todos.length > 0
          ? this.state.todos[this.state.todos.length - 1].id + 1
          : 1
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  delTodo = name => {
    const arr = [];
    this.state.todos.forEach(todo => {
      if (todo.name !== name) arr.push(todo);
    });
    this.setState({ todos: arr });
  };

  changeComplete = name => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.name === name) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    });
  };

  render() {
    return (
      <div className="App">
        <h1>"TO-DO LIST"</h1>
        <AddTodo addTodo={this.addTodo} />
        <Todos
          todos={this.state.todos}
          delTodo={this.delTodo}
          changeComplete={this.changeComplete}
        />
      </div>
    );
  }
}

export default App;
