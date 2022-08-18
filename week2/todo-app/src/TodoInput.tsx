import React from "react";

function TodoInput(props: any) {
    return (
        <div>
            <input id="todoInput" type="text" value={props.inputTodo}
                   onChange={(e) => props.setInputTodo(e.target.value)} placeholder="할일을 입력하세요..."
                   onKeyPress={(event => {
                       if (event.code === "Enter") {
                           props.addTodo();
                       }
                   })}
            />
            <button onClick={props.addTodo}>추가</button>
        </div>
    )
}

export default TodoInput;