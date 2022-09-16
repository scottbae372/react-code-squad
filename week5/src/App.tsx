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


function App() {
    const [inputTodo, setInputTodo] = useState("");
    const {todos, setTodos, isLoading} = useFetchTodos();

    function addTodo() {
        if (inputTodo.trim().length === 0) {
            setInputTodo("");
            return;
        }
        const todo = new Todo(`${uuidv4()}`, `${uuidv4()}`, inputTodo, false);
        const newTodos = [todo, ...todos];
        setInputTodo("");
        setTodos(newTodos);
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
