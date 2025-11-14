import { create } from "zustand";

interface FilterStore {
    type:string;
    setType: (key:string) => void; 
}

export const useFilterStore = create<FilterStore>((set) => ({
    type: 'All',
    setType: (key) => set({type:key}),
}))