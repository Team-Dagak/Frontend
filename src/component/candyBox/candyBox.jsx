/** @jsxImportSource @emotion/react */
import {useEffect, useRef} from 'react';
import { css } from '@emotion/react';
import Matter from 'matter-js';

const canvasStyle = css`
    width: 100%;
    height: 500px;
    min-height: 500px;
    border: 2px solid #ff69b4;
    background: #fffbe6;
`;

const CandyBox = () => {
    const sceneRef = useRef(null);
    const engine = useRef(Matter.Engine.create());
    const render = useRef(null);
    const runner = useRef(null);

    useEffect(() => {
        const cw = sceneRef.current.clientWidth;
        const ch = sceneRef.current.clientHeight;

        const world = engine.current.world;
        engine.current.gravity.y = 1; //중력 설정
        
        //캔버스 랜더링 설정
        render.current = Matter.Render.create({
            element: sceneRef.current,
            engine: engine.current,
            options:{
                width: cw,
                height: ch,
                wireframes: false,
                background: '#fffbe6',
            },
        });

        //바닥, 벽 설정
        const floor = Matter.Bodies.rectangle(cw / 2, ch, cw, 20, { isStatic: true});
        const leftWall = Matter.Bodies.rectangle(0, ch / 2, 20, ch, { isStatic: true});
        const rightWall = Matter.Bodies.rectangle(cw, ch / 2, 20, ch, { isStatic: true});
    
        Matter.World.add(world, [floor, leftWall, rightWall]);

        //사탕 생성
        const candies = Array.from({length:10}).map(() => 
            Matter.Bodies.circle(
                Math.random() * cw,
                Math.random() * 100,
                20,
                {
                    restitution: 0.9,
                    render: {
                        fillStyle: `hsl(${Math.random() * 360}, 80%, 60%)`,
                    },
                }
            )
        );
        
        Matter.World.add(world, candies);

        Matter.Events.on(engine.current, 'beforeUpdate', () => {
            const maxSpeed = 20;
            candies.forEach((candy) => {
                const velocity = candy.velocity;
                const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
                if (speed > maxSpeed){
                    const scale = maxSpeed/speed;
                    Matter.Body.setVelocity(candy, {
                        x: velocity.x * scale,
                        y: velocity.y * scale,
                    });
                }
            });
        });
        

        //마우스 상호작용
        const mouse = Matter.Mouse.create(render.current.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine.current, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        Matter.World.add(engine.current.world, mouseConstraint);


        //자이로센서 상호작용
        const handelMotion = (event) => {
            const acc = event.accelerationincludingGravity;

            //가속도 값 정규화
            candies.forEach((candy) => {
                Matter.Body.applyForce(candy, candy.position, {
                    x: acc.x * 0.001,
                    y: -acc.y * 0.001
                });
            });
        };

        window.addEventListener('devicemotion', handelMotion, true);

        //시작
        runner.current = Matter.Runner.create();
        Matter.Runner.run(runner.current, engine.current);
        Matter.Render.run(render.current);

        //정리
        return () => {
            Matter.Render.stop(render.current);
            Matter.Runner.stop(runner.current);
            Matter.World.clear(world);
            Matter.Engine.clear(engine.current);
            render.current.canvas.remove();
            render.current.textures = {};
            window.removeEventListener('devicemotion', handelMotion);
        };
    }, [])

    return <div css={canvasStyle} ref={sceneRef} />
};

export default CandyBox;