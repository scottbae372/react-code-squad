import React, {useState} from 'react';
import './App.css';
import TodoListView from "./TodoListView";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import TodoCountLabel from "./TodoCountLabel";
import TodoTitleLabel from "./TodoTitleLabel";
import useFetchTodos from "./useFetchTodos";
import {v4 as uuidv4} from 'uuid';
import Spinner from "./LoadingSpinner";


const SERVER_URL = "http://localhost:3000/todos"

function App() {
    const [inputTodo, setInputTodo] = useState("");
    const {todos, setTodos, isLoading} = useFetchTodos({serverURL: SERVER_URL});

    async function addTodo() {
        if (inputTodo.trim().length === 0) {
            setInputTodo("");
            return;
        }
        const todo = new Todo(`${uuidv4()}`, `${uuidv4()}`, inputTodo, false);
        const newTodos = [todo, ...todos];
        setInputTodo("");
        setTodos(newTodos);

        try {
            const res = await fetch(SERVER_URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(todo),
            });
            if (res.status >= 400) {
                throw {status: res.status, message: res.statusText}
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteTodo(id: string) {
        const newTodos = todos.filter((each: Todo) => each.id !== id);
        setTodos(newTodos);
        try {
            const res = await fetch(`${SERVER_URL}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });
            if (res.status >= 400) {
                throw {status: res.status, message: res.statusText}
            }
        } catch (e) {
            console.error(e);
        }

    }

    function toggleCompleteTodo(id: string) {
        let todoToUpdate: any;
        const newTodos = todos.map((each: Todo) => {
            if (each.id === id) {
                each.isCompleted = !each.isCompleted;
                todoToUpdate = each;
            }
            return each
        })

        setTodos(newTodos);
        setTimeout(async () => {
            try {
                // TODO: Fallback for request's fail
                // @ts-ignore
                const res = await fetch(`${SERVER_URL}/${todoToUpdate.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PATCH',
                    // @ts-ignore
                    body: JSON.stringify({isCompleted: todoToUpdate.isCompleted})
                });
                if (res.status >= 400) {
                    throw {status: res.status, message: res.statusText}
                }
            } catch (e) {
                console.error(e);
            }
        }, 2000)
    }

    return (
        // @ts-ignore
        <div>
            <TodoTitleLabel totalTodoCnt={todos.length}/>
            <TodoInput
                inputTodo={inputTodo} setInputTodo={setInputTodo}
                addTodo={addTodo}
            />
            <TodoCountLabel todos={todos} setTodos={setTodos}/>
            {isLoading ? <Spinner/> : <></>}
            <TodoListView todos={todos} deleteTodo={deleteTodo} toggleCompleteTodo={toggleCompleteTodo}/>
        </div>
    )
}

export default App;
