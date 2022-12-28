import React, { useState } from "react";
import { Home } from "./components/Home";
import NewPoll from "./components/NewPoll/NewPoll";
import PollResults from "./components/PollResults/PollResults";
import Window from "./components/UI/Window";
import VoteNow from "./components/VoteNow/VoteNow";
import "./index.css";

export default function App() {
  const [view, setView] = useState("Vote Now");

  return (
    <div>
      <Window title={view} changeView={setView}>
        {view === "Home" && <Home changeView={setView}/>}
        {view === "New Poll" && <NewPoll />}
        {view === "See Results" && <PollResults />}
        {view === "Vote Now" && <VoteNow />}
      </Window>
    </div>
  );
}
