import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; //기본 제공 스타일
import "./CalendarStyle.css"; // 커스텀 CSS

// todo
// 목표 완료되면 날짜대신 임티 보이게
// 폰트 수정
// 일요일만 빨간색으로
// 색상 다시 수정
// 디테일한 부분 검토 후 잡기

function HomeCalendar() {
  //선택한 날짜를 상태로 저장
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // 목표 데이터 상태 관리
  const [goalsData, setGoalsData] = useState({
    "2025-04-01": {
      status: "done",
      goals: [
        {
          id: 1,
          title: "리액트 공부",
          status: "done",
          subGoals: [
            { id: 1, title: "컴포넌트 이해하기", isDone: true },
            { id: 2, title: "상태관리 배우기", isDone: true },
          ],
        },
      ],
    },
    "2025-04-12": {
      status: "incomplete",
      goals: [
        {
          id: 1,
          title: "리액트 공부",
          status: "done",
          subGoals: [
            { id: 1, title: "컴포넌트 이해하기", isDone: true },
            { id: 2, title: "상태관리 배우기", isDone: true },
          ],
        },
      ],
    },
  });

  // 날짜 선택시 상태 변경
  const handleChange = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split("T")[0];
    const selectedDateGoals = goalsData[dateStr]?.goals || [];

    // 선택된 날짜의 목표 데이터를 상위 컴포넌트로 전달
    onDateSelect(dateStr, selectedDateGoals, updateGoalStatus);
  };

  // 새로운 목표 추가 함수
  const handleAddGoal = (dateStr, newGoalData) => {
    setGoalsData((prev) => ({
      ...prev,
      [dateStr]: {
        status: "incomplete", // 초기상태는 미완료
        goals: [...(prev[dateStr]?.goals || []), newGoalData],
      },
    }));
  };

  // 목표 업데이트 함수
  const updateGoalStatus = (dateStr) => {
    const dateGoals = goalsData[dateStr]?.goals || [];
    const allCompleted = dateGoals.every(
      (goal) => goal.status === "done" && goal.subGoals.every((subGoal) => subGoal.isDone),
    );

    setGoalsData((prev) => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        status: allCompleted ? "done" : "incomplete",
      },
    }));
  };

  // 현재 날짜 가져와서 그날 조건에 맞게 스타일 적용
  const getTileClassName = ({ date }) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; // YYYY-MM-DD 형식으로 변환(한국 표준시))
    const goalStatus = goalsData[dateStr]?.status; // 해당 날짜의 목표 상태 가져오기(달성, 미달성, 오늘)

    // 디버깅 위한 콘솔 로그
    console.log("Date:", date);
    console.log("DateStr:", dateStr);
    console.log("Status:", goalStatus);
    console.log("Available dates:", Object.keys(goalsData));

    if (isToday(date)) return "today-tile"; //오늘이면 .today-tile 스타일 적용
    if (goalStatus === "done") return "done-tile";
    if (goalStatus === "incomplete") return "incomplete-tile";
    return null;
  };

  // 오늘 날짜인지 확인하는 함수
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  //오늘 날짜 반환하는 함수
  const getFormattedMonthDay = (d) => {
    return d.toLocaleDateString("ko-KR", {
      month: "long", //n월
      day: "numeric", //n일
    });
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setActiveStartDate(newDate);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setActiveStartDate(newDate);
  };

  return (
    <div
      style={{
        width: "361px",
        height: "auto",
        minHeight: "420px",
        borderRadius: "20px",
      }}
    >
      <div className="header-container">
        <div className="greeting">
          <h2 style={{ textAlign: "left" }}>안녕하세요:&#41;</h2>
          <h2 style={{ textAlign: "left" }}>
            오늘은 <span style={{ color: "#FF620D" }}>{getFormattedMonthDay(new Date())}</span>
            이에요
          </h2>
        </div>
        <div className="custom-navigation">
          <button className="custom-nav-button" onClick={handlePrevMonth} aria-label="이전 달">
            {"<"}
          </button>
          <button className="custom-nav-button" onClick={handleNextMonth} aria-label="다음 달">
            {">"}
          </button>
        </div>
      </div>
      <Calendar
        onChange={handleChange} // 날짜 선택시 handleChange 호출
        value={selectedDate} // 선택된 날짜
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        locale="en-US" //일주일이 일요일부터 시작(미국식)
        tileClassName={getTileClassName} //타일에 클래스 이름 적용
        formatDay={(locale, date) => date.getDate()} //날짜만 표시
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0)
        } //요일의 첫 글자만 표시
        calnderType="US" // 미국식 달력
      />
      {/* 캘린더 하단 색상가이드 */}
      <div class="color-guide">
        <div class="color-guide-item">
          <span class="color-box incomplete"></span>
          <span class="label">미완료</span>
        </div>
        <div class="color-guide-item">
          <span class="color-box done"></span>
          <span class="label">완료</span>
        </div>
        <div class="color-guide-item">
          <span class="color-box today"></span>
          <span class="label">오늘</span>
        </div>
      </div>
    </div>
  );
}

export default HomeCalendar;
