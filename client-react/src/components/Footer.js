import React, { Component } from 'react'
import "./Footer.css";

export class Footer extends Component {

    handlePlural = () => {
        return this.props.todos.filter(todo => !todo.isDone).length > 1 ? "s" : ""; 
    }
  render() {
    return (
      <div id="footer-section">
        <span>{this.props.todos.filter(todo => !todo.isDone).length} task{this.handlePlural()} left</span>
      </div>
    )
  }
}

export default Footer
