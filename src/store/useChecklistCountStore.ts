import { create } from "zustand";

export const useChecklistCountStore = create((set) => ({
    totalCount: null,
    setTotalCount: (count:number) => set({totalCount: count}),
}))