/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePopupStore } from "../../store/states";
// Emotion CSS
const embla = css`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const emblaContainer = css`
  display: flex;
  width: 100%;
  height: 90px;
  margin: 0;
`;

const emblaSlide = css`
  min-width: 144px;
  min-height: 90px;
  width: 100%;
  height: 100%;
  margin: 0 10px 0 0;
  background-color: #f4f4f4;
  border-radius: 10px;
  `;

const textTitle = css`
  margin: 10px 10px 0 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const textDescription = css`
  margin: 10px 10px 0 10px;
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const title = css`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const data = [
  {
    id: 1,
    recommendation: '토익',
    explanation: '설명1',
  },
  {
    id: 2,
    recommendation: 'OPIC',
    explanation: '설명2',
  },
  {
    id: 3,
    recommendation: '추천 3',
    explanation: '설명3',
  },
  {
    id: 4,
    recommendation: '추천 4',
    explanation: '설명 4',
  },
  {
    id: 5,
    recommendation: '추천 5',
    explanation: '설명 5',
  },
];
function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const setPopupGoal = usePopupStore((state) => state.setPopupGoal);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  // + 버튼: 직접 입력용 모달 (빈 값)
  const handleAddEmptyGoal = () => {
    console.log("Clicked!"); // 클릭 확인
    setPopupGoal({ recommendation: ""});
  };

  // 추천 클릭: 추천값으로 모달
  const handleSelectGoal = (item) => {
    console.log("Clicked!", item); // 클릭 확인
    setPopupGoal(item);
  };
  

  return (
    <div css={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <p css={title}>목표를 세워볼까요?</p>
        <button
          style={{
            marginLeft: 8,
            fontSize: "1.2rem",
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
          onClick={handleAddEmptyGoal}
        >
          +
        </button>
      </div>
      <div css={embla} ref={emblaRef}>
        <div css={emblaContainer}>
          {data.map((item) => (
            <div
              key={item.id}
              css={emblaSlide}
              onClick={() => handleSelectGoal(item)}
              style={{ cursor: "pointer" }}
            >
              <p css={textTitle}>{item.recommendation}</p>
              <p css={textDescription}>{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Carousel;