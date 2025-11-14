import { create } from "zustand";
import type { ChecklistState } from "./useChecklistStore";
import type { Goal } from "@/types/types";


export type PopupChecklist = ChecklistState | null;

interface PopupStore {
    popupGoal: Goal | null;
    popupChecklist: PopupChecklist;

    setPopupChecklist: (Checklist: ChecklistState) => void;
    clearPopupChecklist: () => void;
    setPopupGoal: (goal: Goal) => void;
    clearPopupGoal: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
    popupChecklist: null,
    setPopupChecklist: (Checklist: ChecklistState) => set({popupChecklist: Checklist}),
    clearPopupChecklist: () => set({ popupChecklist: null}),

    popupGoal: null,
    setPopupGoal: (goal:Goal) => set({ popupGoal: goal}),
    clearPopupGoal: () => set({popupGoal: null}),
}))