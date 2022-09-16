import React, {useRef} from "react";
import styled from "styled-components";

const H2 = styled.h2`
  text-align: left;
  font-weight: bold; 
`;

const Input = styled.input`
  left: auto;
`;

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
            <H2>TODO APPLICATION</H2>
            <Input ref={inputEl} id="todoInput" type="text" value={inputTodo}
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