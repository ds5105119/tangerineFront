import { create } from 'zustand';

interface PostingStore {
  isPostingOpen: boolean;
  openPosting: () => void;
  closePosting: () => void;
}

const usePostingStore = create<PostingStore>((set) => ({
  isPostingOpen: false,
  openPosting: () => set({ isPostingOpen: true }),
  closePosting: () => set({ isPostingOpen: false }),
}));

export default usePostingStore;
