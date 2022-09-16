import Todo from "./Todo";
import styled from "styled-components";

const TodoUl = styled.ul`
  display: flex;
  align-items: baseline;
  padding: 0.5rem;
  flex-direction: column;
  width: 50%;
`

const TodoLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`

const TodoTitleText = styled(TodoLi)`
  font-size: inherit;
  text-decoration: inherit;
  border: none;
  border-radius: 0;
  background: transparent;
  ${({className}) =>
          className === "completed" && ` 
        color:red;
        text-decoration: line-through;
      `}
`

const TodoRemoveButton = styled(TodoLi)`
  border: none;
  border-radius: 0;
  background: transparent;
  color: red;
  font-family: verdana;
`

// @ts-ignore
function TodoListView({todos, toggleCompleteTodo, deleteTodo}) {
    return (
        <>
            <TodoUl onClick={event => {
                console.log(event.target);
            }}>
                {
                    todos.map((todo: Todo, idx: number) =>
                        <TodoLi key={idx} id={todo.id}>
                            <TodoTitleText as="button" onClick={() => toggleCompleteTodo(todo.id)}
                                           className={todo.isCompleted ? "completed" : ""}>{todo.title}</TodoTitleText>
                            <TodoRemoveButton as="button" onClick={() => deleteTodo(todo.id)}>X</TodoRemoveButton>
                        </TodoLi>
                    )
                }
            </TodoUl>
        </>
    )
}

export default TodoListView;
