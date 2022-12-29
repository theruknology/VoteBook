import React, { useEffect, useState } from "react";
import { Home } from "./components/Home";
import NewPoll from "./components/NewPoll/NewPoll";
import PollResults from "./components/PollResults/PollResults";
import Window from "./components/UI/Window";
import VoteNow from "./components/VoteNow/VoteNow";
import "./index.css";

export default function App() {
  const [view, setView] = useState("Home");

  const queryParams = new URLSearchParams(window.location.search);
  const voteTerm = queryParams.get("votelinkid");
  const resultTerm = queryParams.get("resultlinkid");

  useEffect(()=>{
  if (voteTerm !== null) {
    setView("Vote Now");
  } 
  if (resultTerm !== null) {
    setView("See Results");
  }
  },[])

  return (
    <div>
      <Window title={view} changeView={setView}>
        {view === "Home"  && <Home changeView={setView} />}
        {view === "New Poll" && <NewPoll />}
        {view === "See Results" && <PollResults resultLink={resultTerm}/>}
        {view === "Vote Now" && <VoteNow voteLink={voteTerm}/>}
      </Window>
    </div>
  );
}
