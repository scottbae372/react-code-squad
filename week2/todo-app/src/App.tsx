import React, {useEffect, useState} from 'react';
import './App.css';
import TodoListView from "./TodoListView";
import TodoInput from "./TodoInput";
import Todo from "./Todo";

function App() {
    const [id, setId] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [inputTodo, setInputTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        document.title = `The number of todo=${cnt}`;
    });

    function addTodo() {
        if (inputTodo.trim().length == 0) {
            setInputTodo("");
            return;
        }
        const newTodos = [...todos];
        // @ts-ignore
        newTodos.push(new Todo(`${id}`, `${id}`, inputTodo, false));
        setId(id + 1)
        setInputTodo("");
        setTodos(newTodos)
        setCnt(newTodos.length);
    }

    function deleteTodo(e: any) {
        const newTodos = todos.filter((each: Todo) => each.id !== e.target.parentElement.id
        )
        // @ts-ignore
        setTodos(newTodos);
    }

    function toggleCompleteTodo(e: any) {
        e.target.classList.toggle("completed")
    }

    // TODO: 아래 function을 언제 불러야 하는지 잘 모르겠네요.
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

        // @ts-ignore
        setTodos(fetchedData);
    }

    return (
        <div>
            <TodoInput
                inputTodo={inputTodo} setInputTodo={setInputTodo}
                addTodo={addTodo}
            />
            <TodoListView todos={todos} setTodos={setTodos} deleteTodo={deleteTodo}
                          toggleCompleteTodo={toggleCompleteTodo}/>
        </div>
    )
}

export default App;
