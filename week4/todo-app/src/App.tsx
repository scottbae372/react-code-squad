import React, {useEffect, useState} from 'react';
import './App.css';
import TodoListView from "./TodoListView";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import TodoCountLabel from "./TodoCountLabel";
import TodoTitleLabel from "./TodoTitleLabel";

function App() {
    const [id, setId] = useState(0);
    const [inputTodo, setInputTodo] = useState("");
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [todoCompletedCnt, setTodoCompletedCnt] = useState<number>(0);
    const [todoInCompletedCnt, setTodoInCompletedCnt] = useState<number>(0);

    // @ts-ignore
    useEffect(() => {
        fetchInitData();
    }, []);

    function addTodo() {
        if (inputTodo.trim().length === 0) {
            setInputTodo("");
            return;
        }
        const todo = new Todo(`${id}`, `${id}`, inputTodo, false);
        const newTodos = [todo, ...todos];
        setId(id + 1)
        setInputTodo("");
        setTodos(newTodos);
        updateTodoCompletenessCnt(newTodos);
    }

    function deleteTodo(id: string) {
        const newTodos = todos.filter((each: Todo) => each.id !== id)
        setTodos(newTodos);
        updateTodoCompletenessCnt(newTodos);
    }

    function toggleCompleteTodo(id: string) {
        const newTodos = todos.map((each: Todo) => {
            if (each.id === id) {
                each.isCompleted = !each.isCompleted;
            }
            return each
        })
        setTodos(newTodos);
        updateTodoCompletenessCnt(newTodos);
    }

    function updateTodoCompletenessCnt(newTodos: Array<Todo>) {
        const completedTodos = newTodos.filter(v => v.isCompleted);
        const totalTodoCnt = newTodos.length;
        setTodoCompletedCnt(completedTodos.length);
        setTodoInCompletedCnt(totalTodoCnt - completedTodos.length);
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
        updateTodoCompletenessCnt(fetchedData);
    }

    return (
        // @ts-ignore
        <div>
            <TodoTitleLabel totalTodoCnt={todos.length}/>
            <TodoInput
                inputTodo={inputTodo} setInputTodo={setInputTodo}
                addTodo={addTodo}
            />
            <TodoCountLabel totalTodoCnt={todos.length} totalTodoCompletedCnt={todoCompletedCnt} totalTodoInCompletedCnt={todoInCompletedCnt}/>
            <TodoListView todos={todos} deleteTodo={deleteTodo} toggleCompleteTodo={toggleCompleteTodo}/>
        </div>
    )
}

export default App;
