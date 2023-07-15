import { Preferences } from "@capacitor/preferences";
import { StateStorage } from "zustand/middleware";

export const internalStorage: StateStorage = {
  async getItem(key: string) {
    const result = await Preferences.get({ key });
    return result.value ?? null;
  },
  async setItem(key: string, value: string) {
    await Preferences.set({
      key,
      value,
    });
  },
  async removeItem(key: string) {
    await Preferences.remove({ key });
  },
};

export const formatElapsedTime = (elapsedMs: number) => {
  const HOURS_IN_DAY = 24;
  const MINUTES_IN_HOUR = 60;
  const SECONDS_IN_MINUTES = 60;
  const MILLISECONDS_IN_SECOND = 1000;

  const days = Math.floor(
    elapsedMs /
      (HOURS_IN_DAY *
        MINUTES_IN_HOUR *
        SECONDS_IN_MINUTES *
        MILLISECONDS_IN_SECOND)
  );
  const daysMs =
    elapsedMs %
    (HOURS_IN_DAY *
      MINUTES_IN_HOUR *
      SECONDS_IN_MINUTES *
      MILLISECONDS_IN_SECOND);

  const hours = Math.floor(
    daysMs / (MINUTES_IN_HOUR * SECONDS_IN_MINUTES * MILLISECONDS_IN_SECOND)
  );
  const hoursMs =
    elapsedMs % (MINUTES_IN_HOUR * SECONDS_IN_MINUTES * MILLISECONDS_IN_SECOND);

  const minutes = Math.floor(
    hoursMs / (SECONDS_IN_MINUTES * MILLISECONDS_IN_SECOND)
  );

  return `${days} day(s), ${hours} hour(s), ${minutes} minute(s)`;
};
