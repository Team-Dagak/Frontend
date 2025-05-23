/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { gray10, gray20, gray60, primary } from "../common/styles/globalStyle/colors";
import { keyframes } from "@emotion/react";
import useKeyboardOffset from "./useKeyboardOffset";
import useSmartKeyboardOffset from "./useSmartKeyboardOffset";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3000;
`;

const AnimatedWrapper = styled.div`
  animation: ${slideUp} 0.35s ease-out;
`;

const Container = styled.div`
  width: 100%;
  min-height: 157px;
  height: fit-content;
  background-color: #ffffffB3;
  border-radius: 16px 16px 0 0;
  z-index: 3000;
  backdrop-filter: blur(15px);
  position: relative;

  display: grid;
  grid-template-rows: 1fr auto;
  gap: 20px;
  padding-bottom:20px;
`;

const TextBox = styled.textarea`
  background-color: transparent;
  color: ${gray60};
  font-size: 14px;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 12px;
  box-sizing: border-box;
`;

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;

const MainGoal = styled.div`
  border-radius: 12px;
  color: ${primary};
  background-color: #fff;
  width: fit-content;
  padding:0 5px;
  height: 32px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
`;

const Confirm = styled.button`
  border-radius: 16px;
  color: ${({ active }) => (active ? "#000" : "#fff")};
  background-color: ${({ active }) => (active ? primary : "#000" )};
  width: 57px;
  height: 37px;
  font-size: 12px;
`;

export default function OnlyCheckPopup({ goalName, onConfirm, onCancel }) {
  const [text, setText] = useState("");
  const offset = useSmartKeyboardOffset();
const adjusted = offset > 0 ? offset - 40 : 0;

const handleRegister = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      alert("할 일을 입력해 주세요.");
      return;
    }
    onConfirm([{ Checklist: trimmed, clear: false }]);
    console.log("onConfirm 호출!", trimmed);
  };

  const ContainerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3000;
  animation: slide-up 0.3s ease;
  backdrop-filter: blur(5px);

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;



  return (
    <Overlay onClick={onCancel}>
      <AnimatedWrapper onClick={(e) => e.stopPropagation()}>
        <Container style={{marginBottom: adjusted}}>
          <TextBox
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="작은 목표를 작성해 주세요."
          />
          <Panel>
            <MainGoal># {goalName}</MainGoal>
            <Confirm
              active={!!text}
              onClick={!text ? onCancel : handleRegister}
            >
              {text ? "완료" : "취소"}
            </Confirm>
          </Panel>
        </Container>
      </AnimatedWrapper>
    </Overlay>
  );
}
