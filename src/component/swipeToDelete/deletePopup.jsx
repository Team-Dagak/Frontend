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



export default function DeletePopup({ onConfirm, onCancel }) {
  const {PopupGoal} = usePopupStore();
  const {ChecklistName, ChecklistType} = PopupGoal || {};


  return (
    <div css={container}>
      <div css={giveUp}>작은 목표를 정말 삭제할까요?</div>
      <div css={explanation}> <b># {ChecklistType}</b> 에 설정한 작은 목표&nbsp;<b>{ChecklistName}</b> 은/는 삭제되며 다시 복구할 수 없어요. </div>
      <div css={choice}>
        <Retry onClick={onCancel}>다시 생각해볼래요</Retry>
        <Retire onClick={onConfirm}>네, 삭제할래요</Retire>
      </div>    
    </div>
  );
}
