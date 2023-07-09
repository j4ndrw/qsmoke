import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { store } from "../store";
import { formatElapsedTime } from "../utils";
import { startSmoking, stopSmoking } from "../store/reducer";

export const createSmokeQuitter = () => {
  const state = createMemo<"started" | "stopped">(() =>
    store().stoppedSmokingAt ? "stopped" : "started"
  );

  const [
    elapsedSmokeQuittingTimeIntervalId,
    setElapsedSmokeQuittingTimeIntervalId,
  ] = createSignal<NodeJS.Timeout | null>(null);

  const formattedElapsedTime = createMemo(() => {
    const { elapsedMs } = store();
    return elapsedMs ? formatElapsedTime(elapsedMs) : null;
  });

  const cleanupInterval = () => {
    const id = elapsedSmokeQuittingTimeIntervalId();
    if (id) clearInterval(id);
  };

  onMount(async () => {
    if (store().stoppedSmokingAt) {
      const id = stopSmoking();
      setElapsedSmokeQuittingTimeIntervalId(id);
    }
  });

  onCleanup(() => {
    cleanupInterval();
  });

  const handleStopSmoking = () => {
    cleanupInterval();

    const id = stopSmoking();
    setElapsedSmokeQuittingTimeIntervalId(id);
  };

  const handleStartSmoking = () => {
    cleanupInterval();
    startSmoking();
  };

  return {
    state,
    handleStartSmoking,
    handleStopSmoking,
    formattedElapsedTime,
  };
};
