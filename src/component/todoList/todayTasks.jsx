/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TitleBlock from "./titleBlock";
import FilterBar from "./filterBar";
import TaskCategory from "./taskCategory";

const taskData = {
  opic: [
    { label: "기출문제 풀기", highlightColor: "#B0B0B0" },
    { label: "모의고사 준비하기", highlightColor: "#D9D9D9" },
    { label: "모의고사 준비하기", highlightColor: "#FF610D" },
  ],
  정보처리기사: [
    { label: "기출문제 풀기", highlightColor: "#7B8493" },
    { label: "모의고사 준비하기", highlightColor: "#68A800" },
    { label: "모의고사 준비하기", highlightColor: "#68A800" },
  ],
};

export default function TodayTasks() {
  const total = taskData.opic.length + taskData.정보처리기사.length;

  return (
    <Container>
      <TitleBlock />
      <FilterBar total={total} opic={taskData.opic.length} 기사={taskData.정보처리기사.length} />

      <TaskCategoryWrapper>
        <TaskCategory title="# opic" tasks={taskData.opic} />
      </TaskCategoryWrapper>

      <TaskCategoryWrapper>
        <TaskCategory title="# 정보처리기사" tasks={taskData.정보처리기사} />
      </TaskCategoryWrapper>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
  padding: 1.5rem;
  color: #1a1a1a;
`;

const TaskCategoryWrapper = styled.div`
  background: #f7f7f8;
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;