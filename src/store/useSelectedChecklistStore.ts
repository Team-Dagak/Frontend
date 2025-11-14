import type { CheckList } from "@/types/types";
import { create } from "zustand";

interface SelectedChecklistStore {
    selectedChecklist: CheckList | null;
    setSelectedChecklist: (Checklist:CheckList) => void;
    clearSelectedChecklist: () => void;
}

export const useSelectedChecklistStore = create<SelectedChecklistStore>((set) => ({
    selectedChecklist: null,

    setSelectedChecklist: (Checklist: CheckList) => set({ selectedChecklist: Checklist}),

    clearSelectedChecklist: () => set({selectedChecklist:null}),
}))