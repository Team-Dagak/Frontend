/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect,useMemo } from "react";
import { useFilterStore,useGoalStore} from '../../store/states'
import { useChecklistStore } from "../../store/states";
import useEmblaCarousel from 'embla-carousel-react';
import { css } from '@emotion/react';

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
  animation: ${({props}) => (props ? "pop-in 0.25s ease-out" : "pop-out 0.25s ease-in")};
  transition: background 0.3s ease;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;

const embla = css`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const emblaContainer = css`
  display: flex;
  width: 100%;
  margin: 0;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;


export default function FilterBar() {
  const Checklists = useChecklistStore((state) => state.Checklists);
  const { type, setType } = useFilterStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  

  const goals = useGoalStore((state) => state.goals); // goal 목록

  useEffect(() => {
    console.log("Checklists 샘플:", Checklists);
    console.log("goals 샘플:", goals);
  }, [Checklists, goals]);
 // **goalname별로 checklist 개수 집계 (0건도 포함)**
 const categoryCounts = useMemo(() => {
  const counts = {};
  // 1. 모든 goalname을 0으로 초기화
  for (const goal of goals) {
    counts[goal.goalname] = 0;
  }
  // 2. checklist 돌면서 goalname 카운트 증가
  for (const item of Checklists) {
    // item.goalId에 해당하는 goal을 찾아서 goalname 가져오기
    const goal = goals.find(g => g.goalId === item.goalId);
    const cat = goal ? goal.goalname : "기타";
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}, [Checklists, goals]);

// goalname 카테고리 리스트
const categories = Object.keys(categoryCounts);

// 전체 checklist 개수
const totalCount = Checklists.length;

return (
  <Bar css={embla} ref={emblaRef}>
    <div css={emblaContainer}>
      <FilterButton
        active={type === "All"}
        onClick={() => setType("All")}
        css={{ fontWeight: "400" }}
      >
        전체 {totalCount}건
      </FilterButton>
      {categories.map((cat) => (
        <FilterButton
          key={cat}
          active={type === cat}
          onClick={() => setType(cat)}
          css={{ fontWeight: "400" }}
        >
          #{cat} {categoryCounts[cat]}건
        </FilterButton>
      ))}
    </div>
  </Bar>
);
}


