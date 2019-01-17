import React, { Component } from "react";
import "./App.css";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";

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

  changeCompleteAll = isActive => {
    this.setState({
      todos: this.state.todos.map(todo => {
        todo.isDone = isActive ? false : true;
        return todo;
      })
    });
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
      <>
      <h1 className="title">Todos</h1>
      <div className="App">
        <AddTodo 
        addTodo={this.addTodo}
        changeCompleteAll={this.changeCompleteAll}
        />
        <Todos
          todos={this.state.todos}
          delTodo={this.delTodo}
          changeComplete={this.changeComplete}
        />
        <Footer 
        todos={this.state.todos}
        />
      </div>
      </>
    );
  }
}

export default App;
