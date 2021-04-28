import { Component } from "react";
import React from "react";
import Todo from "./components/Todo/Todo";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      newTodo: "",
    };
  }

  componentDidMount() {
    this.refs.todoInput.focus();
  }

  addTodo = () => {
    if (!this.state.newTodo) {
      this.refs.todoInput.focus();
      return;
    }
    this.refs.todoInput.value = "";
    this.refs.todoInput.focus();
    this.setState({
      items: [
        {
          text: this.state.newTodo.trim(),
          isCompleted: false,
        },
        ...this.state.items,
      ],
      newTodo: "",
    });
  };

  deleteTodo = (i) => {
    this.setState({
      items: [
        ...this.state.items.slice(0, i),
        ...this.state.items.slice(i + 1),
      ],
    });
    this.refs.todoInput.focus();
  };

  toggleCompleted = (i) => {
    if (this.state.items[i].isCompleted) {
      var fake = this.state.items[i];
      fake.isCompleted = false;
      this.setState({
        items: [
          fake,
          ...this.state.items.slice(0, i),
          ...this.state.items.slice(i + 1),
        ],
      });
    } else {
      fake = this.state.items[i];
      fake.isCompleted = true;
      this.setState({
        items: [
          ...this.state.items.slice(0, i),
          ...this.state.items.slice(i + 1),
          fake,
        ],
      });
    }
    this.refs.todoInput.focus();
  };

  clearCompleted = () => {
    this.refs.todoInput.focus();
    this.setState({
      items: this.state.items.filter((item) => {
        return item.isCompleted === false;
      }),
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="main">
          <div id='header'>
            <h1>ReactJS todo list app</h1>
            <i onClick={() => window.open('https://github.com/Abdullah-V/reactjs-todo-list-app')} class="fab fa-github"></i>
          </div>

          <div id="input-box">
            <input
              placeholder="New todo"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.addTodo();
                }
              }}
              ref="todoInput"
              onChange={(e) => {
                this.setState({ newTodo: e.target.value });
              }}
            />

            <button onClick={this.addTodo}>Add new</button>
          </div>

          <span>
            {" "}
            {this.state.items.filter((item) => item.isCompleted).length > 0 && (
              <button id="clear" onClick={this.clearCompleted}>
                Clear completed
              </button>
            )}{" "}
          </span>
        </div>

        <div id="todo-box">
          {this.state.items.map((item, index) => {
            return (
              <Todo
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo}
                item={item}
                key={index}
                index={index}
              />
            );
          })}
        </div>

        {this.state.items.length === 0 && (
          <h1 id="add-todo-text">Add what do you want to do</h1>
        )}
      </React.Fragment>
    );
  }
}

export default App;
