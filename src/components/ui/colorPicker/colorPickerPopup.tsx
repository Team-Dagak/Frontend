/** @jsxImportSource @emotion/react */
import ModalPortal from "@/components/layout/modalPortal";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorPickerPopupProps {
    open: boolean;
    initialColor?: string;
    onClose: () => void;
    onConfirm: (color: string) => void;
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 3000;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Popup = styled.div`
    width: 100%;
    border-radius: 16px 16px 0 0;
    background: #b3b3b3;
    padding: 16px 24px;
    box-sizing: border-box;
    animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const LabelLeft = styled.label`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #222;
`;

const CloseButton = styled.button`
    border-radius: 999px;
    padding: 4px 10px;
    border: 1px solid #ddd;
    background: #f5f5f5;
    font-size: 12px;
`;

const PickerWrapper = styled.div`
    margin: 8px 0 12px;
    background: transparent;
    border-radius: 12px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
`;

const ColorPreview = styled.div<{ color: string }>`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: ${({ color }) => color};
`;

const FullWidthColorPicker = styled(HexAlphaColorPicker)`
    width: 100% !important;
`

const ConfirmButton = styled.button`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: none;
    background: #ff6a00;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
`;

// ──────────────────────────────────────────────

export default function ColorPickerPopup({
    open,
    initialColor = "#ffffff",
    onClose,
    onConfirm,
}: ColorPickerPopupProps) {
    const [color, setColor] = useState(initialColor);

    useEffect(() => {
        if (open) setColor(initialColor);
    }, [open, initialColor]);

    const handleConfirm = () => {
        onConfirm(color);
    };

    if (!open) return null;

    return (
        <ModalPortal>
            <Overlay>
                <Popup>
                    <Header>
                        <LabelLeft>색상 선택</LabelLeft>
                        <CloseButton onClick={onClose}>닫기</CloseButton>
                    </Header>
                    <PickerWrapper>
                        <FullWidthColorPicker
                            color={color}
                            onChange={setColor}
                        />
                        <ColorPreview color={color}/>
                    </PickerWrapper>
                    <ConfirmButton onClick={handleConfirm}>
                        색상 적용
                    </ConfirmButton>
                </Popup>
            </Overlay>
        </ModalPortal>
    );
}
