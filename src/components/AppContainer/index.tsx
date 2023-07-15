import { Component, JSX } from "solid-js";

type Props = { children: JSX.Element | JSX.Element[] };

const AppContainer: Component<Props> = (props) => (
  <div class="bg-gray-900 w-screen h-screen overflow-hidden overflow-y-scroll flex flex-col justify-center items-center gap-2">
    {props.children}
  </div>
);

export default AppContainer;
