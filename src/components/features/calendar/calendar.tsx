/** @jsxImportSource @emotion/react */
import { useCalendarStore } from "@/store/useCalendarStore";
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";

type CalendarStatus = "none" | "done" | "todo";

export interface CalendarProps {
    /** 완료한 날짜 리스트 (YYYY-MM-DD) */
    doneDates?: string[];
    /** 미완료 날짜 리스트 (YYYY-MM-DD) */
    todoDates?: string[];
    /** 오늘 날짜 기준 (테스트용으로 바꾸고 싶을 때만 사용) */
    today?: Date;
    /** 외부에서 레이아웃 잡을 수 있게 className 허용 */
    className?: string;
    onSelectDate?: (date: Date) => void;
}

const PRIMARY = "#FF8442";
const PRIMARYCLICK = "#FF620D";
const TEXT_MAIN = "#111111";
const PRIMARYBORDER = "#E6E7EA";
const DARK = "#1A1C20";

const headerTop = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    .greeting {
        font-size: min(4vw, 24px);
        font-weight: 600;
        color: ${TEXT_MAIN};
        margin-bottom: 4px;
    }

    .today-text {
        font-size: min(4vw, 24px);
        font-weight: 600;
        color: ${TEXT_MAIN};
    }

    .today-text span {
        color: ${PRIMARY};
    }
`;

const navButtons = css`
    display: flex;
    gap: 6px;
    button {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
    }
`;

const weekHeader = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 11px;
    text-align: center;
    color: #999;
`;

const grid = css`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 6px;
    width: 100%;
`;

const dayCell = (
    inMonth: boolean,
    status: CalendarStatus,
    isToday: boolean,
    isSelected: boolean
) => {
    let bg = "#ffffff";
    let color = isSelected ? PRIMARY : TEXT_MAIN;
    let border = isSelected ? `1px solid ${PRIMARY} ` : `1px solid ${PRIMARYBORDER}`;
    let boxShadow = "none";
    
    if (status === "done") {
        bg = DARK;
        color = "#ffffff";
        border = "none";
        if (isSelected) {
            border = `1px solid ${PRIMARY}`;
            color = PRIMARY;
        }
    } else if (status === "todo") {
        bg = "#f3f3f7";
        color = TEXT_MAIN;
        border = "none";
        if (isSelected) {
            border = `1px solid ${PRIMARY}`;
            color = PRIMARY;
        }
    }

    if (isToday) {
        bg = PRIMARY;
        color = "#ffffff";
        border = "none";
        boxShadow = "0 6px 12px rgba(255, 106, 0, 0.4)";
        if (isSelected) {
            bg = PRIMARYCLICK;
            color = DARK;
        }
    }

    if (!inMonth) {
        color = "#757E8F";
        bg = "#CACDD4";
    }

    return css`
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 10px;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        background: ${bg};
        color: ${color};
        border: ${border};
        box-shadow: ${boxShadow};
        cursor: ${inMonth ? "pointer" : "default"};
        user-select: none;
    `;
};

const legend = css`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
    font-size: 10px;
    color: #777;

    .item {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 4px;
    }
`;

function formatKey(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export default function Calendar({
    today: todayProp,
    className,
    onSelectDate,
}: CalendarProps) {
    const today = todayProp ?? new Date();
    const [viewDate, setViewDate] = useState<Date>(today);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const { weeks } = useMemo(() => {
        const y = viewDate.getFullYear();
        const m = viewDate.getMonth(); // 0~11

        const first = new Date(y, m, 1);
        const firstDay = first.getDay(); // 0(일)~6(토)

        const start = new Date(y, m, 1 - firstDay); // 첫 주의 일요일
        const weeksArr: Date[] = [];

        for (let i = 0; i < 42; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            weeksArr.push(d);
        }

        return { weeks: weeksArr, month: m + 1, year: y };
    }, [viewDate]);

    const todayKey = formatKey(today);
    const viewMonth = viewDate.getMonth();

    const todayMonthNumber = today.getMonth() + 1;
    const todayDateNumber = today.getDate();

    const { fetchCalendarInfo } = useCalendarStore();
    const calendarInfo = useCalendarStore((state) => state.calendar);

    const { doneSet, todoSet } = useMemo(() => {
        const done = new Set<string>();
        const todo = new Set<string>();

        if (!calendarInfo || !calendarInfo.days) {
            return { doneSet: done, todoSet: todo };
        }

        // 서버가 이미 해당 month만 주면 month 체크는 생략해도 됨
        Object.entries(calendarInfo.days).forEach(([dateKey, info]) => {
            // dateKey: "YYYY-MM-DD"
            const { cleared, total } = info;

            if (total <= 0) {
                // 목표가 아예 없는 날이면 색 안 칠함
                return;
            }

            if (cleared >= total) {
                // 전부 완료 ⇒ done
                done.add(dateKey);
            } else {
                // 일부만 완료 또는 전부 미완료 ⇒ todo
                todo.add(dateKey);
            }
        });

        return { doneSet: done, todoSet: todo };
    }, [calendarInfo]);

    useEffect(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + 1;
        fetchCalendarInfo(year, month);
    }, [fetchCalendarInfo, viewDate]);

    const goPrev = () =>
        setViewDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    const goNext = () =>
        setViewDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );

    return (
        <div className={className}>
            <div css={headerTop}>
                <div css={{ textAlign: "left" }}>
                    <div className="greeting">안녕하세요:)</div>
                    {/* ✅ 여기서는 항상 "실제 오늘" 기준 */}
                    <div className="today-text">
                        오늘은 <span>{todayMonthNumber}</span>월{" "}
                        <span>{todayDateNumber}</span>일이에요
                    </div>
                </div>
                <div css={navButtons}>
                    <button type="button" onClick={goPrev}>
                        {"<"}
                    </button>
                    <button type="button" onClick={goNext}>
                        {">"}
                    </button>
                </div>
            </div>

            <div css={weekHeader}>
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>

            <div css={grid}>
                {weeks.map((d) => {
                    const key = formatKey(d);
                    const inMonth = d.getMonth() === viewMonth;
                    const isToday = key === todayKey;
                    let status: CalendarStatus = "none";
                    if (doneSet.has(key)) status = "done";
                    else if (todoSet.has(key)) status = "todo";

                    return (
                        <div
                            key={key}
                            css={dayCell(
                                inMonth,
                                status,
                                isToday,
                                key === selectedDate
                            )}
                            onClick={() => {
                                if (inMonth) {
                                    if(selectedDate === key){
                                        setSelectedDate(null);
                                    } else {
                                        setSelectedDate(key);
                                    } // 선택된 날짜 저장
                                    onSelectDate?.(d);
                                }
                            }}
                        >
                            {d.getDate()}
                        </div>
                    );
                })}
            </div>

            <div css={legend}>
                <div className="item">
                    <span
                        className="dot"
                        style={{
                            background: "#f3f3f7",
                        }}
                    />
                    미완료
                </div>
                <div className="item">
                    <span
                        className="dot"
                        style={{
                            background: DARK,
                        }}
                    />
                    완료
                </div>
                <div className="item">
                    <span
                        className="dot"
                        style={{
                            background: PRIMARY,
                        }}
                    />
                    오늘
                </div>
            </div>
        </div>
    );
}
