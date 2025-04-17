/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Task from "./task";

export default function TaskSection({ title, tasks }) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {tasks.map((task, idx) => (
        <Task key={idx} label={task.label} highlightColor={task.highlightColor} category={title} />
      ))}
    </Section>
  );
}

const Section = styled.div`
  margin-bottom: 1.25rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;