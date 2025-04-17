/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function TitleBlock() {
  const today = new Date().getDate();

  return (
    <Title>
      <Accent>{today}일</Accent> 오늘의 해야할 일
    </Title>
  );
}

const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Accent = styled.span`
  color: #ff610d;
`;