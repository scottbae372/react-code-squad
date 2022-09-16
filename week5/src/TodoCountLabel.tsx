import React, {useState} from "react";
import styled from "styled-components";
import Todo from "./Todo";

// @ts-ignore
export default TodoCountLabel;

const Label = styled.label`
  margin: 10px;
  ${({className}) =>
          className === "checked" && `
        border-style: solid;
      `}
`

// @ts-ignore
function TodoCountLabel({todos, setTodos}) {
    const completedTodos = todos.filter((e: Todo) => e.isCompleted)
    const [todoToggle, setTodoToggle] = useState(false);
    const [completedToggle, setCompletedToggle] = useState(false);
    const [incompleteToggle, setIncompleteToggle] = useState(false);

    function toggleTodoView(all: boolean, completed: boolean, incompleted: boolean) {
        if (all || (completed && incompleted)) {
            setTodos(todos);
            return
        }
        if (completed && !incompleted) {
            setTodos(completedTodos);
            return;
        }
        if (!completed && incompleted) {
            setTodos(todos.filter((e: Todo) => !e.isCompleted));
            return;
        }
    }

    return (
        <div>
            <Label className={todoToggle ? "checked" : ""}
                   onClick={() => {
                       const newToggle = !todoToggle;
                       setTodoToggle(newToggle);
                       toggleTodoView(newToggle, completedToggle, incompleteToggle);
                   }}>할일: {todos.length}개</Label>
            <Label className={incompleteToggle ? "checked" : ""}
                   onClick={() => {
                       const newToggle = !incompleteToggle;
                       setIncompleteToggle(newToggle);
                       toggleTodoView(todoToggle, completedToggle, newToggle);
                   }}>남은일: {todos.length - completedTodos.length}개</Label>
            <Label className={completedToggle ? "checked" : ""}
                   onClick={() => {
                       const newToggle = !completedToggle;
                       setCompletedToggle(newToggle);
                       toggleTodoView(todoToggle, newToggle, incompleteToggle);
                   }}>완료된일: {completedTodos.length}개</Label>
        </div>
    );
}
