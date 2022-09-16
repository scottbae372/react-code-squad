import Todo from "./Todo";
import {useEffect, useState} from "react";

// @ts-ignore
export default function useFetchTodos() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    // @ts-ignore
    useEffect(() => {
        (async () => {
            const fetchedData: any = []
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos');
                const result = await res.json();
                for (const each of result) {
                    const t = new Todo(each.id, each.userId, each.title, each.completed);
                    fetchedData.push(t);
                }
                setTodos(fetchedData);
            } catch (e: Error | any) {
                console.error(e);
                setErrMsg(e.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {todos, setTodos, isLoading, errMsg};
}