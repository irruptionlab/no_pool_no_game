import Board from "./components/game/puzzle/Board";
import Cards from "./components/game/memory/Cards"
import CountdownTimer from "./components/CountdownTimer";
import Timer from "./components/Timer";
import { useState } from "react";

function App() {
  const ONE_AND_HALF_DAY_IN_MS = 1.5 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeBeforeTwoDays = NOW_IN_MS + ONE_AND_HALF_DAY_IN_MS;
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App">
      <h1>No Pool No Game</h1>
      <h3>Game of the day</h3>
      <CountdownTimer targetDate={dateTimeBeforeTwoDays} />
      <Board isStarted={isStarted} setIsStarted={setIsStarted} />
      <Timer isStarted={isStarted} />
      <h3>Next Game</h3>
      <Cards />

    </div>
  );
}

export default App;
