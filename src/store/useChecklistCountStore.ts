import { create } from "zustand";

interface ChecklistCountProp {
    totalCount: number | null;
    setTotalCount: (count:number) => void;
}

export const useChecklistCountStore = create<ChecklistCountProp>((set) => ({
    totalCount: null,
    setTotalCount: (count:number) => set({totalCount: count}),
}))