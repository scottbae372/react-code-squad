import React from "react";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
`

const Label = styled.label`
  align-content: center;
  align-self: center;
  text-align: center;
`;

// @ts-ignore
function TodoTitleLabel({totalTodoCnt}) {
    return (
        <Div>
            <Label>지금 {totalTodoCnt}개의 할일이 있으세요</Label>
        </Div>
    );
}

export default TodoTitleLabel;