import React, {useRef} from "react";

// @ts-ignore
function TodoInput({inputTodo, setInputTodo, addTodo}) {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // @ts-ignore
        inputEl.current.focus();
        addTodo();
    };

    return (
        <div>
            <input ref={inputEl} id="todoInput" type="text" value={inputTodo}
                   onChange={(e) => setInputTodo(e.target.value)} placeholder="할일을 입력하세요..."
                   onKeyPress={(event => {
                       if (event.code === "Enter") {
                           addTodo();
                       }
                   })}
            />
            <button onClick={onButtonClick}>추가</button>
        </div>
    )
}

export default TodoInput;