/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { type ReviewValue } from "./reviewOptions";
import CircleChar from "@/assets/Chars/reviewCharCircle.png";

interface ReviewItem {
    period: string; // "25.10.01~25.10.31"
    goalName: string;
    review: {
        label: string;
        value: "PROUD" | "RELAXED" | "CHALLENGING";
    } | null;
}
interface ReviewCardProps {
    Reviewitem: ReviewItem;
    initialValue?: ReviewValue | null;
    onSubmit?: (value: ReviewValue) => void;
}

export default function ReviewCard({ Reviewitem }: ReviewCardProps) {
    const { period, goalName, review } = Reviewitem;

    return (
        <Container>
            <CharImgContainer>
                <CharImg src={CircleChar} />
            </CharImgContainer>

            <CardWrapper>
                <div>
                    <Header>{period}</Header>
                    <GoalName>#{goalName}</GoalName>
                </div>

                <OptionsWrapper>
                    <OptionButton>{review!.label}</OptionButton>
                </OptionsWrapper>
            </CardWrapper>
        </Container>
    );
}

/* ----------------------------- styles ----------------------------- */

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const CharImg = styled.img`
    width: auto;
    height: auto;
    object-fit: none;
`;

const CharImgContainer = styled.div`
    border-radius: 999px;
    color: #fe8f5b;
    width: fit-content;
    aspect-ratio: 1/1;

    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-radius: 16px;
    background: #fff6f1;
    justify-content: space-between;
    width: 100%;
`;

const Header = styled.div`
    color: #666;
    font-size: 14px;
`;

const GoalName = styled.div`
    margin-top: 6px;
    font-weight: bold;
    font-size: 16px;
`;

const OptionsWrapper = styled.div`
    display: flex;
    margin-top: 12px;
    gap: 8px;
    flex-wrap: wrap;
`;

const OptionButton = styled.button`
    padding: 6px 12px;
    border-radius: 12px;
    border: none;
    background: #f1f1f5;
    color: #333;
    cursor: pointer;
    transition: 0.2s;
`;
