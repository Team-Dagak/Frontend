/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { usePopupStore } from "../../store/states";

const container = css`
  position: fixed;
  z-index: 2000;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  width: 361px;
  height: 226px;
  padding: 18px;
  background-color: white;
  border-radius: 12px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline-color: #1a1c20;
  outline-style: solid;
  outline-width: 1px;
`;

const giveUp = css`
    display: flex;
    font-weight: bold;
    font-size: large;
    align-items: center;
    padding-left: 10px;
`;

const explanation = css`
  display:flex;
  font-size: small;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 10px;
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
  border: 1px solid #1a1c20;
`;

const Retire = styled.button`
  height: 40px;
  border-radius: 12px;
  background-color: #1a1c20;
  color: white;
  border: none;
`;

export default function DeletePopup({ onConfirm, onCancel }) {
  const {PopupTask} = usePopupStore();
  const {taskName, taskType} = PopupTask || {};


  return (
    <div css={container}>
      <div css={giveUp}>작은 목표를 정말 삭제할까요?</div>
      <div css={explanation}> # {taskType}에 설정한 작은 목표 {taskName} 은/는 삭제되며 다시 복구할 수 없어요. </div>
      <div css={choice}>
        <Retry onClick={onCancel}>다시 생각해볼래요</Retry>
        <Retire onClick={onConfirm}>네, 삭제할래요</Retire>
      </div>    
    </div>
  );
}
