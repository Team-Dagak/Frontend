import type { ReactNode } from "react";

interface ArticleProps {
    children: ReactNode;
}

export default function Article({children}:ArticleProps){
    return (
        <article>
            {children}
        </article>
    )
}