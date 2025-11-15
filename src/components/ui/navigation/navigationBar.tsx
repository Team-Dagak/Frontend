import styled from "@emotion/styled";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiClothJar } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Bar = styled.div`
    height: 88px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 1000;
`

const ItemPod = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

export default function NavigationBar() {
    const navigate = useNavigate();

    return (
        <Bar>
            <ItemPod>
                <IoHomeOutline size="40px" onClick={() => navigate("/")}/>
            </ItemPod>
            <ItemPod>
                <GiClothJar size="40px" onClick={() => navigate("/yuribyeong")}/>
            </ItemPod>
            <ItemPod>
                <FaRegCircleUser size="40px"/>
            </ItemPod>
        </Bar>
    )
}