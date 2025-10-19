import { create } from "zustand";
import { http } from "../lib/httpClient";

export interface CheckListData{
    checklistId:number;
    checklist: string;
    clear: boolean;
}

interface ChecklistState{
    checklist: CheckListData[];
}

interface ChecklistAction{
    fetchChecklists: () => Promise<void>,
    addChecklist: (goalId: number, checklistName: CheckListData) => Promise<void>,
    deleteChecklist: (checklistId: number) => Promise<void>,
    updateChecklist:(checklistId: number, updateData: CheckListData) => Promise<void>,
}

type ChecklistStore = ChecklistState & ChecklistAction;

export const useChecklistStore = create<ChecklistStore>((set) => ({
    checklist: [],

    //체크리스트 데이터 가져오기
    fetchChecklists: async () => {
        const res = await http.get("api/Checklists");
        set({checklist: res.data});
    },

    //체크리스트 추가
    addChecklist: async ( goalId:number, checklistName: CheckListData) => {
        const res = await http.post(`api/Checklists`, {goalId, checklistName});
        const savedChecklist = res.data;
        set((state) => ({
            checklist: [...state.checklist, savedChecklist],
        }));
    },

        deleteChecklist: async (checklistId: number) => {
            await http.delete(`api/Checklists/${checklistId}`);
            set((state) => ({
                checklist: state.checklist.filter((c) => c.checklistId !== checklistId),
            }))
        },

        updateChecklist: async (checklistId: number, updateData: CheckListData) => {
            const res = await http.put(
                `api/Checklists/${checklistId}`, updateData
            );
            const updated = res.data;
            set((state) => ({
                checklist: state.checklist.map((c) => c.checklistId === checklistId ? updated : c)
            }))
        }

}))