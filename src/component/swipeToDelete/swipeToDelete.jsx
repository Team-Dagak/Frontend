import React, { useState, useEffect} from "react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import DeletePopup from "./deletePopup";
import { useChecklistStore, useSelectedChecklistStore, usePopupStore } from "../../store/states";

export default function SwipeToDeleteItem({ children, onDelete ,checklistId}) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isSwiped, setIsSwiped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { setSelectedChecklist } = useSelectedChecklistStore();
  const Checklists = useChecklistStore((state) => state.Checklist);
  const setPopupChecklist = usePopupStore((state) => state.setPopupChecklist);


  // 삭제 버튼 투명도 (왼쪽으로 갈수록 진해짐)
  const opacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;

    if (offsetX < -60) {
      controls.start({ x: -80 });
      setIsSwiped(true);
    } else {
      controls.start({ x: 0 });
      setIsSwiped(false);
    }
  };

  const handleRecover = () => {
    controls.start({ x: 0 });
    setIsSwiped(false);
  };

  const handleDeleteClick = (checklistId) => {
    console.log("checklistId:", checklistId); // 콘솔 찍기

    setPopupChecklist(checklistId);
    
    setShowPopup(true);
  };
  const handleConfirmDelete = () => {
    const { selectedChecklist, clearSelectedChecklist } = useSelectedChecklistStore.getState();
    const { Checklists, setChecklists } = useChecklistStore.getState();

    if (selectedChecklist) {
      const { categoryIndex, ChecklistIndex } = selectedChecklist;

      // 깊은 복사 후 삭제
      const newChecklists = JSON.parse(JSON.stringify(Checklists));
      newChecklists[categoryIndex].items.splice(ChecklistIndex, 1);

      setChecklists(newChecklists);
      clearSelectedChecklist();
    }
    if (onDelete) onDelete(); 
    setShowPopup(false);
    controls.start({ x: 0 });
    setIsSwiped(false);
    
    
  };

  const handleCancelDelete = () => {
        controls.start({ x: 0 });
    setIsSwiped(false);
    setShowPopup(false);
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    // MotionItem DOM 요소 내부 클릭이면 무시
    if (e.target.closest(".swipe-item")||
      e.target.closest(".delete-button")) return;
    
    // 외부 클릭이면 복구
    if (isSwiped) {
      handleRecover();
    }
  };

  if (isSwiped) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isSwiped]);

  return (
    <>
      <Wrapper>
        <DeleteButton
        className="delete-button"
          as={motion.button}
          style={{ opacity }}
          onClick={() => handleDeleteClick(checklistId)}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          삭제
        </DeleteButton>

        <MotionItem
          className="swipe-item"
          drag="x"
          dragConstraints={{ left: -80, right: 0 }}
          style={{ x }}
          animate={controls}
          onDragEnd={handleDragEnd}
          onClick={isSwiped ? handleRecover : undefined}
        >
          {children}
        </MotionItem>
      </Wrapper>

      {showPopup && <DeletePopup onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />}
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
