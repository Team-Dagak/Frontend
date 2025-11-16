/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import styled from "@emotion/styled";
import { useReviewStore } from "@/store/useReviewStore";
import CircleChar from '@/assets/Chars/CircleChar.png';


const ChipImage = styled.img`
    position: absolute;
    width: 100px;
    height: 100px;
    transform-origin: center center;
    pointer-events: none;
`;

interface ChipState {
    id: number;
    label: string;
    x: number;
    y: number;
    angle: number;
    imageUrl: string;
}

export default function JarPhysicsLayer() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [chipStates, setChipStates] = useState<ChipState[]>([]);
    const reviews = useReviewStore((state) => state.reviews);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const { Engine, World, Bodies, Runner } = Matter;

        const engine = Engine.create({
            gravity: { x: 0, y: 1, scale: 0.0015 },
        });
        const runner = Runner.create();

        const width = container.clientWidth;
        const height = container.clientHeight;

        // --- 병 내부 벽/바닥 만들기 (대충 캡슐 안쪽 느낌) ---
        const paddingX = width * 0.06;
        const paddingTop = height * 0.03;

        const floor = Bodies.rectangle(
            width / 2,
            height - 14,
            width - paddingX * 1.1,
            28,
            {
                isStatic: true,
                restitution: 0.3,
                friction: 0.9,
            }
        );

        const leftWall = Bodies.rectangle(
            paddingX / 2,
            height / 2,
            20,
            height,
            { isStatic: true }
        );
        const rightWall = Bodies.rectangle(
            width - paddingX / 2,
            height / 2,
            20,
            height,
            { isStatic: true }
        );

        World.add(engine.world, [floor, leftWall, rightWall]);

        // --- 칩들 생성 ---
        const chipRadius = 32;
        const chipBodies = reviews.map((item, index) =>
            Bodies.circle(
                width / 2 + (Math.random() - 0.5) * 40,
                paddingTop + index * 5,
                chipRadius,
                {
                    restitution: 0.6,
                    friction: 0.1,
                    frictionAir: 0.02,
                    label: item.goalId,
                }
            )
        );

        World.add(engine.world, chipBodies);

        // --- 애니메이션 루프 ---
        let frameId: number;

        const update = () => {
            const nextStates: ChipState[] = chipBodies.map((body, i) => ({
                id: reviews[i].goalId!,
                label: reviews[i].goalname!,
                x: body.position.x,
                y: body.position.y,
                angle: body.angle,
                imageUrl: CircleChar,
            }));

            setChipStates(nextStates);
            frameId = requestAnimationFrame(update);
        };

        Runner.run(runner, engine);
        update();

        // --- 정리 ---
        return () => {
            cancelAnimationFrame(frameId);
            Runner.stop(runner);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        };
    }, [reviews]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            {chipStates.map((chip) => (
                <ChipImage
                    key={chip.id}
                    src={chip.imageUrl}
                    style={{
                        left: chip.x,
                        top: chip.y,
                        transform: `translate(-50%, -50%) rotate(${chip.angle}rad)`,
                    }}
                />
            ))}
        </div>
    );
}
