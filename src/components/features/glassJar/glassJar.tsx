import JarPhysicsLayer from "@/components/features/glassJar/JarPhysicsLayer";
import styled from "@emotion/styled";
import BottleBack from "@/assets/yuribyeongBack.png";
import BottleFront from "@/assets/yuribyeongFront.png";

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

    return (
        <BottleFrame>
            <BottleBackImg src={BottleBack} />
            <PhysicsLayer>
                <JarPhysicsLayer />
            </PhysicsLayer>
            <BottleFrontImg src={BottleFront} />
        </BottleFrame>
    );
}
