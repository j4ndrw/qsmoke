/* eslint-disable indent */
import { createSignal } from "solid-js";
import { startSmoking, stopSmoking } from "../store/reducer";

type Event = { type: "START_SMOKING" } | { type: "STOP_SMOKING" };

type SmokeState = "started" | "stopped";

const [state, setState] = createSignal<{
  smokeState: SmokeState;
  elapsedSmokeQuittingTimeIntervalId: NodeJS.Timeout | null;
}>({
  smokeState: "started",
  elapsedSmokeQuittingTimeIntervalId: null,
});

const machine = (event: Event): ReturnType<typeof state> => {
  const cleanupInterval = () => {
    const { elapsedSmokeQuittingTimeIntervalId: id } = state();
    if (id) clearInterval(id);
  };
  switch (event.type) {
    case "STOP_SMOKING": {
      if (state().smokeState === "stopped") return state();

      cleanupInterval();

      const id = stopSmoking();
      return {
        smokeState: "stopped",
        elapsedSmokeQuittingTimeIntervalId: id,
      };
    }
    case "START_SMOKING": {
      if (state().smokeState === "started") return state();

      cleanupInterval();

      startSmoking();
      return {
        smokeState: "started",
        elapsedSmokeQuittingTimeIntervalId: null,
      };
    }
  }
};

const send = (event: Event): void => {
  setState(machine(event));
};

export const createSmokeMachine = () => [state, send] as const;
