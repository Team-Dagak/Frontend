import { useState } from "react";
import GoalAddPopup from "./goalAddPopup";
import { useGoalWizardStore } from "@/store/useGoalWizardStore";
import { useGoalStore } from "@/store/useGoalStore";
import ChecklistPopup from "../checklist/checklistPopup";
import { usePopupStore } from "@/store/usePopupStore";
import type { CheckList, Goal } from "@/types/types";

interface AddGoalProps{
    onCancel: () => void;
}

export default function AddGoal({ onCancel }: AddGoalProps){
  const PopupGoal = usePopupStore((s) => s.popupGoal);
  const clearPopupGoal = usePopupStore((s) => s.clearPopupGoal);

  // 2단계 컨트롤
  const [showChecklist, setShowChecklist] = useState(false);

  // 임시 goal 저장(다음 단계 위해)
  const setTempGoal = useGoalWizardStore((s) => s.setTempGoal);
  const clearTempGoal = useGoalWizardStore((s) => s.clearTempGoal);

  // 실제 저장
  const addGoal = useGoalStore((s) => s.addGoal);

  // 1단계: 목표 정보 입력 → checklist로 넘어가기
  const handleGoalNext = (goalData: Goal) => {
    setTempGoal(goalData);
    setShowChecklist(true);
  };

  // 2단계: checklist까지 완성 → 진짜 저장
  const handleChecklistFinish = (checkList: CheckList) => {
    const tempGoal = useGoalWizardStore.getState().tempGoal;
    addGoal({
      ...tempGoal,
      checkList,
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
