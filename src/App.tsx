import { createSignal, type Component } from "solid-js";
import { Button, Modal } from "@suid/material";

import { SmokeCTA, Leaderboard, Title, AbstinenceTimer } from "./components";

import { createSmokeQuitter } from "./hooks/createSmokeQuitter";

const App: Component = () => {
  const { state, handleStartSmoking, handleStopSmoking, formattedElapsedTime } =
    createSmokeQuitter();

  const [openLeaderboard, setOpenLeaderboard] = createSignal(false);

  const handleOpenLeaderboard = () => setOpenLeaderboard(true);
  const handleCloseLeaderboard = () => setOpenLeaderboard(false);

  return (
    <div class="bg-gray-900 w-screen h-screen overflow-hidden overflow-y-scroll flex flex-col justify-center items-center gap-2">
      <Title />
      <AbstinenceTimer formattedElapsedTime={formattedElapsedTime()} />
      <SmokeCTA
        state={state()}
        onStopSmoking={handleStopSmoking}
        onStartSmoking={handleStartSmoking}
      />
      <Button variant="outlined" onClick={handleOpenLeaderboard}>
        View Leaderboard
      </Button>
      <Modal open={openLeaderboard()} onClose={handleCloseLeaderboard}>
        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] width-[400px] border-white border-solid rounded bg-slate-900">
          <div class="flex flex-col justify-center items-center gap-2">
            <Leaderboard formattedElapsedTime={formattedElapsedTime()} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
