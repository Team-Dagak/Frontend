import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

const ArticleStyel = css`
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 393px;
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
`

const Article = ({children}) => {
    return <article>{children}</article>
}

export default Article;