import { createEffect, createMemo, onCleanup } from "solid-js";
import { store } from "../store";
import { formatElapsedTime } from "../utils";
import { createSmokeMachine } from "../state-machine/smoke";

export const createSmokeQuitter = () => {
  const [state, send] = createSmokeMachine();
  const smokeState = createMemo(() => state().smokeState);

  const formattedElapsedTime = createMemo(() => {
    const { elapsedMs } = store();
    if (smokeState() === "started") return null;

    return elapsedMs ? formatElapsedTime(elapsedMs) : null;
  });

  createEffect(async () => {
    if (store().stoppedSmokingAt) send({ type: "STOP_SMOKING" });
  });

  onCleanup(() => {
    const { elapsedSmokeQuittingTimeIntervalId: id } = state();
    if (id) clearInterval(id);
  });

  const handleStopSmoking = () => send({ type: "STOP_SMOKING" });
  const handleStartSmoking = () => send({ type: "START_SMOKING" });

  return {
    state: smokeState,
    handleStartSmoking,
    handleStopSmoking,
    formattedElapsedTime,
  };
};
