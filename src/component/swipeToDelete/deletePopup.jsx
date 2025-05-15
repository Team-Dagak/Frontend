/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"


const container = css `
    display: flex;
    flex-direction: column;
    width: 361px;
    height: 226px;
    padding: 18px;
`

const giveUp = css`
    
`

const explanation = css`
    
`

const choice = css`
    display:grid;
    grid-template: 1fr 1fr;
`

const Retry = styled.button`
    width:16px;
    height:12px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 12px;
    background-color: white;
    color: #1a1c20;
`

const Retire = styled.button`
    width:16px;
    height:12px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 12px;
    background-color: #1A1C20;
    color: white;
`

export default function DeletePopup() {
    {/*TODO: UseState로 Zustand 이용해서 삭제하려는 항목의 '제목' '카테고리' 전달받기*/}
    <div css={container}>
        <div css={giveUp}>

        </div>
        <div css={explanation}>

        </div>
        <div css={choice}>
            <Retry>다시 생각해볼래요</Retry>
            <Retire>네, 삭제할래요</Retire>
        </div>
    </div>
}