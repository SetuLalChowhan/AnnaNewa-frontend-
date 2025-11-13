import { create } from "zustand";

// Define the store interface
interface EmailStore {
  email: string;
  setEmail: (newEmail: string) => void;
}

// Create the store
export const useEmailStore = create<EmailStore>((set) => ({
  email: "",
  setEmail: (newEmail) => set({ email: newEmail }),
}));
