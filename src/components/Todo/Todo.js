import { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="todo-item"
        onClick={() => this.props.toggleCompleted(this.props.index)}
        style={{ cursor: "pointer" }}
      >
        <div
          id="status-ball"
          style={{
            border: this.props.item.isCompleted ? "0" : "1px solid black",
            background: this.props.item.isCompleted ? "#2954ED" : "white",
          }}
        >
          {" "}
          {this.props.item.isCompleted && (
            <i
              style={{ color: "white", fontSize: 14 }}
              class="fas fa-check"
            ></i>
          )}{" "}
        </div>
        <div id="col">
          <span
            style={{
              textDecoration: this.props.item.isCompleted
                ? "line-through"
                : "none",
              cursor: "pointer",
            }}
          >
            {this.props.item.text}
          </span>
          <i
            onClick={(e) => {
              e.stopPropagation();
              this.props.deleteTodo(this.props.index);
            }}
            className="fas fa-trash"
          ></i>
        </div>
      </div>
    );
  }
}
