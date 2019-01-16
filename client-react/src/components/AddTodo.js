import React, { Component } from "react";
import "./AddTodo.css";

export class AddTodo extends Component {
  state = {
    input: ""
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onClick = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <form>
        <input
          value={this.state.input}
          placeholder="Add new task..."
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>X</button>
      </form>
    );
  }
}

export default AddTodo;
