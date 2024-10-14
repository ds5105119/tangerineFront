import { create } from 'zustand';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from './authToken';

interface PostingStore {
  auth: AuthType | undefined;
  setAuth: () => void;
  updateAuth: () => void;
}

const useAuthStore = create<PostingStore>((set, get) => ({
  auth: undefined,
  setAuth: () => {
    if (!get().auth) {
      const tempAuth = getAuth();
      if (tempAuth) {
        set({ auth: { access: '', refresh: '', user: tempAuth.user } });
      }
    }
  },
  updateAuth: () => {
    const tempAuth = getAuth();
    if (tempAuth) {
      set({ auth: { access: '', refresh: '', user: tempAuth.user } });
    }
  },
}));

export default useAuthStore;
