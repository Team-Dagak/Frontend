import { useEffect, useState } from "react";

export default function useSmartKeyboardOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const newOffset = initialHeight - viewportHeight;

      // 100px 이상 줄어들면 키보드로 판단
      setOffset(newOffset > 100 ? newOffset : 0);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return offset;
}