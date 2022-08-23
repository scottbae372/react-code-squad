import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import TodoListView from "./TodoListView";
import TodoInput from "./TodoInput";
import Todo from "./Todo";

function App() {
    const [id, setId] = useState(0);
    const [inputTodo, setInputTodo] = useState("");
    const [todos, setTodos] = useState<Array<Todo>>([]);

    // @ts-ignore
    useEffect(() => {
        document.title = `last id=${id}. The number of todo=${todos.length}`;
        fetchInitData();
    }, []);

    function addTodo() {
        if (inputTodo.trim().length == 0) {
            setInputTodo("");
            return;
        }
        const newTodos = [...todos];
        const todo = new Todo(`${id}`, `${id}`, inputTodo, false);
        newTodos.push(todo);
        setId(id + 1)
        setInputTodo("");
        setTodos(newTodos)
    }

    function deleteTodo(id: string) {
        const newTodos = todos.filter((each: Todo) => each.id !== id)
        setTodos(newTodos);
    }

    function toggleCompleteTodo(id: string) {
        const newTodos = todos.map((each: Todo) => {
            if (each.id === id) {
                each.isCompleted = !each.isCompleted;
            }
            return each
        })
        setTodos(newTodos);
    }

    async function fetchInitData() {
        const fetchedData: any = []
        await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(result => {
                for (const each of result) {
                    const t = new Todo(each.id, each.userId, each.title, each.completed);
                    fetchedData.push(t);
                }
            })
            .catch(err => console.error(err));

        setTodos(fetchedData);
    }

    return (
        <div className={"App"}>
            <TodoInput
                inputTodo={inputTodo} setInputTodo={setInputTodo}
                addTodo={addTodo}
            />
            <TodoListView todos={todos} deleteTodo={deleteTodo} toggleCompleteTodo={toggleCompleteTodo}/>
        </div>
    )
}

export default App;
