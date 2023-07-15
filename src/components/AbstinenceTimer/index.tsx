import { Chip } from "@suid/material";
import { Component } from "solid-js";

type Props = { formattedElapsedTime: string | null };

const AbstinenceTimer: Component<Props> = (props) => (
  <Chip
    label={`Abstained for ${props.formattedElapsedTime}`}
    variant="outlined"
    color="default"
    class={
      !props.formattedElapsedTime
        ? "opacity-0"
        : "bg-gray-700 [&>span]:text-white"
    }
  />
);

export default AbstinenceTimer;
