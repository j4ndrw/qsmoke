/* eslint-disable indent */
import { startSmoking, stopSmoking } from "../store/reducer";
import { Event, Machine } from "./types";

type SmokeEvent = Event<"START_SMOKING"> | Event<"STOP_SMOKING">;

export const machine: Machine<
  SmokeEvent,
  {
    smokeState: "started" | "stopped";
    elapsedSmokeQuittingTimeIntervalId: NodeJS.Timeout | null;
  }
> = (event) => (state) => {
  const cleanupInterval = () => {
    const { elapsedSmokeQuittingTimeIntervalId: id } = state;
    if (id) clearInterval(id);
  };
  switch (event.type) {
    case "STOP_SMOKING": {
      if (state.smokeState === "stopped") return state;

      cleanupInterval();

      const id = stopSmoking();
      return {
        smokeState: "stopped",
        elapsedSmokeQuittingTimeIntervalId: id,
      };
    }
    case "START_SMOKING": {
      if (state.smokeState === "started") return state;

      cleanupInterval();

      startSmoking();
      return {
        smokeState: "started",
        elapsedSmokeQuittingTimeIntervalId: null,
      };
    }
  }
};
