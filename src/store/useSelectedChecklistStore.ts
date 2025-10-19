import { create } from "zustand";
import type { CheckListData } from "./useChecklistStore";

interface SelectedChecklistStore {
    selectedChecklist: CheckListData | null;
    setSelectedChecklist: (Checklist:CheckListData) => void;
    clearSelectedChecklist: () => void;
}

export const useSelectedChecklistStore = create<SelectedChecklistStore>((set) => ({
    selectedChecklist: null,

    setSelectedChecklist: (Checklist: CheckListData) => set({ selectedChecklist: Checklist}),

    clearSelectedChecklist: () => set({selectedChecklist:null}),
}))