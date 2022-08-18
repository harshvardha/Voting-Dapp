import RegionBar from "./components/RegionBar"
import Voting from "./components/Voting"
import useVote from "./hooks/useVote";

function App() {
  const {
    isTimeRunning,
    timeRemaining,
    startVoting
  } = useVote()

  return (
    <div className="App">
      <RegionBar timeRemaining={timeRemaining} startVoting={startVoting} />
      <Voting
        isTimeRunning={isTimeRunning}
      />
    </div>
  );
}

export default App;
