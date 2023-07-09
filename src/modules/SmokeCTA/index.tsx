import { Button } from "@suid/material";
import { Component, Show } from "solid-js";

type Props = {
  state: "started" | "stopped" | "ready";
  onStartSmoking: () => void;
  onStopSmoking: () => void;
};

const SmokeCTA: Component<Props> = (props: Props) => {
  return (
    <>
      <Show when={props.state === "started"}>
        <Button
          variant="contained"
          color="success"
          onClick={props.onStopSmoking}
        >
          I Stopped Smoking Today
        </Button>
      </Show>
      <Show when={props.state === "stopped"}>
        <Button
          variant="contained"
          color="error"
          onClick={props.onStartSmoking}
        >
          I Started Smoking Today
        </Button>
      </Show>
    </>
  );
};

export default SmokeCTA;
