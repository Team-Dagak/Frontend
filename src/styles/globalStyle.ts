import { css } from '@emotion/react';

export const globalStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Pretendard;
    }

    html {
    -webkit-tap-highlight-color: transparent;
    }

    body {
    background-color: #f4f4f4;
    overflow-x: hidden;
    box-sizing: border-box;
    display:flex;
    justify-content: center;
    }
`