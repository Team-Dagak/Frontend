export interface DeletePopupPayload {
    goalId?: number; // 선택: 실제 삭제 API용 식별자
    goalName: string; // UI 표기
    checkListId?: number; // 선택
    checkListName: string; // UI 표기
}

// store/useDeletePopupStore.ts
import { create } from "zustand";

interface DeletePopupState {
    isOpen: boolean;
    payload: DeletePopupPayload | null;

    open: (p: DeletePopupPayload) => void;
    close: () => void;
}

export const useDeletePopupStore = create<DeletePopupState>((set) => ({
    isOpen: false,
    payload: null,
    open: (p) => set({ isOpen: true, payload: p }),
    close: () => set({ isOpen: false, payload: null }),
}));
