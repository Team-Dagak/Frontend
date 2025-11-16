import { http } from "@/lib/httpClient";
import { create } from "zustand";

interface DayGoalInfo {
    cleared: number;
    total: number;
    clearedGoals: number[];
    pendingGoals: number[];
}

interface calendarItem  {
    year: number,
    month: number,
    days: Record<string, DayGoalInfo>;
}

interface CalendarStoreProps {
    calendar: calendarItem | null;
    fetchCalendarInfo: (year:number, month: number) => void;
}

export const useCalendarStore = create<CalendarStoreProps>((set) => ({

    calendar : null,


    fetchCalendarInfo : async(year: number, month: number) => {
        const res = await http.get(`api/calendar/${year}/${month}`);
        set({ calendar: res.data});
        console.log(res.data);
    }
}));
