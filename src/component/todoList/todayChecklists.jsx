/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TitleBlock from "./titleBlock";
import FilterBar from "./filterBar";
import { useChecklistStore, useFilterStore,useGoalStore} from "../../store/states";
import SwipeToDeleteItem from "../swipeToDelete/swipeToDelete";
import { useEffect,useState } from "react";
import { css } from '@emotion/react';
import OnlyCheckPopup from "../checklist/onlyCheckPopup"; // 실제 파일 경로에 따라 수정
import {primary} from '../common/styles/globalStyle/colors';

export default function TodayChecklists() {
  const checklists = useChecklistStore((state) => state.Checklists);
  const goals = useGoalStore((state) => state.goals);
  const updateChecklist = useChecklistStore((state) => state.updateChecklist);
  const deleteChecklist = useChecklistStore((state) => state.deleteChecklist);
  const activeFilter = useFilterStore((state) => state.type);
  const [showPopup, setShowPopup] = useState(false);
  const fetchGoals = useGoalStore((state) => state.fetchGoals);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const addChecklist = useChecklistStore((state) => state.addChecklist);
  const fetchChecklists = useChecklistStore((state) => state.fetchChecklists);

  useEffect(() => {
    fetchGoals();
    fetchChecklists();
  }, [fetchGoals,fetchChecklists]);
  // 팝업 닫기
  const handleCancel = () => {
    setShowPopup(false);
    setSelectedGoalId(null);
  };

  // 팝업에서 등록(확정)할 때
  const handleConfirm = (checklistItems) => {
    console.log("handleConfirm:", checklistItems, "goalId:", selectedGoalId);
    // 각각 checklist 추가
    checklistItems.forEach(item => {
      addChecklist({
        goalId: selectedGoalId,
        checklistName: item.Checklist, // key 소문자 주의!
      });
    });
    setShowPopup(false);
    setSelectedGoalId(null);
  };
  return (
    <Container>
      <TitleBlock css={{ paddingBottom: "35px" }} />
      <FilterBar />
      {goals.map(goal => {
        const isVisible = activeFilter === "All" || activeFilter === goal.goalname;
        if (!isVisible) return null;

        // checklist를 goalid로 필터
        const myChecklists = checklists.filter(item => item.goalId === goal.goalId);

        return (
          <ChecklistCategoryWrapper key={goal.goalId}>
            <CategoryTitle>{goal.goalname}</CategoryTitle>
            {myChecklists.length > 0
              ? myChecklists.map((item) => (
                  <SwipeToDeleteItem 
                        key={item.checklistId} 
                        checklistId={item.checklistId}  
                        onDelete={() => deleteChecklist(item.checklistId)}>
                    <StyledChecklistItem>
                      <Label>{item.checklistName}</Label>
                      <CheckBox
                        background={item.clear ? "#4E6EF2" : "#1a1a1a"}
                        onClick={() => updateChecklist(item.checklistId, { clear: !item.clear })}
                        checked={item.clear}
                      />
                    </StyledChecklistItem>
                  </SwipeToDeleteItem>
                ))
              : <div style={{ margin: "1rem 0", color: "#aaa", fontSize: "0.95rem" }}>등록된 할 일이 없습니다.</div>
            }
            {/* 할 일 추가하기 버튼! */}
            <CategoryTitle
              css={{ color: "grey", fontSize: "1rem", cursor: "pointer" }}
              onClick={() => {
                setSelectedGoalId(goal.goalId);
                setShowPopup(true);
              }}
            >
              할일 추가하기 +
            </CategoryTitle>
          </ChecklistCategoryWrapper>
        );
      })}
      {/* ChecklistPopup은 한 번만! */}
      {showPopup && (
        <OnlyCheckPopup
          goalId={selectedGoalId}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
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

const ChecklistCategoryWrapper = styled.div`
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

const StyledChecklistItem = styled.div`
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
