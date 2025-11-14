/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { primary, gray70, grayMain } from "@/styles/colors";
import { useChecklistCountStore } from "@/store/useChecklistCountStore";

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${grayMain};
`;

const Accent = styled.span`
  color: ${primary};
`;

const DateText = styled.div`
  color: ${gray70};
  font-size: 15px;
  font-weight: 150;
  margin-bottom: 20px;
`;

interface TitleBlockProp {
    className?: string;
}

export default function TitleBlock({ className }:TitleBlockProp) {
  const {totalCount} = useChecklistCountStore();
  const date = new Date();
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

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