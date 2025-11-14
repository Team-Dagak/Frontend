/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TitleBlock from "./titleBlock";
import FilterBar from "./filterBar";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import OnlyCheckPopup from "../checklist/onlyCheckPopup"; // 실제 파일 경로에 따라 수정
import { FaPlus } from "react-icons/fa";
import { useChecklistStore } from "@/store/useChecklistStore";
import { useGoalStore } from "@/store/useGoalStore";
import { useFilterStore } from "@/store/useFilterStore";

export default function TodayChecklists() {
    const checklists = useChecklistStore((state) => state.checklist);
    const goals = useGoalStore((state) => state.goals);
    const updateChecklist = useChecklistStore((state) => state.updateChecklist);
    const activeFilter = useFilterStore((state) => state.type);
    const [showPopup, setShowPopup] = useState(false);
    const fetchGoals = useGoalStore((state) => state.fetchGoals);
    const [selectedGoalId, setSelectedGoalId] = useState<number | undefined>(
        0
    );
    const addChecklist = useChecklistStore((state) => state.addChecklist);
    const fetchChecklists = useChecklistStore((state) => state.fetchChecklists);
    const [selectedGoalName, setSelectedGoalName] = useState<
        string
    >("");

    useEffect(() => {
        fetchGoals();
        fetchChecklists();
    }, [fetchGoals, fetchChecklists]);
    // 팝업 닫기
    const handleCancel = () => {
        setShowPopup(false);
        setSelectedGoalId(0);
    };

    // 팝업에서 등록(확정)할 때
    const handleConfirm = (checklistName: string) => {
        console.log(
            "handleConfirm:",
            checklistName,
            "goalId:",
            selectedGoalId
        );
        // 각각 checklist 추가
            addChecklist(
                selectedGoalId,
                checklistName// key 소문자 주의!
            );
        setShowPopup(false);
        setSelectedGoalId(0);
    };

    return (
        <Container>
            <TitleBlock css={{ paddingBottom: "35px" }} />
            <FilterBar />
            {goals.map((goal) => {
                const isVisible =
                    activeFilter === "All" || activeFilter === goal.category;
                if (!isVisible) return null;

                // checklist를 goalid로 필터
                const myChecklists = checklists.filter(
                    (item) => item.goalId === goal.goalId
                );

                return (
                    <ChecklistCategoryWrapper key={goal.goalId}>
                        <div css={TitleBar}>
                            <CategoryTitle># {goal.goalname}</CategoryTitle>
                            <button
                                onClick={() => {
                                    setSelectedGoalId(goal.goalId);
                                    setSelectedGoalName(goal.goalname!);
                                    setShowPopup(true);
                                }}
                            >
                                <FaPlus />
                            </button>
                        </div>
                        {myChecklists.length > 0 ? (
                            myChecklists.map((item) => (
                                <StyledChecklistItem>
                                    <CheckBox
                                        background={
                                            item.clear ? "#4E6EF2" : "#1a1a1a"
                                        }
                                        onClick={() =>
                                            updateChecklist(item.checklistId, item.checklistName, item.goalId, !item.clear , item.checkDate 
                                            )
                                        }
                                        checked={item.clear}
                                    />
                                    <Label>{item.checklistName}</Label>
                                </StyledChecklistItem>
                            ))
                        ) : (
                            <div
                                style={{
                                    margin: "1rem 0",
                                    color: "#aaa",
                                    fontSize: "0.95rem",
                                }}
                            >
                                등록된 할 일이 없습니다.
                            </div>
                        )}
                    </ChecklistCategoryWrapper>
                );
            })}
            {/* ChecklistPopup은 한 번만! */}
            {showPopup && (
                <OnlyCheckPopup
                    goalname={selectedGoalName}
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
`;

const StyledChecklistItem = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding-bottom: 5px;
    text-align: left;
`;

const Label = styled.div`
    font-size: 0.875rem;
    color: #1a1a1a;
`;

const CheckBox = styled.div<{ background: string; checked: boolean | undefined}>`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 6px;
    background: ${({ background }) => background};
    animation: ${({ checked }) =>
        checked ? "pop-in 0.25s ease-out" : "pop-out 0.25s ease-in"};
    transition: background 0.3s ease;
`;

const TitleBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin-bottom: 18px;
`;
