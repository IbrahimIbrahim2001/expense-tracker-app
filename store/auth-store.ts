import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    hydrated: boolean;
    login: (user: User) => void;
    setUser: (user: User) => void;
    logout: () => void;
    setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            hydrated: false,

            setHydrated: (value) => set({ hydrated: value }),
            login: (user) => {
                set({ user, isAuthenticated: true });
            },

            setUser: (user) => {
                set({ user, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            }
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    ),
);