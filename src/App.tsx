import { createSignal, type Component } from "solid-js";
import { Button, Modal } from "@suid/material";

import {
  SmokeCTA,
  Leaderboard,
  Title,
  AbstinenceTimer,
  AppContainer,
} from "./components";

import { createSmokeQuitter } from "./hooks";

const App: Component = () => {
  const { state, handleStartSmoking, handleStopSmoking, formattedElapsedTime } =
    createSmokeQuitter();

  const [openLeaderboard, setOpenLeaderboard] = createSignal(false);

  const handleOpenLeaderboard = () => setOpenLeaderboard(true);
  const handleCloseLeaderboard = () => setOpenLeaderboard(false);

  const SmokeCTAMapped = () => (
    <SmokeCTA
      state={state()}
      onStopSmoking={handleStopSmoking}
      onStartSmoking={handleStartSmoking}
    />
  );

  const LeaderboardModal = () => (
    <Modal open={openLeaderboard()} onClose={handleCloseLeaderboard}>
      <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] width-[400px] border-white border-solid rounded bg-slate-900">
        <div class="flex flex-col justify-center items-center gap-2">
          <Leaderboard formattedElapsedTime={formattedElapsedTime()} />
        </div>
      </div>
    </Modal>
  );

  return (
    <AppContainer>
      <Title />
      <AbstinenceTimer formattedElapsedTime={formattedElapsedTime()} />
      <SmokeCTAMapped />
      <Button variant="outlined" onClick={handleOpenLeaderboard}>
        View Leaderboard
      </Button>
      <LeaderboardModal />
    </AppContainer>
  );
};

export default App;
