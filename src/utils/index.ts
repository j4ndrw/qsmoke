import { Preferences } from "@capacitor/preferences";
import { StateStorage } from "zustand/middleware";

export const internalStorage: StateStorage = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async getItem(key: string) {
    const result = await Preferences.get({ key });
    if (result.value === null) return null;
    if (Number.isNaN(+result.value)) return result.value;
    return +result.value;
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
  const SECONDS_IN_HOUR = 60;
  const MILLISECONDS_IN_SECOND = 60;
  const ONE_SECOND_IN_MILLISECONDS = 1000;

  const days = Math.floor(
    elapsedMs /
    (HOURS_IN_DAY *
      SECONDS_IN_HOUR *
      MILLISECONDS_IN_SECOND *
      ONE_SECOND_IN_MILLISECONDS)
  );
  const daysMs =
    elapsedMs %
    (HOURS_IN_DAY *
      SECONDS_IN_HOUR *
      MILLISECONDS_IN_SECOND *
      ONE_SECOND_IN_MILLISECONDS);

  const hours = Math.floor(
    daysMs /
    (SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND * ONE_SECOND_IN_MILLISECONDS)
  );
  const hoursMs =
    elapsedMs %
    (SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND * ONE_SECOND_IN_MILLISECONDS);

  const minutes = Math.floor(
    hoursMs / (MILLISECONDS_IN_SECOND * ONE_SECOND_IN_MILLISECONDS)
  );

  return `${days} day(s), ${hours} hour(s), ${minutes} minute(s)`;
};
