import { create } from "zustand";
import { http } from "../lib/httpClient";
import type {  Goal } from "@/types/types";

interface GoalState {
    goals: Goal[];
}

interface GoalAction {
    fetchGoals: () => Promise<void>;
    addGoal: (
        goalname: string,
        delayedGoal: boolean,
        startdate: Date,
        deadline: Date,
        pinned: boolean,
        hasReflection: boolean,
        goalCategory: string,
        colorCode: string | null,
        characterType: string,
        finished: boolean
    ) => Promise<void>;
    deleteGoal: (goalId: number) => Promise<void>;
    updateGoal: (goalId: number, updateData: Goal) => Promise<void>;
}

type GoalStore = GoalState & GoalAction;

export const useGoalStore = create<GoalStore>((set) => ({
    goals: [],

    //목표 가져오기 Action
    fetchGoals: async () => {
        const res = await http.get("/api/goals/unfinished");
        set({ goals: res.data });
    },

    //목표 추가 Action
    addGoal: async (
        goalname: string,
        delayedGoal: boolean,
        startdate: Date,
        deadline: Date,
        pinned: boolean,
        hasReflection: boolean,
        goalCategory: string,
        colorCode:string|null,
        characterType:string,
        finished:boolean
    ) => {
        const res = await http.post("api/goals", {
            goalname,
            delayedGoal,
            startdate,
            deadline,
            pinned,
            hasReflection,
            goalCategory,
            colorCode,
            characterType,
            finished,
        });
        const savedGoal = res.data;

        set((state) => ({
            goals: [...state.goals, savedGoal],
        }));
    },

    //목표 수정 Action
    updateGoal: async (goalId: number, updateData: Goal) => {
        const res = await http.put(`api/goals/${goalId}`, updateData);
        const updateGoal = res.data;
        set((state) => ({
            goals: state.goals.map((g) =>
                g.goalId === goalId ? updateGoal : g
            ),
        }));
    },

    //목표 삭제 Action
    deleteGoal: async (goalId: number) => {
        await http.delete(`api/goals/${goalId}`);
        set((state) => ({
            goals: state.goals.filter((g) => g.goalId !== goalId),
        }));
    },
}));
