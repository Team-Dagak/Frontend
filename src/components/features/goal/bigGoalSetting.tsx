/** @jsxImportSource @emotion/react */
import ColorPickerPopup from "@/components/ui/colorPicker/colorPickerPopup";
import DatePickerPopup from "@/components/ui/dateSelector/datePickerPopup";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useGoalStore } from "@/store/useGoalStore";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 0 16px 24px;
    background-color: #f5f5f7;
    display: flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    height: 56px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const BackButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 999px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

const TopTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const GoalTitleRow = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: 40px 1fr;
    column-gap: 8px;
    align-items: center;
`;

const GoalTitleBox = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background: #e5e5ea;
`;

const GoalTitleInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #e5e5ea;
    padding: 8px 0;
    font-size: 14px;
    background: transparent;

    ::placeholder {
        color: #c4c4c4;
    }

    :focus {
        outline: none;
        border-color: #ff6a21; /* 포커스 시 포인트 컬러 */
    }
`;

const TagGuide = styled.p`
    margin-top: 24px;
    font-size: 13px;
    color: #8e8e93;
`;

const TagList = styled.div`
    margin-top: 8px;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
`;

const TagChip = styled.button<{ active: boolean }>`
    border-radius: 999px;
    padding: 6px 12px;
    border: 1px solid ${({ active }) => (active ? "#ff6a21" : "#e5e5ea")};
    background-color: ${({ active }) => (active ? "#fff5ee" : "#ffffff")};
    color: ${({ active }) => (active ? "#ff6a21" : "#8e8e93")};
    font-size: 12px;
    white-space: nowrap;
`;

const Divider = styled.div`
    margin-top: 16px;
    border-bottom: 1px solid #e5e5ea;
`;

const RowList = styled.div`
    margin-top: 8px;
    border-radius: 10px;
    background: #ffffff;
    overflow: hidden;
`;

const Row = styled.button`
    width: 100%;
    height: 52px;
    padding: 0 16px;
    border: none;
    background: #ffffff;
    display: grid;
    grid-template-columns: 80px 1fr 24px;
    align-items: center;
    text-align: left;

    & + & {
        border-top: 1px solid #f2f2f2;
    }
`;

const RowLabel = styled.span`
    font-size: 14px;
    color: #323232;
`;

const RowPlaceholder = styled.span`
    font-size: 13px;
    color: #c4c4c4;
`;

const RowRightBox = styled.div<{ colorBox?: string }>`
    justify-self: end;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: ${({ colorBox }) => colorBox || "#f2f2f2"};
`;

const BottomButton = styled.button<{ disabled?: boolean }>`
    width: 100%;
    height: 56px;
    border-radius: 12px;
    border: none;
    margin-top: 16px;
    font-size: 15px;
    font-weight: 600;

    ${({ disabled }) =>
        disabled
            ? css`
                  background: #e5e5ea;
                  color: #c4c4c4;
              `
            : css`
                  background: #ff6a21;
                  color: #ffffff;
              `}
`;

// 필요하면 외부에서 props로 제어 가능하게 인터페이스 뺄 수도 있음
const PRESET_TAGS = [
    { label: "공부 루틴", value: "STUDY" },
    { label: "건강 루틴", value: "HEALTH" },
    { label: "취업 준비", value: "JOB" },
    { label: "자율 루틴", value: "FREE" },
];

interface BigGoalSettingProps {
    setPageIndex: (arg: number) => void;
}

export default function BigGoalSetting({ setPageIndex }: BigGoalSettingProps) {
    const [goalTitle, setGoalTitle] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [tagColor, setTagColor] = useState<string | null>(null);

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openColorPicker, setOpenColorPicker] = useState(false);
    const canSubmit = goalTitle.trim().length > 0 && selectedTag && endDate;

    const { addGoal } = useGoalStore();

    const resetState = () => {
        setGoalTitle("");
        setSelectedTag(null);
        setEndDate(null);
        setTagColor(null);
    }

    const onSubmit = () => {
        addGoal(
            goalTitle,    // goalname
            false,        // delayedGoal (기본 false)
            new Date(),   // startdate (오늘)
            endDate!,     // deadline
            false,        // pinned
            false,        // hasReflection (기본 false)
            selectedTag!, // goalCategory
            tagColor,    // colorCode 기본값 예시
            "Circle",     // characterType 기본값 예시
            false         // finished 기본 false
        );
        resetState();
        setPageIndex(0);
    };

    return (
        <Wrapper>
            {/* 상단바 */}
            <TopBar>
                <BackButton
                    aria-label="뒤로가기"
                    onClick={() => setPageIndex(0)}
                >
                    ‹
                </BackButton>
                <TopTitle>큰 목표 설정</TopTitle>
            </TopBar>

            <Content>
                {/* 제목 + 썸네일 자리 */}
                <GoalTitleRow>
                    <GoalTitleBox />
                    <GoalTitleInput
                        value={goalTitle}
                        onChange={(e) => setGoalTitle(e.target.value)}
                        placeholder="큰 목표를 입력해 주세요"
                    />
                </GoalTitleRow>

                {/* 태그 프리셋 */}
                <TagGuide>큰 목표를 선택해 주세요</TagGuide>
                <TagList>
                    {PRESET_TAGS.map((tag) => (
                        <TagChip
                            key={tag.value}
                            active={selectedTag === tag.value}
                            onClick={() =>
                                setSelectedTag((prev) =>
                                    prev === tag.value ? null : tag.value
                                )
                            }
                        >
                            #{tag.label}
                        </TagChip>
                    ))}
                </TagList>

                <Divider />

                {/* 리스트 형식 옵션 */}
                <RowList>
                    <Row
                        type="button"
                        onClick={() => {
                            setOpenDatePicker(true);
                        }}
                    >
                        <RowLabel>종료 날짜</RowLabel>
                        <RowPlaceholder>
                            {endDate
                                ? endDate.toLocaleDateString("ko-KR")
                                : "목표 종료 날짜를 선택해 주세요"}
                        </RowPlaceholder>
                        <RowRightBox />
                    </Row>

                    <Row
                        type="button"
                        onClick={() => {
                            setOpenColorPicker(true);
                        }}
                    >
                        <RowLabel>태그 컬러</RowLabel>
                        <RowPlaceholder>
                            {tagColor
                                ? tagColor.toUpperCase()
                                : "태그 컬러를 선택해 주세요"}
                        </RowPlaceholder>
                        <RowRightBox colorBox={tagColor || undefined} />
                    </Row>
                </RowList>

                {/* 아래 공간 채우기용 flex 여백 */}
                <div style={{ flex: 1 }} />

                {/* 하단 버튼 */}
                <BottomButton
                    disabled={!canSubmit}
                    onClick={() => {
                        if (!canSubmit) return;
                        onSubmit();
                    }}
                >
                    큰 목표 등록하기
                </BottomButton>

                <DatePickerPopup
                    open={openDatePicker}
                    initialDate={endDate}
                    onClose={() => setOpenDatePicker(false)}
                    onConfirm={(date) => {
                        setEndDate(date);
                        setOpenDatePicker(false);
                    }}
                />

                <ColorPickerPopup
                    open={openColorPicker}
                    onClose={() => setOpenColorPicker(false)}
                    onConfirm={(color) => {
                        setTagColor(color);
                        setOpenColorPicker(false);
                    }}
                />
            </Content>
        </Wrapper>
    );
}
