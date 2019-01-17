import React, { Component } from "react";
import "./TodoItem.css";

export class TodoItem extends Component {
  state = {
    active: false
  };

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
  };

  handleHoverEnter = () => {
    this.setState({
      active: true
    });
  };

  handleHoverLeave = () => {
    this.setState({
      active: false
    });
  };

  render() {
    return (
      <div className="todo-item" 
      onMouseEnter={this.handleHoverEnter}
      onMouseLeave={this.handleHoverLeave}
      >
        <input
          type="checkbox"
          onChange={this.checkTodo}
          checked={this.props.todo.isDone}
        />
        <span style={this.getTodoStyle()}>{this.props.todo.name}</span>
        <button 
        onClick={this.onClick}
        className={this.state.active ? "show-delete-button" : undefined}
        >X</button>
      </div>
    );
  }
}

export default TodoItem;
