import { Button } from "@suid/material";
import { Component, Switch, Match } from "solid-js";

type Props = {
  state: "started" | "stopped";
  onStartSmoking: () => void;
  onStopSmoking: () => void;
};

const SmokeCTA: Component<Props> = (props: Props) => {
  return (
    <Switch>
      <Match when={props.state === "started"}>
        <Button
          variant="contained"
          color="success"
          onClick={props.onStopSmoking}
        >
          I Stopped Smoking Today
        </Button>
      </Match>
      <Match when={props.state === "stopped"}>
        <Button
          variant="contained"
          color="error"
          onClick={props.onStartSmoking}
        >
          I Started Smoking Today
        </Button>
      </Match>
    </Switch>
  );
};

export default SmokeCTA;
