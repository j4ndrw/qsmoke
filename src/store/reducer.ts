import { store } from ".";
import { UPDATE_SMOKE_QUITTING_ELAPSED_TIME_DELAY_SECONDS } from "../constants";

export const stopSmoking = (
  updateElapsedTimeDelay = UPDATE_SMOKE_QUITTING_ELAPSED_TIME_DELAY_SECONDS
): NodeJS.Timeout | null => {
  const { stoppedSmokingAt, setStoppedSmokingAt, setElapsedMs } = store();
  const newStoppedSmokingAt = stoppedSmokingAt
    ? new Date(stoppedSmokingAt)
    : new Date();
  setStoppedSmokingAt(newStoppedSmokingAt);

  return setInterval(() => {
    setElapsedMs(new Date().getTime() - newStoppedSmokingAt.getTime());
  }, updateElapsedTimeDelay);
};

export const startSmoking = () => {
  const {
    stoppedSmokingAt,
    setStoppedSmokingAt,
    setElapsedMs,
    addToLeaderboard,
  } = store();

  setStoppedSmokingAt(null);
  setElapsedMs(null);

  if (!stoppedSmokingAt) return;

  addToLeaderboard({
    stoppedSmokingAt,
    startedSmokingAt: new Date().getTime(),
  });
};
