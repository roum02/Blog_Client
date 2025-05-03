import { create } from "zustand";
import { persist } from "zustand/middleware";

type MemberType = "ADMMIN" | "GUEST" | "NONE";

interface UserType {
  memberType: MemberType;
  memberNickName: string;
  memberId: string;
}

interface AuthStore {
  user: UserType | null;
  isLoggedIn: boolean;
  setAuth: (user: UserType, accessToken: string) => void;
  clearAuth: () => void;
}

const clearLoginState = {
  user: null,
  isLoggedIn: false,
} as const;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: null,
        accessToken: null,
        isLoggedIn: false,
        setAuth: (user, accessToken) => {
          set({ user, isLoggedIn: true });
        },
        clearAuth: () => {
          set(clearLoginState);
        },
      };
    },
    {
      name: "auth-storage",
    }
  )
);
