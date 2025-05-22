import React, { useState } from "react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import GoalAddPopup from "./GoalAddPopup";
import { usePopupStore ,useGoalStore,useGoalWizardStore } from "../../store/states";
import ChecklistPopup from "../checklist/CheckListPopup";
export default function AddGoal({ onCancel }){
  const PopupGoal = usePopupStore((s) => s.PopupGoal);
  const clearPopupGoal = usePopupStore((s) => s.clearPopupGoal);

  // 2단계 컨트롤
  const [showChecklist, setShowChecklist] = useState(false);

  // 임시 goal 저장(다음 단계 위해)
  const setTempGoal = useGoalWizardStore((s) => s.setTempGoal);
  const clearTempGoal = useGoalWizardStore((s) => s.clearTempGoal);

  // 실제 저장
  const addGoal = useGoalStore((s) => s.addGoal);

  // 1단계: 목표 정보 입력 → checklist로 넘어가기
  const handleGoalNext = (goalData) => {
    setTempGoal(goalData);
    setShowChecklist(true);
  };

  // 2단계: checklist까지 완성 → 진짜 저장
  const handleChecklistFinish = (checklist) => {
    const tempGoal = useGoalWizardStore.getState().tempGoal;
    addGoal({
      ...tempGoal,
      checklist,
    });
    clearTempGoal();
    setShowChecklist(false);
    clearPopupGoal();
  };

  // 취소: 단계/팝업 전부 닫기
  const handleCancel = () => {
    clearTempGoal();
    setShowChecklist(false);
    clearPopupGoal();
    onCancel?.();
  };

  return (
    <>
      {PopupGoal && !showChecklist && (
        <GoalAddPopup
          onConfirm={handleGoalNext} // “다음” → checklist 입력으로 넘어감
          onCancel={handleCancel}
        />
      )}
      {PopupGoal && showChecklist && (
        <ChecklistPopup
          onConfirm={handleChecklistFinish} // “등록” → 진짜 goal+checklist 저장
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const DeleteButton = styled(motion.button)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  background-color: red;
  color: white;
  border: none;
  font-weight: bold;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MotionItem = styled(motion.div)`
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  touch-action: pan-y;
  transition: box-shadow 0.2s;
`;
