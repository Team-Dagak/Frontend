/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function FilterBar({ total, opic, 기사 }) {
  return (
    <Bar>
      <FilterButton active>전체 {total}건</FilterButton>
      <FilterButton># opic {opic}건</FilterButton>
      <FilterButton># 정보처리기사 {기사}건</FilterButton>
      <ToggleBox />
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const FilterButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: ${(props) => (props.active ? "#1A1A1A" : "#F7F7F8")};
  color: ${(props) => (props.active ? "white" : "#1A1A1A")};
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const ToggleBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: #d9d9d9;
  border-radius: 0.25rem;
`;