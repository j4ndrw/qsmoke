import { createSignal, type Component } from "solid-js";
import { Button, Chip, Modal } from "@suid/material";

import { SmokeCTA, Leaderboard } from "./modules";

import { createSmokeQuitter } from "./hooks/createSmokeQuitter";

const App: Component = () => {
  const { state, handleStartSmoking, handleStopSmoking, formattedElapsedTime } =
    createSmokeQuitter();

  const [openLeaderboard, setOpenLeaderboard] = createSignal(false);

  return (
    <div class="bg-gray-900 scale-[1.75] w-screen h-screen overflow-hidden overflow-y-scroll flex flex-col justify-center items-center gap-2">
      <Chip
        label={`Abstained for ${formattedElapsedTime()}`}
        variant="outlined"
        color="default"
        class={
          !formattedElapsedTime()
            ? "scale-50 opacity-0"
            : "bg-gray-700 scale-50 [&>span]:text-white"
        }
      />
      <SmokeCTA
        state={state()}
        onStopSmoking={handleStopSmoking}
        onStartSmoking={handleStartSmoking}
      />
      <Button variant="outlined" onClick={() => setOpenLeaderboard(true)}>
        View Leaderboard
      </Button>
      <Modal open={openLeaderboard()} onClose={() => setOpenLeaderboard(false)}>
        <div class="absolute top-1/2 left-1/2 translate-x-[-75%] translate-y-[-75%] width-[400px] border-white border-solid rounded bg-slate-900">
          <Leaderboard formattedElapsedTime={formattedElapsedTime()} />
        </div>
      </Modal>
    </div>
  );
};

export default App;
