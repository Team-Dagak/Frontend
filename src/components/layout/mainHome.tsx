/** @jsxImportSource @emotion/react */
import { usePopupStore } from "@/store/usePopupStore";
import { primary } from "@/styles/colors";
import { css } from "@emotion/react";
import ButtonSample from "@/assets/ButtonSample.png";
import { FaArrowDown } from "react-icons/fa";
import { TbCalendarPause } from "react-icons/tb";
import AddBigGoal from "../features/addBigGoal/addBigGoal";
import Calendar from "../features/calendar/calendar";
import TodayChecklists from "../features/toDoList/todayChecklists";
import AddGoal from "../features/goal/addGoal";
import styled from "@emotion/styled";
import NavigationBar from "../ui/navigation/navigationBar";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-y: auto;

`

const container = css`
    width: 100%;
    height: 100%;
    margin: 0 auto 16px;
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
`;
const topBar = css`
    height: 64px;
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto 1fr auto auto;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
    gap: 7px;
`;
const mh16 = css`
    margin: 0 16px;
`;

const ph15 = css`
    padding: 0 10px;
`;

const delayedWork = css`
    font-weight: bold;
    color: ${primary};
    font-size: 20px;
`;

interface MainHome {
    setPageIndex: (arg: number) => void;
}

export default function MainHome({setPageIndex}:MainHome) {
    const PopupGoal = usePopupStore((s) => s.popupGoal);
    const clearPopupGoal = usePopupStore((s) => s.clearPopupGoal);
    return (
        <Wrapper>
            <div
                css={[
                    { paddingBottom: "88px" },
                    mh16,
                    { justifyContent: "center" },
                ]}
            >
                <div css={topBar}>
                    <img css={ph15} src={ButtonSample} /> {/* 미룬일 아이콘 */}
                    <div css={delayedWork}>미룬 일 7건</div>
                    <div css={ph15}>
                        <FaArrowDown size="20px" />
                    </div>
                    <div />
                    <TbCalendarPause size="30px" />
                    <AddBigGoal handleAddEmptyGoal={() => setPageIndex(1)} />
                </div>
                <div css={[container]}>
                    <Calendar />
                </div>
                {/*<div css={container}>
          <Carousel />
        </div>*/}
                <div css={[container]}>
                    <TodayChecklists />
                </div>

                {/* 👇 여기! 팝업은 여기서 조건부 렌더 */}
                {PopupGoal && <AddGoal onCancel={clearPopupGoal} />}
            </div>
            <NavigationBar />
        </Wrapper>
    );
}
