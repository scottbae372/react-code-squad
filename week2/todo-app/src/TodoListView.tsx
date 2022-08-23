import Todo from "./Todo";

// @ts-ignore
function TodoListView({todos, toggleCompleteTodo, deleteTodo}) {
    return (
        <>
            <ul className={"todos"} onClick={event => {
                console.log(event.target)
            }}>
                {
                    todos.map((todo: Todo, idx: number) =>
                        <li key={idx} id={todo.id}>
                            <button onClick={() => toggleCompleteTodo(todo.id)}
                                    className={todo.isCompleted ? "completed" : ""}>{todo.title}</button>
                            <button onClick={() => deleteTodo(todo.id)}>X</button>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default TodoListView;
