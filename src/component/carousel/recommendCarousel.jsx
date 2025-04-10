/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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
  width: 144px;
  height: 90px;
  margin: 0 10px 0 0;
  background-color: #f4f4f4;
  border-radius: 8px;
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

const data = [
  {
    id: 1,
    recommendation: 'recommend 1',
    explanation: 'explanation 1 ipsem loran dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    recommendation: 'recommend 2',
    explanation: 'explanation 2 ipsem loran dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    recommendation: 'recommend 3',
    explanation: 'explanation 3 ipsem loran dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  return (
    <div css={embla} ref={emblaRef}>
      <div css={emblaContainer}>
        {data.map((item) => (
          <div key={item.id} css={emblaSlide}>
            <p css={textTitle}>{item.recommendation}</p>
            <p css={textDescription}>{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
