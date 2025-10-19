import { create } from "zustand";
import { http } from "../lib/httpClient";

interface GoalData {
    id: number;
    goalname: string;
    startdate: string;
    deadline: string;
    pinned: 0;
    checklist: {id:string; text: string; done: boolean}[];
}

interface GoalState{
    goals: GoalData[];
}

interface GoalAction{
    fetchGoals: () => Promise<void>;
    addGoal: (goalData:GoalData) => Promise<void> ;
    deleteGoal: (goalId: number) => Promise<void>;
}

type GoalStore = GoalState & GoalAction

export const useGoalStore = create<GoalStore>((set) => ({
    goals: [],

    //목표 가져오기 Action
    fetchGoals: async () => {
        const res = await http.get(
            "/api/goals"
        );
        set({goals: res.data});
    },

    //목표 추가 Action
    addGoal: async (goalData:GoalData) => {
        const res = await http.post(
            "/goals",goalData
        )
        const savedGoal = res.data;

        set((state) => ({
            goals: [...state.goals, savedGoal],
        }));
    },

    //목표 수정 Action
    updateGoal: async (goalId: number, updateData:GoalData) => {
        const res = await http.put(`api/goals/${goalId}`, updateData);
        const updateGoal = res.data;
        set((state) => ({
            goals: state.goals.map((g) => g.id === goalId ? updateGoal: g),
        }));
    },

    //목표 삭제 Action
    deleteGoal: async (goalId: number) => {
        await http.delete(`api/goals/${goalId}`);
        set((state) => ({
            goals: state.goals.filter((g) => g.id !== goalId),
        }))
    }


}))