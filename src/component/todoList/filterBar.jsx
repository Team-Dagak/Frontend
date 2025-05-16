/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useFilterStore } from '../../store/states'
import data from '../../data/data.json'
import { useTaskStore } from "../../store/states";
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
  const tasks = useTaskStore((state) => state.tasks)
  const {type, setType} = useFilterStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: false, align: 'start'});
  
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  const handleClick = (key) => {
    setType(key);
  };

  const totalCount = data.tasks.reduce((sum, task) => sum + (task.count || 0), 0);

  return (
    <Bar css={embla} ref={emblaRef}>
      <div css={emblaContainer}>
        <FilterButton active={type === "All"} onClick={() => handleClick('All')} css = {{fontWeight:"400"}} >전체 {totalCount}건</FilterButton>
        {tasks.map((item, index) => (
          <FilterButton
          active = {type === item.taskType} 
          onClick={() => handleClick(item.taskType)} 
          key={index}
          css = {{fontWeight:"400"}}
          >
            # {item.taskType}  {item.count} 건
          </FilterButton>
        ))}
      </div>
    </Bar>
  );
}


