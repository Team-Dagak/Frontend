import type { AxiosError } from "axios";
import { create } from "zustand";
import { http } from "../lib/httpClient";
import type { User } from "@/types/types";

const OAUTH2_URL = import.meta.env.VITE_OAUTH2_API_BASE_URL;

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: AxiosError | null;
    isAuthenticated: boolean;
}
interface AuthAction {
    //@ts-expect-error 현재 user에 대한 json값 데이터가 없음
    setUser: (user) => void;
    checkAuthStatus: () => Promise<boolean>;
    googleLogin: () => void;
    kakaoLogin: () => void;
    logout: () => Promise<boolean>;
}

type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    //User Info Set-up
    setUser: (user) => set({ user }),

    //Check Authorization
    checkAuthStatus: async () => {
        try {
            const res = await http.get("/api/users/me");
            if (res.status === 200) {
                set({
                    user: res.data,
                    isAuthenticated: true,
                });
                return true;
            }
        } catch (error) {
            console.log(error);
            set({
                user: null,
                isAuthenticated: false,
            });
        }
        return false;
    },

    //Google Login
    googleLogin: () => {
        set({ isLoading: true });
        window.location.href = `${OAUTH2_URL}/google`;
    },

    //KakaoLogin
    kakaoLogin: () => {
        set({ isLoading: true });
        window.location.href = `${OAUTH2_URL}/kakao`;
    },

    //Logout System
    logout: async () => {
        try {
            await http.post( "/api/auth/logout" )
            set({ user: null, isAuthenticated: false})
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
    }
}));
