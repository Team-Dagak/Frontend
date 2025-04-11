import { css } from '@emotion/react';

export const globalStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
    -webkit-tap-highlight-color: transparent;
    }

    body {
    background-color: #f4f4f4;
    overflow-x: hidden;
    }
`