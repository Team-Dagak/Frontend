/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TitleBlock from "./titleBlock";
import FilterBar from "./filterBar";
import {useTaskStore, useFilterStore} from "../../store/states";

export default function TodayTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTaskClear = useTaskStore((state) => state.toggleTaskClear);
  const activeFilter = useFilterStore((state) => state.type)

  const handleClear = (categoryIndex, taskItemIndex) => {
    toggleTaskClear(categoryIndex, taskItemIndex);
  };

  return (
    <Container>
      <TitleBlock />
      <FilterBar/>

    {tasks.map((cat, catindex) => {
      const isVisible = activeFilter ==="All" || activeFilter === cat.taskType;
      return(
        <TaskCategoryWrapper key={catindex} style={{ display: isVisible ? 'block' : 'none'}}>
          <CategoryTitle>{cat.taskType}</CategoryTitle>
          
              {cat.items.map((taskItem, taskindex) => (
              <TaskItem key={taskindex}>
                <Label>{taskItem.task}</Label>
                <CheckBox background={taskItem.clear ? cat.color : "#1a1a1a"}
                onClick={() => handleClear(catindex, taskindex)}
                clear={taskItem.clear}/>
              </TaskItem>
              ))}
          
        </TaskCategoryWrapper>
      );
    })}
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 1.5rem;
  color: #1a1a1a;
`;

const TaskCategoryWrapper = styled.div`
  background: #f7f7f8;
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1A1A1A;
`;

const CheckBox = styled.div `
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: ${({ background }) => background};
  animation: ${({ checked }) => (checked ? 'pop-in 0.25s ease-out' : 'pop-out 0.25s ease-in')};
  transition: background 0.3s ease;
`