/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import useEmblaCarousel from "embla-carousel-react";
import { css } from "@emotion/react";
import { gray10, grayMain } from "@/styles/colors";
import { useChecklistStore } from "@/store/useChecklistStore";
import { useChecklistCountStore } from "@/store/useChecklistCountStore";
import { useGoalStore } from "@/store/useGoalStore";

const Bar = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    align-items: center;
`;

const FilterButton = styled.button<{ active: boolean }>`
    padding: 0.4rem 0.8rem;
    background: ${(props) => (props.active ? grayMain : gray10)};
    color: ${(props) => (props.active ? "white" : grayMain)};
    animation: ${(props) =>
        props.active ? "pop-in 0.25s ease-out" : "pop-out 0.25s ease-in"};
    transition: background 0.3s ease;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
`;

const embla = css`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const emblaContainer = css`
    display: flex;
    width: 100%;
    margin: 0;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
`;

const PRESET_TAGS = [
    { label: "공부 루틴", value: "STUDY" },
    { label: "건강 루틴", value: "HEALTH" },
    { label: "취업 준비", value: "JOB" },
    { label: "자율 루틴", value: "FREE" },
];

export default function FilterBar() {
    const Checklists = useChecklistStore((state) => state.checklist);
    const { type, setType } = useFilterStore();
    const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
    const { totalCount, setTotalCount } = useChecklistCountStore();

    const goals = useGoalStore((state) => state.goals); // goal 목록

    useEffect(() => {

        setTotalCount(goals.length);
    }, [Checklists, goals, setTotalCount]);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};

        // 사전 초기화 (옵션)
        PRESET_TAGS.forEach((tag) => {
            counts[tag.value] = 0;
        });

        for (const goal of goals) {
            // goal.category 가 "STUDY" | "HEALTH" | "JOB" | "FREE" 라고 가정
            const tagValue = goal.category as string | undefined;
            if (!tagValue) continue;

            counts[tagValue] = (counts[tagValue] ?? 0) + 1;
        }

        return counts;
    }, [goals]);

    return (
        <Bar css={embla} ref={emblaRef}>
            <div css={emblaContainer}>
                <FilterButton
                    active={type === "All"}
                    onClick={() => setType("All")}
                    css={{ fontWeight: "400" }}
                >
                    전체 {totalCount}건
                </FilterButton>
                {PRESET_TAGS.map((cat) => (
                    <FilterButton
                        key={cat.value}
                        active={type === cat.value}
                        onClick={() => setType(cat.value)}
                        css={{ fontWeight: "400" }}
                    >
                        #{cat.label} {tagCounts[cat.value]}건
                    </FilterButton>
                ))}
            </div>
        </Bar>
    );
}
