import Todo from "./Todo";

function TodoListView(props: any) {
    return (
        <>
            <ul className={"todos"} onClick={event => {
                console.log(event.target)
            }}>
                {props.todos.map((todo: Todo, idx: number) =>
                    <li key={idx} id={todo.id}>
                        <button onClick={props.toggleCompleteTodo}>{todo.title}</button>
                        <button onClick={props.deleteTodo}>X</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default TodoListView;
