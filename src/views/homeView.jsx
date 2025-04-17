/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global } from "@emotion/react";
import Carousel from "../component/carousel/recommendCarousel";
import HomeCalendar from "../component/calendar/homeCalendar";
import Calendar from "react-calendar";

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

const homeView = () => {
  return (
    <>
      <div css={calender}>
        <HomeCalendar />
      </div>
      <div css={container}>
        목표를 세워 볼까요?
        <div css={mt8}>
          <Carousel />
        </div>
      </div>
      <div css={[container, task1]}>큰목표 작은목표 1</div>
      <div css={[container, task1]}>큰목표 작은목표 2</div>
    </>
  );
};

export default homeView;
