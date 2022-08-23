import React from "react";

// @ts-ignore
function TodoInput({inputTodo, setInputTodo, addTodo}) {
    return (
        <div>
            <input id="todoInput" type="text" value={inputTodo}
                   onChange={(e) => setInputTodo(e.target.value)} placeholder="할일을 입력하세요..."
                   onKeyPress={(event => {
                       if (event.code === "Enter") {
                           addTodo();
                       }
                   })}
            />
            <button onClick={addTodo}>추가</button>
        </div>
    )
}

export default TodoInput;