export type Event<
  TType extends string | null = null,
  TPayload = never
> = TType extends null
  ? {
      type: string;
      payload?: never;
    }
  : {
      type: TType extends never ? string : TType;
      payload?: TPayload;
    };

export type Machine<TEvent extends Event, TState> = (
  event: TEvent
) => (state: TState) => TState;
export type Dispatch<TEvent> = (event: TEvent) => unknown;
