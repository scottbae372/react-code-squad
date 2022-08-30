import React from "react";

// @ts-ignore
function TodoCountLabel({totalTodoCnt, totalTodoCompletedCnt, totalTodoInCompletedCnt}) {
    return (
        <div>
            <label>할일: {totalTodoCnt}개, 남은일: {totalTodoInCompletedCnt}개,    완료된일: {totalTodoCompletedCnt}개</label>
        </div>
    );
}

export default TodoCountLabel;