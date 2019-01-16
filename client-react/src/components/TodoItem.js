import React, { Component } from "react";
import "./TodoItem.css";

export class TodoItem extends Component {

  onClick = () => {
    this.props.delTodo(this.props.todo.name);
  };

  checkTodo = () => {
    this.props.changeComplete(this.props.todo.name);
  };

  getTodoStyle = () => {
    return {
      textDecoration: this.props.todo.isDone ? "line-through" : "none"
    };
  }

  render() {
    return (
      <div className="todo-item">
        <input type="checkbox" onChange={this.checkTodo} />
        <span style={this.getTodoStyle() }>{this.props.todo.name}</span>
        <button onClick={this.onClick}>X</button>
      </div>
    );
  }
}

export default TodoItem;
