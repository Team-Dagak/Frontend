/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useChecklistStore } from "../../store/states";

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Accent = styled.span`
  color: #ff610d;
`;

const DateText = styled.div`
  color: #474c57;
  font-size: 15px;
  font-weight: 150;
  margin-bottom: 20px;
`;

export default function TitleBlock({ className }) {
  const Checklists = useChecklistStore((state) => state.Checklists)
  const date = new Date();
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const totalCount = Checklists.reduce((sum, Checklist) => sum + (Checklist.count || 0), 0);

  return (
    <div>
      <DateText>
        TODAY {year}. {month}. {day}{" "}
      </DateText>
      <Title css={className}>
        <Accent>{totalCount}</Accent> 건의 할 일이 있어요
      </Title>
    </div>
  );
}
