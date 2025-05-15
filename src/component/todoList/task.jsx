/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

export default function Task({ label, highlightColor, category }) {
  const [checked, setChecked] = useState(false);

  const getCheckedColor = () => {
    if (category === "# opic") return "#FF610D";
    if (category === "# 정보처리기사") return "#68A800";
    return "#1A1A1A";
  };

  const getBaseColor = () => highlightColor || "#E5E5EA";
  const toggleColor = () => (checked ? getCheckedColor() : getBaseColor());
  const handleToggle = () => setChecked(prev => !prev);

  return (
    <TaskItem onClick={handleToggle}>
      <Label>{label}</Label>
      <ColorDot background={toggleColor()} checked={checked} />
    </TaskItem>
  );
}

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  cursor: pointer;
`;

const ColorDot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: ${({ background }) => background};
  animation: ${({ checked }) => (checked ? 'pop-in 0.25s ease-out' : 'pop-out 0.25s ease-in')};
  transition: background 0.3s ease;

  @keyframes pop-in {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes pop-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Label = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1A1A1A;
`;