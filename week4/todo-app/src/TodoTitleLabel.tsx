import React from "react";
import styled from "styled-components";


const Label = styled.label`
  align-content: center;
  align-self: center;
`;

// @ts-ignore
function TodoTitleLabel({totalTodoCnt}) {
    return (
        <div>
            <Label>지금 {totalTodoCnt}개의 할일이 있으세요</Label>
        </div>
    );
}

export default TodoTitleLabel;