/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TitleBlock from "./titleBlock";
import FilterBar from "./filterBar";
import { useTaskStore, useFilterStore } from "../../store/states";
import SwipeToDeleteItem from "../swipeToDelete/swipeToDelete";
import { css } from '@emotion/react';

export default function TodayTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTaskClear = useTaskStore((state) => state.toggleTaskClear);
  const activeFilter = useFilterStore((state) => state.type);

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleClear = (categoryIndex, taskItemIndex) => {
    toggleTaskClear(categoryIndex, taskItemIndex);
  };

  return (
    <Container>
      <TitleBlock css={{paddingBottom: "35px"}}/>
      <FilterBar />

      {tasks.map((cat, catindex) => {
        const isVisible = activeFilter === "All" || activeFilter === cat.taskType;
        return (
          <TaskCategoryWrapper key={catindex} style={{ display: isVisible ? "block" : "none" }}>
            <CategoryTitle>{cat.taskType}</CategoryTitle>
            {/* Swipeable List 이용하여 Swipe 삭제 기능 구현 */}
            {cat.items.map((taskItem, taskindex) => (
              <SwipeToDeleteItem
                key={taskindex}
                categoryIndex={catindex}
                taskIndex={taskindex}
                onDelete={() => handleDelete(taskindex)}
              >
                <TaskItem key={taskindex}>
                  <Label>{taskItem.task}</Label>
                  <CheckBox
                    background={taskItem.clear ? cat.color : "#1a1a1a"}
                    onClick={() => handleClear(catindex, taskindex)}
                    clear={taskItem.clear}
                  />
                </TaskItem>
              </SwipeToDeleteItem>
            ))}
          </TaskCategoryWrapper>
        );
      })}
      <TaskCategoryWrapper css={{ textAlign: "center", justifyContent: "center" }}>
        <CategoryTitle css={{ color: "grey", fontSize: "1rem" }}>할일 추가하기 +</CategoryTitle>
      </TaskCategoryWrapper>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 17px;
  color: #1a1a1a;
  overflow: hidden;
`;

const TaskCategoryWrapper = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  margin-bottom: 30px;
  overflow-x: hidden;
`;

const CategoryTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: #1a1a1a;
`;

const CheckBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: ${({ background }) => background};
  animation: ${({ checked }) => (checked ? "pop-in 0.25s ease-out" : "pop-out 0.25s ease-in")};
  transition: background 0.3s ease;
`;
