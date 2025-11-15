import JarPhysicsLayer from "@/components/features/glassJar/JarPhysicsLayer";
import styled from "@emotion/styled";
import BottleBack from "@/assets/yuribyeongBack.png";
import BottleFront from "@/assets/yuribyeongFront.png";
import CircleChar from "@/assets/Chars/CircleChar.png";
import DropChar from "@/assets/Chars/DropChar.png";
import SquareChar from "@/assets/Chars/SquareChar.png";
import StarChar from "@/assets/Chars/StarChar.png";

const BottleFrame = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 394 / 551; /* 이미지 비율 유지 */
    min-width: 90vw; /* 필요하면 최대 폭 제한 */
    margin: 0 auto;

    &::before {
        content: "";
        display: block;
        padding-top: calc(551 / 394 * 100%); /* 약 139.8% */
    }
`;

const BottleBackImg = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    z-index: 1;
`;

const PhysicsLayer = styled.div`
    position: absolute;
    /* 병 테두리랑 안 겹치게 안쪽으로 살짝 inset */
    inset: 12% 16% 10% 16%;
    z-index: 2;
    overflow: hidden;
`;

const BottleFrontImg = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    z-index: 3;
`;

export default function GlassJar() {
    const completedChallenges = [
        { id: "1", label: "첫 도전 완료", imageUrl: CircleChar },
        { id: "2", label: "아침 7시 기상", imageUrl: DropChar },
        { id: "3", label: "물 2L 마시기", imageUrl: SquareChar },
        { id: "4", label: "운동 30분", imageUrl: StarChar },
        { id: "5", label: "첫 도전 완료", imageUrl: CircleChar },
        { id: "6", label: "아침 7시 기상", imageUrl: DropChar },
        { id: "7", label: "물 2L 마시기", imageUrl: SquareChar },
        { id: "8", label: "운동 30분", imageUrl: StarChar },
        { id: "9", label: "운동 30분", imageUrl: StarChar },
        { id: "10", label: "첫 도전 완료", imageUrl: CircleChar },
        { id: "11", label: "아침 7시 기상", imageUrl: DropChar },
        { id: "12", label: "물 2L 마시기", imageUrl: SquareChar },
    ];

    return (
        <BottleFrame>
            <BottleBackImg src={BottleBack} />
            <PhysicsLayer>
                <JarPhysicsLayer items={completedChallenges} />
            </PhysicsLayer>
            <BottleFrontImg src={BottleFront} />
        </BottleFrame>
    );
}
