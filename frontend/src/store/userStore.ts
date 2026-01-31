import { create } from 'zustand';
import { UserResponse } from '@/api/generated/model';
import { postUserLoginResponse } from '@/api/generated/user/user';

interface UserState {
  user: UserResponse | postUserLoginResponse | null;
  set: (user: UserResponse) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  set: (user: UserResponse | postUserLoginResponse) =>
    set({
      user,
    }),
}));
