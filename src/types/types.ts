export type User = {
    nickname: string;
    email: string;
    username?: string;
}

export type Goal = {
    goalId?: number;
    goalname?: string;
    startDate?: string;
    deadline?:string;
    pinned?: boolean;
    delayed?: boolean;
    recommendation?: string;
    checkList?: CheckList;
    category: string;
}

export type CheckListItem = {
    checklistId: number; 
    goalId: number;
    clear: boolean;
    checklistName: string;
    checkDate: Date;
}

export type DeletePopupPayload = {
    goalName: string;
    checkListName: string;
}

export type CheckList = CheckListItem[];

export type Bottle = {
    bottleId?: number;
    checkListId?: number;
    label?: number;
}