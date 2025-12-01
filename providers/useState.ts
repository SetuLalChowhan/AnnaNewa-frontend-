import { create } from "zustand";

interface FilterValue {
  search: string;
  category: string;
  sort: string;
  postType: string;
  page: number;
  
}

interface ValueStore {
  email: string;
  resetToken: string;
  apiError:string;
  filterValue: FilterValue;
  setEmail: (value: string) => void;
  setResetToken: (value: string) => void;
  setApiError: (value: string) => void;
  setFilterValue: (value: Partial<FilterValue>) => void; // allow partial updates
}

export const useValueStore = create<ValueStore>((set) => ({
  email: "",
  resetToken: "",
  apiError:"",
  filterValue: {
    search: "",
    category: "",
    sort: "",
    postType: "",
    page:1
  },

  setEmail: (value) => set({ email: value }),

  setResetToken: (value) => set({ resetToken: value }),
  setApiError: (value) => set({ apiError: value }),

  setFilterValue: (value) =>
    set((state) => ({
      filterValue: { ...state.filterValue, ...value }, // merge updates
    })),
}));
