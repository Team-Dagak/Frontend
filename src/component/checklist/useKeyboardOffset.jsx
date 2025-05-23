import { useEffect, useState } from "react";

function getPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  return "web";
}

export default function useKeyboardOffset() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const platform = getPlatform();

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const newHeight = window.innerHeight;
      const offset = initialHeight - newHeight;

      // 플랫폼 별 최소 키보드 높이 설정
      const threshold = platform === "ios" ? 100 : 150;

      if (offset > threshold) {
        setKeyboardHeight(offset);
      } else {
        setKeyboardHeight(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [platform]);

  return keyboardHeight;
}
