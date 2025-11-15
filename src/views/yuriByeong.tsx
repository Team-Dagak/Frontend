import styled from "@emotion/styled";
import GlassJar from "@/components/features/glassJar/glassJar";
import NavigationBar from "@/components/ui/navigation/navigationBar";
import ReviewCard from "@/components/features/reviewList/reviewList";

const reviewHistorySample = [
    {
        period: "25.10.01~25.10.31",
        goalName: "큰일큰일큰일",
        review: {
            label: "뿌듯해요",
            value: "PROUD",
        },
    },
    {
        period: "25.10.01~25.10.31",
        goalName: "큰일큰일큰일",
        review: {
            label: "여유로웠어요",
            value: "RELAXED",
        },
    },
    {
        period: "25.10.01~25.10.31",
        goalName: "큰일큰일큰일",
        review: {
            label: "도전적이었어요",
            value: "CHALLENGING",
        },
    },
] as const;

const PageWrapper = styled.div`
    width: 90vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center; /* 가로 가운데 */
    align-items: center; /* 세로 가운데 */
    padding-bottom: 90px;
`;

// 기존 OuterWrapper는 좌우 여백만 담당하게
const OuterWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const ReviewSection = styled.div`
    background-color: white;
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default function YuriByeong() {
    return (
        <PageWrapper>
            <ContentWrapper>
                <OuterWrapper>
                    <GlassJar />
                    <ReviewSection>
                        <h3>이번 회고 구경하기</h3>
                        {reviewHistorySample.map((item, idx) => (
                            <ReviewCard
                                key={idx}
                                Reviewitem={item}
                                onSubmit={(value) => {
                                    console.log("server send:", value);
                                }}
                            />
                        ))}
                    </ReviewSection>
                </OuterWrapper>
            </ContentWrapper>
            <NavigationBar />
        </PageWrapper>
    );
}
