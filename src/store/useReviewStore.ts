import { http } from "@/lib/httpClient";
import type { Goal } from "@/types/types";
import { create } from "zustand";



interface ReviewStore {
    reviews: Goal[];
    fetchReviews: () => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
    reviews: [],

    fetchReviews: async() => {
        const res = await http.get("api/goals/reflected");
        set({reviews: res.data});
        console.log(res.data);
    }
}))