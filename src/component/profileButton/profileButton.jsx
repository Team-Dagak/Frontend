/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function ProfileButton() {
    return(
        <div css={profile}/> 
    );
};


const profile = css`
    min-width:24px;
    min-height:24px;
    width:24px;
    height: 24px;
    background: black;
    color: black;
`