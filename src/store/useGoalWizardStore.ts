import { create } from "zustand";

export const useGoalWizardStore = create((set) => ({
    tempGoal: null,
    setTempGoal: (goal:unknown) => set({ tempGoal: goal}),
    clearTempGoal: () => set({ tempGoal: null}),

    Checklist: [],
    setChecklist:(list:unknown) => set({ Checklist: list }),
    clearChecklist: () => set({ Checklist: [] }),
}))