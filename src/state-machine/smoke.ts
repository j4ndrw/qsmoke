import { Accessor, createSignal } from "solid-js";
import { startSmoking, stopSmoking } from "../store/reducer";
import { Dispatch, Event, Machine } from "./types";

type SmokeEvent = Event<"START_SMOKING"> | Event<"STOP_SMOKING">;
type State = {
  smokeState: "started" | "stopped";
  elapsedSmokeQuittingTimeIntervalId: NodeJS.Timeout | null;
};

const machine: Machine<SmokeEvent, State> = (event) => (state) => {
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

export const createSmokeMachine = (): readonly [
  Accessor<State>,
  Dispatch<SmokeEvent>
] => {
  const [state, setState] = createSignal<State>({
    smokeState: "started",
    elapsedSmokeQuittingTimeIntervalId: null,
  });

  return [state, (event) => setState(machine(event))];
};
