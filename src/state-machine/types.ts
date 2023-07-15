export type Event<TType extends string, TPayload = never> = {
  type: TType;
  payload?: TPayload;
};
export type Machine<TEvent, TState> = (
  event: TEvent
) => (state: TState) => TState;
export type Dispatch<TEvent> = (event: TEvent) => unknown;
