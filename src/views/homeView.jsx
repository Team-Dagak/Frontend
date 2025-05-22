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
    // zustand에서 팝업 관련 상태 가져오기
    const PopupGoal = usePopupStore(s => s.PopupGoal);
    const clearPopupGoal = usePopupStore(s => s.clearPopupGoal);
  
    // 목표 등록 처리 콜백(예시)
    const handleGoalAdd = (goalData) => {
      // 예시: useGoalStore.getState().addGoal(goalData);
      clearPopupGoal(); // 팝업 닫기
    };

    return (
      <div css={[{paddingBottom: "88px"}, mh16]}>
        <div css={topBar}></div>
        <div css={[calender, mb24]}>
          <HomeCalendar />
        </div>
        <div css={container}>
          <Carousel />
        </div>
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
