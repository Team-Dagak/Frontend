import { create } from 'zustand';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OAUTH2_URL=import.meta.env.VITE_OAUTH2_API_BASE_URL;

export const useFilterStore = create((set) => ({
  type: 'All',                 // 상태 초기값
  setType: (key) => set({ type: key }),  // 상태 변경 함수
}));

export const useChecklistStore = create((set, get) => ({
  Checklists: [],

  // 전체 Checklist 불러오기 (유저 인증 기반)
  fetchChecklists: async () => {
    const res = await axios.get(
      `${API_BASE_URL}/Checklists`,
      { withCredentials: true }
    );
    set({ Checklists: res.data });
  },

  // Checklist 추가
  addChecklist: async ({ goalId, checklistName  }) => {
    const res = await axios.post(
      `${API_BASE_URL}/Checklists`,
      { goalId, checklistName  },
      { withCredentials: true }
    );
    const savedChecklist = res.data;
    set((state) => ({
      Checklists: [...state.Checklists , savedChecklist],
    }));
    
  },

  // Checklist 삭제
  deleteChecklist: async (checklistId) => {
    await axios.delete(
      `${API_BASE_URL}/Checklists/${checklistId}`,
      { withCredentials: true }
    );
    set((state) => ({
      Checklists: state.Checklists.filter((c) => c.checklistId !== checklistId),
    }));
  },

  // Checklist 내용/clear 등 수정
  updateChecklist: async (checklistId, updateData) => {
    const res = await axios.put(
      `${API_BASE_URL}/Checklists/${checklistId}`,
      updateData,
      { withCredentials: true }
    );
    const updated = res.data;
    set((state) => ({
      Checklists: state.Checklists.map((c) =>
        c.checklistId === checklistId ? updated : c
      ),
    }));
  },

  // 필요시 전체 삭제 등도 추가 가능
}));

export const useSelectedChecklistStore = create((set) => ({
  selectedChecklist: null,
  setSelectedChecklist: (Checklist) => set({ selectedChecklist: Checklist }),
  clearSelectedChecklist: () => set({ selectedChecklist: null }),
}));

export const usePopupStore = create((set) => ({
  PopupChecklist: null,
  setPopupChecklist: (Checklist) => set({ PopupChecklist: Checklist }),
  clearPopupChecklist: () => set({ PopupChecklist: null }),

  PopupGoal: null,
  setPopupGoal: (goal) => set({ PopupGoal: goal }),
  clearPopupGoal: () => set({ PopupGoal: null }),
}));


export const useGoalStore = create((set, get) => ({
  goals: [],

  
  // 목표 추가 (프론트 상태 + 백엔드 동기화)
  addGoal: async (goalData) => {
    // JWT 쿠키 인증!
    const response = await axios.post(
      `${API_BASE_URL}/goals`,
      goalData,
      { withCredentials: true }
    );
    const savedGoal = response.data;

    set((state) => ({
      goals: [...state.goals, savedGoal],
    }));
  },

  // 목표 전체 로드
  fetchGoals: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/goals`,
      { withCredentials: true }
    );
    set({ goals: response.data });
  },

  // 목표 하나 수정
  updateGoal: async (goalId, updateData) => {
    const response = await axios.put(
      `${API_BASE_URL}/goals/${goalId}`,
      updateData,
      { withCredentials: true }
    );
    const updatedGoal = response.data;
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId ? updatedGoal : g
      ),
    }));
  },

  // 목표 삭제
  deleteGoal: async (goalId) => {
    await axios.delete(
      `${API_BASE_URL}/goals/${goalId}`,
      { withCredentials: true }
    );
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== goalId),
    }));
  },
}));

export const useGoalWizardStore = create((set) => ({
  tempGoal: null, // {goalname, startdate, deadline}
  setTempGoal: (goal) => set({ tempGoal: goal }),
  clearTempGoal: () => set({ tempGoal: null }),

  Checklist: [], 
  setChecklist: (list) => set({ Checklist: list }),
  clearChecklist: () => set({ Checklist: [] }),
}));



export const useAuthStore = create((set, get) => ({
  
  // 상태
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // 액션
  setUser: (user) => set({ user }),

  // 인증 상태 확인 (쿠키 기반)
  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        withCredentials: true, // 쿠키 포함
        
      })
      
      if (response.status === 200) {
        set({
          user: response.data,
          isAuthenticated: true,
        })
        return true
      }
    } catch (error) {
      console.error("인증 상태 확인 오류:", error)
      set({
        user: null,
        isAuthenticated: false,
      })
    }
    return false
  },

  // 구글 로그인
  googleLogin: () => {
    set({ isLoading: true })
    // Spring Security OAuth2 엔드포인트로 직접 리다이렉트
    
    window.location.href = `${OAUTH2_URL}/google`
  },

  // 카카오 로그인
  kakaoLogin: () => {
    set({ isLoading: true })
    // Spring Security OAuth2 엔드포인트로 직접 리다이렉트
    window.location.href = `${OAUTH2_URL}/kakao`
  },

  // 로그아웃
  logout: async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true, // 쿠키 포함
        },
      )
      set({ user: null, isAuthenticated: false })
      return true
    } catch (error) {
      console.error("로그아웃 오류:", error)
      return false
    }
  },
}))

export const useChecklistCount = create((set)=>({
  totalCount: null,
  setTotalCount: (count)=>set({totalCount: count}),
}));