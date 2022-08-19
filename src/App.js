import RegionBar from "./components/RegionBar"
import Voting from "./components/Voting"
import useVote from "./hooks/useVote";

function App() {
  const {
    isTimeRunning,
    timeRemaining,
    startVoting,
    setWait
  } = useVote()

  return (
    <div className="App">
      <RegionBar timeRemaining={timeRemaining} startVoting={startVoting} />
      <Voting
        isTimeRunning={isTimeRunning}
        setWait={setWait}
      />
    </div>
  );
}

export default App;
