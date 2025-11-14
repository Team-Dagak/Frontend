import type { CheckList, Goal } from "@/types/types";
import { create } from "zustand";

interface GoalWizardStore {
    tempGoal: Goal | null;
    setTempGoal: (goal:Goal) => void;
    clearTempGoal: () => void;

    Checklist: CheckList;
    setCheckList: (list:CheckList) => void;
    clearCheckList: () => void;
}

export const useGoalWizardStore = create<GoalWizardStore>((set) => ({
    tempGoal: null,
    setTempGoal: (goal:Goal) => set({ tempGoal: goal}),
    clearTempGoal: () => set({ tempGoal: null}),

    Checklist: [],
    setCheckList:(list:CheckList) => set({ Checklist: list }),
    clearCheckList: () => set({ Checklist: [] }),
}))