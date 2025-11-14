/** @jsxImportSource @emotion/react */
import ModalPortal from "@/components/layout/modalPortal";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

interface DatePickerPopupProps {
    open: boolean;
    initialDate?: Date | null;
    onClose: () => void;
    onConfirm: (date: Date | null) => void;
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 3000;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Popup = styled.div`
    width: 100%;
    border-radius: 16px 16px 0 0;
    background: #b3b3b3;
    padding: 16px 24px;
    box-sizing: border-box;
    animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const LabelLeft = styled.label`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #222;
`;

const CloseButton = styled.button`
    border-radius: 999px;
    padding: 4px 10px;
    border: 1px solid #ddd;
    background: #f5f5f5;
    font-size: 12px;
`;

const PickerWrapper = styled.div`
    margin: 8px 0 18px;
    background: #fff;
    border-radius: 12px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    gap: 12px;
`;

const ITEM_HEIGHT = 32;
const VISIBLE_ROWS = 3;
const PAD_COUNT = Math.floor(VISIBLE_ROWS / 2);

const Column = styled.div`
    width: 70px;
    height: ${VISIBLE_ROWS * ITEM_HEIGHT}px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    text-align: center;
    font-size: 18px;
    color: #999;

    /* 스크롤바 제거 (모바일 느낌) */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Item = styled.div<{ selected: boolean }>`
    height: ${ITEM_HEIGHT}px;
    line-height: ${ITEM_HEIGHT}px;
    scroll-snap-align: center;
    color: ${({ selected }) => (selected ? "#000" : "#c4c4c4")};
    font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;

const ConfirmButton = styled.button`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: none;
    background: #ff6a00;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
`;

// ──────────────────────────────────────────────

export default function DatePickerPopup({
    open,
    initialDate,
    onClose,
    onConfirm,
}: DatePickerPopupProps) {
    const base = initialDate ?? new Date();
    const [year, setYear] = useState(base.getFullYear());
    const [month, setMonth] = useState(base.getMonth() + 1); // 1~12
    const [day, setDay] = useState(base.getDate());
    const hasEndDate = true;

    const yearRef = useRef<HTMLDivElement | null>(null);
    const monthRef = useRef<HTMLDivElement | null>(null);
    const dayRef = useRef<HTMLDivElement | null>(null);

    const months = useMemo(
        () => Array.from({ length: 12 }, (_, i) => i + 1),
        []
    );
    const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
    const years = useMemo(() => {
        const anchor = (initialDate ?? new Date()).getFullYear();
        return Array.from({ length: 20 }, (_, i) => anchor - 5 + i);
    }, [initialDate]);

    const pad = useMemo(
        () => Array.from({ length: PAD_COUNT }).map(() => null),
        []
    );

    const displayYears = useMemo(
        () => [...pad, ...years, ...pad] as (number | null)[],
        [pad, years]
    );
    const displayMonths = useMemo(
        () => [...pad, ...months, ...pad] as (number | null)[],
        [pad, months]
    );
    const displayDays = useMemo(
        () => [...pad, ...days, ...pad] as (number | null)[],
        [pad, days]
    );

    const scrollToValue = (
        ref: React.RefObject<HTMLDivElement>,
        displayValues: (number | null)[],
        value: number
    ) => {
        if (!ref.current) return;

        const displayIndex = displayValues.findIndex((v) => v === value);
        if (displayIndex < 0) return;

        // 중앙 줄에 오도록: topIndex = displayIndex - PAD_COUNT
        const topIndex = displayIndex - PAD_COUNT;
        const scrollTop = topIndex * ITEM_HEIGHT;

        ref.current.scrollTo({
            top: scrollTop,
            behavior: "auto",
        });
    };

    useLayoutEffect(() => {
        if (!open) return;

        const base = initialDate ?? new Date();
        const y = base.getFullYear();
        const m = base.getMonth() + 1;
        const d = base.getDate();

        setYear(y);
        setMonth(m);
        setDay(d);

        // 포탈/애니메이션까지 전부 DOM에 반영된 다음에 스크롤
        const timer = window.setTimeout(() => {
            scrollToValue(yearRef, displayYears, y);
            scrollToValue(monthRef, displayMonths, m);
            scrollToValue(dayRef, displayDays, d);
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [open, initialDate, displayYears, displayMonths, displayDays]);

    const makeScrollHandler =
        (values: (number | null)[], setter: (v: number) => void) =>
        (e: React.UIEvent<HTMLDivElement>) => {
            const scrollTop = e.currentTarget.scrollTop;
            const topIndex = Math.round(scrollTop / ITEM_HEIGHT);
            const centerIndex = topIndex + PAD_COUNT; // 가운데 줄 index
            const value = values[centerIndex];
            if (value != null) {
                setter(value);
            }
        };

    const handleConfirm = () => {
        if (!hasEndDate) {
            onConfirm(base); // or null 처리 등 원하는대로
            return;
        }
        const selected = new Date(year, month - 1, day);
        onConfirm(selected);
    };

    if (!open) return null;

    return (
        <ModalPortal>
            <Overlay>
                <Popup>
                    <Header>
                        <LabelLeft>종료 날짜</LabelLeft>
                        <CloseButton onClick={onClose}>닫기</CloseButton>
                    </Header>
                    {hasEndDate && (
                        <PickerWrapper>
                            {/* 연도 */}
                            <Column
                                ref={yearRef}
                                onScroll={makeScrollHandler(
                                    displayYears,
                                    setYear
                                )}
                            >
                                {displayYears.map((y, idx) => (
                                    <Item
                                        key={idx}
                                        selected={y === year}
                                        onClick={() => y && setYear(y)}
                                    >
                                        {y ?? ""}
                                    </Item>
                                ))}
                            </Column>

                            {/* 월 */}
                            <Column
                                ref={monthRef}
                                onScroll={makeScrollHandler(
                                    displayMonths,
                                    setMonth
                                )}
                            >
                                {displayMonths.map((m, idx) => (
                                    <Item
                                        key={idx}
                                        selected={m === month}
                                        onClick={() => m && setMonth(m)}
                                    >
                                        {m != null
                                            ? String(m).padStart(2, "0")
                                            : ""}
                                    </Item>
                                ))}
                            </Column>

                            {/* 일 */}
                            <Column
                                ref={dayRef}
                                onScroll={makeScrollHandler(
                                    displayDays,
                                    setDay
                                )}
                            >
                                {displayDays.map((d, idx) => (
                                    <Item
                                        key={idx}
                                        selected={d === day}
                                        onClick={() => d && setDay(d)}
                                    >
                                        {d != null
                                            ? String(d).padStart(2, "0")
                                            : ""}
                                    </Item>
                                ))}
                            </Column>
                        </PickerWrapper>
                    )}

                    <ConfirmButton onClick={handleConfirm}>
                        선택하기
                    </ConfirmButton>
                </Popup>
            </Overlay>
        </ModalPortal>
    );
}
