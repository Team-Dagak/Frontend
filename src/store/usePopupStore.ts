import { create } from "zustand";


export const usePopupStore = create((set) => ({
    PopupChecklist: null,
    setPopupChecklist: (Checklist: unknown) => set({PopupChecklist: Checklist}),
    clearPopupChecklist: () => set({ PopupChecklist: null}),

    PopupGoal: null,
    setPopupGoal: (goal:unknown) => set({ PopupGoal: goal}),
    clearPopupGoal: () => set({PopupGoal: null}),
}))