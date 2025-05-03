import { create } from "zustand";

type MemberType = "ADMMIN" | "GUEST" | "NONE";

interface UserType {
  memberType: MemberType;
  memberNickName: string;
  memberId: string;
}

interface AuthStore {
  user: UserType | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setAuth: (user: UserType, accessToken: string) => void;
  clearAuth: () => void;
}

const clearLoginState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
} as const;

export const useAuthStore = create<AuthStore>((set) => {
  return {
    user: null,
    accessToken: null,
    isLoggedIn: false,
    setAuth: (user, accessToken) => {
      set({ user, accessToken, isLoggedIn: true });
    },
    clearAuth: () => {
      set(clearLoginState);
    },
  };
});
