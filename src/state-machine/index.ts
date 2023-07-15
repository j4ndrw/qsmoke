/* eslint-disable indent */
import { Accessor, createSignal } from "solid-js";
import { Dispatch, Event, Machine } from "./types";

type StateMachine<TState, TEvent extends Event> = readonly [
  Accessor<TState>,
  Dispatch<TEvent>
];
export const createStateMachine = <TState, TEvent extends Event>(
  machine: Machine<TEvent, TState>,
  initialState: TState
): StateMachine<TState, TEvent> => {
  const [state, setState] = createSignal<TState>(initialState);
  return [state, (event) => setState(machine(event))];
};
