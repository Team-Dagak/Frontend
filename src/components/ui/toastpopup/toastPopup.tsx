import styled from "@emotion/styled";
import { useToastStore } from "@/store/useToastStore";

const ToastPopup = styled.div<{ toast: boolean }>`
  position: fixed;
  left: 50%;
  transform: ${({ toast }) =>
    toast ? "translate(-50%, 50%)" : "translate(-50%, -250%)"};
  transition: transform 0.2s ease-in-out;

  width: fit-content;
  height: 22px;
  box-sizing: border-box;
  padding: 20px 20px;
  background-color: #000000dd;
  backdrop-filter: blur(20px);
  border: 1px solid gray;
  color: white;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: Pretendard;
  z-index: 100000;
`;

const Toast: React.FC = () => {
  const { message, visible } = useToastStore();
  return (
    <ToastPopup toast={visible} role="alert" aria-live="assertive">
      {message}
    </ToastPopup>
  );
};

export default Toast;