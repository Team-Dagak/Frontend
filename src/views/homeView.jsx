/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global } from "@emotion/react";
import Carousel from "../component/carousel/recommendCarousel";
import HomeCalendar from "../component/calendar/homeCalendar";
import TodayChecklists from "../component/todoList/todayChecklists";
import ProfileButton from "../component/profileButton/profileButton";
import NavigationBar from "../component/bottomBar/navigationBar";
import { usePopupStore } from "../store/states";
import AddGoal from "../component/goal/AddGoal";
import ButtonSample from '../assets/ButtonSample.png';
import {FaArrowDown} from 'react-icons/fa';
import { TbCalendarPause } from "react-icons/tb";
import AddBigGoal from "../component/AddBigGoal/addBigGoal";
import { primary } from "../component/common/styles/globalStyle/colors";

const container = css`
  width: 100%;
  margin: 0 auto 16px;
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  
`
const calender = css`
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  display: flex;
`
const topBar = css`
  height: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto 1fr auto auto;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  gap: 7px;
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

const ph15 = css`
  padding: 0 10px;
`

const delayedWork = css`
  font-weight: bold;
  color: ${primary};
  font-size: 20px;
`

const homeView = () => {
    // zustand에서 팝업 관련 상태 가져오기
    const PopupGoal = usePopupStore(s => s.PopupGoal);
    const clearPopupGoal = usePopupStore(s => s.clearPopupGoal);
  
    // 목표 등록 처리 콜백(예시)
    const handleGoalAdd = (goalData) => {
      // 예시: useGoalStore.getState().addGoal(goalData);
      clearPopupGoal(); // 팝업 닫기
    };

    return (
      <div css={[{paddingBottom: "88px"}, mh16, {justifyContent:"center"}]}>
        <div css={topBar}>
          <img css={ph15} src={ButtonSample} /> {/* 미룬일 아이콘 */}
          <div css={delayedWork}>미룬 일 7건</div>
          <div css={ph15}><FaArrowDown size="20px" /></div>
          <div/>
          <TbCalendarPause size="30px" />
          <AddBigGoal />
        </div>
        <div css={[container, calender]}>
          <HomeCalendar />
        </div>
        {/*<div css={container}>
          <Carousel />
        </div>*/}
        <div css={[container]}> 
          <TodayChecklists />
        </div>
        <NavigationBar />
  
        {/* 👇 여기! 팝업은 여기서 조건부 렌더 */}
        {PopupGoal && (
          <AddGoal
            goal={PopupGoal}
            onConfirm={handleGoalAdd}
            onCancel={clearPopupGoal}
          />
        )}
      </div>
    );
};

export default homeView;
