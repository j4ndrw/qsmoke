import { createSignal } from "solid-js";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { internalStorage } from "../utils";

import { LeaderboardItem } from "../types";

type Store = {
  stoppedSmokingAt: number | null;
  setStoppedSmokingAt: (date: Date | null) => void;

  elapsedMs: number | null;
  setElapsedMs: (ms: number | null) => void;

  leaderboard: LeaderboardItem[];
  addToLeaderboard: (leaderboardItem: LeaderboardItem) => void;
  deleteLeaderboard: () => void;
};

const vanillaStore = create(
  persist<Store>(
    (set, get) => ({
      stoppedSmokingAt: null,
      setStoppedSmokingAt: (date) =>
        set({ stoppedSmokingAt: date ? date.getTime() : null }),

      elapsedMs: null,
      setElapsedMs: (ms) => set({ elapsedMs: ms }),

      leaderboard: [],
      addToLeaderboard: (leaderboardItem) =>
        set({ leaderboard: [leaderboardItem, ...get().leaderboard] }),
      deleteLeaderboard: () => set({ leaderboard: [] }),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => internalStorage),
    }
  )
);

const [store, setStore] = createSignal<Store>(vanillaStore.getState());
vanillaStore.subscribe((state) => setStore(state));

export { store };
