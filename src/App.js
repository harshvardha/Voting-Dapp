import RegionBar from "./components/RegionBar"
import Voting from "./components/Voting"
import useVote from "./hooks/useVote";

function App() {
  const {
    country,
    setCountry,
    isTimeRunning,
    timeRemaining,
    startVoting
  } = useVote()

  return (
    <div className="App">
      <RegionBar timeRemaining={timeRemaining} />
      {country !== "" ? <Voting
        country={country}
        isTimeRunning={isTimeRunning}
        startVoting={startVoting}
      /> : null}
    </div>
  );
}

export default App;
