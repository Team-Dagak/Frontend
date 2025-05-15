import { create } from 'zustand';
import data from "../data/data.json";

export const useFilterStore = create((set) => ({
  type: 'All',                 // 상태 초기값
  setType: (key) => set({ type: key }),  // 상태 변경 함수
}));

export const useTaskStore = create((set, get) => ({
    tasks: data.tasks,

    toggleTaskClear: (categoryIndex, taskItemIndex) =>
    set((state) => {
      // 불변성을 유지하면서 특정 태스크의 clear 상태를 토글
      const newTasks = state.tasks.map((category, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item, iIdx) => {
              if (iIdx === taskItemIndex) {
                return { ...item, clear: !item.clear };
              }
              return item;
            }),
          };
        }
        return category;
      });
      return { tasks: newTasks };
    }),
}));