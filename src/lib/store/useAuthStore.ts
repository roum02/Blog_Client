import { create } from "zustand";
import { persist } from "zustand/middleware";

type MemberType = "ADMIN" | "GUEST" | "NONE";

interface UserType {
  memberType: MemberType;
  memberNickName: string;
  memberId: string;
}

interface AuthStore {
  user: UserType | null;
  isLoggedIn: boolean;
  setAuth: (user: UserType) => void;
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
        isLoggedIn: false,
        setAuth: (user) => {
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
