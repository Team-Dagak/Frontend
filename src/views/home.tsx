import BigGoalSetting from "@/components/features/goal/bigGoalSetting";
import MainHome from "@/components/layout/mainHome";
import styled from "@emotion/styled";
import { useState } from "react";

const Wrapper = styled.div`
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;

const Panel = styled.div`
    width: 200vw;
    height: 100%;
    overflow: hidden;
`;

const AnimatedArea = styled.div<{ pageIndex: number }>`
    width: 200vw;
    height: 100vh;
    display: flex;
    transition: transform 0.35s ease-out;
    transform: translateX(${({ pageIndex }) => pageIndex * -50}%);
`;

export default function Home() {
    const [pageIndex, setPageIndex] = useState(0);

    return (
        <Wrapper>
            <Panel>
                <AnimatedArea pageIndex={pageIndex}>
                    <MainHome setPageIndex={setPageIndex} />
                    <BigGoalSetting setPageIndex={setPageIndex}/>
                </AnimatedArea>
            </Panel>
        </Wrapper>
    );
}
