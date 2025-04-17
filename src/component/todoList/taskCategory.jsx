/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Task from "./task"; // 이미 만든 Task 컴포넌트

export default function TaskCategory({ title, tasks }) {
  return (
    <Wrapper>
      <CategoryTitle>{title}</CategoryTitle>
      {tasks.map((task, idx) => (
        <Task
          key={idx}
          label={task.label}
          highlightColor={task.highlightColor}
          category={title}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;