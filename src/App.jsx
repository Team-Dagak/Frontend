/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global } from "@emotion/react";
import TodayTasks from "./component/todoList/todayTasks";

const container = css`
  position: relative;
  width: 100% - 16px;
  background-color: #ffffff;
  margin: 8px;
  padding: 8px;
  border-radius: 10px;
`;

const calender = css`
  position: relative;
  min-width: 100% - 16px;
  background-color: #ffffff;
  margin: 8px;
  padding: 8px;
  border-radius: 10px;
  // 어떻게 할건지 회의 후 수정----
  height: auto;
  min-height: 450px;
  // -------------------
  items-align: center;
  justify-content: center;
  text-align: center;
  content-align: center;
  display: flex;
`;
const mt8 = css`
  margin-top: 8px;
`;

const task1 = css`
  height: 127px;
`;

const App = () => {
  return (
    <>
      <div css={[container, task1]}><TodayTasks /></div>
    </>
  );
};

export default App;