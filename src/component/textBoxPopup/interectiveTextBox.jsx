/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { gray60, primary } from "../common/styles/globalStyle/colors";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 157px;
  height: fit-content;
  background-color: #ffffff3e;
  border-radius: 16px 16px 0 0;
    z-index: 3000;
    backdrop-filter: blur(15px);

  display: grid;
  grid-template-rows: 1fr auto;
  gap: 20px;
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
  width: 92px;
  height: 32px;
  font-size: 12px;
  justify-content: center;
align-items: center;
text-align: center;
display: flex;
`;

const Confirm = styled.button`
  border-radius: 16px;
  color: ${({ active }) => (active ? "#fff" : "#000")};
  background-color: ${({ active }) => (active ? "#000" : primary)};
  width: 57px;
  height: 37px;
  font-size: 12px;
`;

export default function InterectiveTextBox() {
  const [text, setText] = useState("");

  return (
    <Container>
      <TextBox
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="작은 목표를 작성해 주세요."
      />
      <Panel>
        <MainGoal># 큰 목표 이름</MainGoal>
        <Confirm active={!!text}>{text ? "취소" : "완료"}</Confirm>
      </Panel>
    </Container>
  );
}
