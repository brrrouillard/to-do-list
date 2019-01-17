import React, { Component } from "react";
import "./AddTodo.css";

export class AddTodo extends Component {
  state = {
    input: "",
    allTick: false
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onClick = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  tickAll = () => {   
    this.setState({
      input: this.state.input,
      allTick: !this.state.allTick
    });
    this.props.changeCompleteAll(this.state.allTick);
  };

  render() {
    return (
      <form>
        <span
          id="toggle-all-todo"
          onClick={this.tickAll}
          className={this.state.allTick ? 'full-opacity' : undefined}
        >
          ❯
        </span>
        <input
          value={this.state.input}
          placeholder="Add new task..."
          onChange={this.onChange}
          id="addTodoInput"
        />
        <button onClick={this.onClick}>X</button>
      </form>
    );
  }
}

export default AddTodo;
