import { create } from 'zustand';
import { UserResponse } from '@/api/generated/model';

interface UserState {
  id: string | null;
  username: string | null;
  displayName: string | null;
  set: (user: UserResponse) => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  username: null,
  displayName: null,
  set: (user: UserResponse) =>
    set({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    }),
}));
