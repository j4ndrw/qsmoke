import { createEffect, createMemo, onCleanup } from "solid-js";
import { store } from "../store";
import { formatElapsedTime } from "../utils";
import { machine as smokeMachine } from "../state-machine/smoke";
import { createStateMachine } from "../state-machine";

export const createSmokeQuitter = () => {
  const [state, dispatch] = createStateMachine(smokeMachine, {
    smokeState: "started",
    elapsedSmokeQuittingTimeIntervalId: null,
  });
  const smokeState = createMemo(() => state().smokeState);

  const formattedElapsedTime = createMemo(() => {
    const { elapsedMs } = store();
    if (smokeState() === "started") return null;

    return elapsedMs ? formatElapsedTime(elapsedMs) : null;
  });

  createEffect(() => {
    if (store().stoppedSmokingAt) dispatch({ type: "STOP_SMOKING" });
  });

  onCleanup(() => {
    const { elapsedSmokeQuittingTimeIntervalId: id } = state();
    if (id) clearInterval(id);
  });

  const handleStopSmoking = () => dispatch({ type: "STOP_SMOKING" });
  const handleStartSmoking = () => dispatch({ type: "START_SMOKING" });

  return {
    state: smokeState,
    handleStartSmoking,
    handleStopSmoking,
    formattedElapsedTime,
  };
};
