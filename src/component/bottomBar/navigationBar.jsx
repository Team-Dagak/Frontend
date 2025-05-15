/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"

const bar = css`
    height:88px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 4fr 1fr;
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

const button = css`
    height: 36px;
    width: 36px;
    background: black;
    border-radius: 50%;
    
`

export default function NavigationBar() {
    return (
        <div css={bar}>
            <div css={itemPod}>
                <div css={button}/>
            </div>
            <div css={itemPod}>
                <div css={button}/>
            </div>
            <div css={itemPod}>
                <div css={button}/>
            </div>
        </div>
    )
}