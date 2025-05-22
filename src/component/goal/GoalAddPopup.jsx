/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { usePopupStore } from "../../store/states";
import { useState, useEffect } from "react"; 

const container = css`
  position: fixed;
  z-index: 2000;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  width: 361px;
  height: 226px;
  padding: 18px;
  background-color: #ffffff10;
  border-radius: 16px;
  backdrop-filter: blur(15px);
  outline-color: #1a1c20;
  outline-style: solid;
  outline-width: 1px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const giveUp = css`
    display: flex;
    font-weight: bold;
    font-size: large;
    align-items: center;
    padding-left: 16px;

`;

const explanation = css`  
  display: block;
  font-size: small;
  align-content: center;
  padding: 0 16px;
  width: 100%;
  line-height: 1.5rem;
  word-break: keep-all;
`;

const choice = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const Retry = styled.button`
  height: 40px;
  border-radius: 12px;
  background-color: white;
  color: #1a1c20;
  border: none;
  
`;

const Retire = styled.button`
  height: 40px;
  border-radius: 12px;
  background-color: #1a1c20;
  color: white;
  border: none;
`;



export default function AddGoalPopup({ onConfirm, onCancel }) {
  const { PopupGoal } = usePopupStore(); // goal 추가용 팝업 값
  const { recommendation  } = PopupGoal || {};

  // 입력폼 상태 (추천 클릭 시 초기값 자동 세팅)
  const [goalName, setGoalName] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");   // ✅ 추가!
  const [deadline, setDeadline] = useState("");     // ✅ 추가!
  // PopupGoal이 바뀌면 값 자동 입력
  useEffect(() => {
    setGoalName(recommendation || "");
    setDesc(explanation || "");
  }, [recommendation, explanation]);

  const handleNext = () => {
    if (!goalName.trim()) {
      alert("목표명을 입력해 주세요.");
      return;
    }
    if (!startDate || !deadline) {
      alert("시작일과 마감일을 모두 선택해 주세요.");
      return;
    }
    // checklist는 다음 단계에서 입력
    onConfirm({
      goalname: goalName,
      startdate: startDate,
      deadline: deadline,
      pinned: 0,
    });
  };

  return (
    <div css={container}>
    <div css={giveUp}>새 목표를 추가하세요</div>
    <div css={explanation}>
      <input
        type="text"
        value={goalName}
        onChange={e => setGoalName(e.target.value)}
        placeholder="목표 이름을 입력하세요"
        css={{ width: "100%", marginBottom: 12, fontSize: "1.1rem", padding: 8 }}
      />
      <div style={{ marginBottom: 12 }}>
        <label>
          시작일&nbsp;
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            css={{ marginRight: 12 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>
          마감일&nbsp;
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </label>
      </div>
    </div>
    <div css={choice}>
      <Retry onClick={onCancel}>취소</Retry>
      <Retire onClick={handleNext}>다음</Retire>
    </div>
  </div>
);
}
