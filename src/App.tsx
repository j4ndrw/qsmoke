import { createSignal, type Component } from "solid-js";
import { Button, Chip, Modal } from "@suid/material";

import { SmokeCTA, Leaderboard } from "./modules";

import { createSmokeQuitter } from "./hooks/createSmokeQuitter";
import { store } from "./store";

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
        <div class="absolute top-1/4 left-1/2 translate-x-[-50%] translate-y-[-50%] width-[400px] border-white border-solid rounded bg-slate-900">
          <div class="flex flex-col justify-center items-center gap-2">
            <Leaderboard formattedElapsedTime={formattedElapsedTime()} />
            <Button
              variant="outlined"
              color="error"
              onClick={() => store().deleteLeaderboard()}
            >
              Delete Leaderboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
