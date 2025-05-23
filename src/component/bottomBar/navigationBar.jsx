/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { GiClothJar } from "react-icons/gi"
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

const bar = css`
    height:88px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: white;
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    z-index: 1000;
`

const itemPod = css`
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`


export default function NavigationBar() {
    return (
        <div css={bar}>
            <div css={itemPod}>
                <IoHomeOutline size="40px"/>
            </div>
            <div css={itemPod}>
                <GiClothJar size="40px"/>
            </div>
            <div css={itemPod}>
                <FaRegCircleUser size="40px"/>
            </div>
        </div>
    )
}