/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global } from "@emotion/react";
import Carousel from "../component/carousel/recommendCarousel";
import HomeCalendar from "../component/calendar/homeCalendar";
import TodayTasks from "../component/todoList/todayTasks";
import ProfileButton from "../component/profileButton/profileButton";
import NavigationBar from "../component/bottomBar/navigationBar";


const container = css`
  position: relative;
  width: calc(100% - 16px);
  background-color: #ffffff;
  margin: 8px;
  padding: 8px;
  border-radius: 10px;
  
`
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
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  display: flex;
`
const topBar = css`
  height: 64px;
  width: 100%;
`
const mb24 = css`
  margin-bottom: 24px;
`
const mt8 = css`
  margin-top: 8px;
`
const mh16 = css`
  margin: 0 16px;
`

const homeView = () => {
  return (
    <div css={[{paddingBottom: "88px"}, mh16]}>
      <div css={topBar}></div>
      <div css={[calender, mb24]}>
        <HomeCalendar />
      </div>
      {
      //추천 캐러셀 추후 사용시 주석 해제
      /*<div css={container}>
          <Carousel />
      </div>*/}
      <div css={[container]}><TodayTasks /></div>
      <NavigationBar/>
    </div>
  );
};

export default homeView;
