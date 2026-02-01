import { create } from 'zustand';
import { UserResponse } from '@/api/generated/model';
import { postUserLoginResponseSuccess } from '@/api/generated/user/user';

interface UserState {
  user: UserResponse | null;
  set: (user: UserResponse | postUserLoginResponseSuccess) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  set: (user: UserResponse) => set({ user }),
}));
