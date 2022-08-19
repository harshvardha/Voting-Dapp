import { useContext } from "react"
import { VotingContext } from "../context/VotingContext"
import { data } from "../data"

const Voting = ({ isTimeRunning, setWait }) => {
    const { rightToVote, voted, winner, vote } = useContext(VotingContext)

    const cardArray = data.map((leader) => {
        return (
            <div className="voting--leader-card" key={leader["id"]}>
                <img src={leader["image-src"]} alt="" />
                <figcaption style={{ fontSize: "20px", marginLeft: "10px", textAlign: "center" }}>{leader["name"]}</figcaption>
                <button
                    type="button"
                    className="voting--leader-button"
                    onClick={() => vote(leader["id"], setWait)}
                    disabled={!isTimeRunning || (rightToVote && voted)}
                >
                    Vote
                </button>
            </div>
        )
    })

    return (
        <>
            <div className="voting">
                {isTimeRunning || !voted ? cardArray : (
                    <div className="voting--leader-card">
                        <img src={winner["image-src"]} alt="" />
                        <figcaption style={{ fontSize: "20px", marginLeft: "10px", textAlign: "center" }}>{winner["name"]}</figcaption>
                    </div>
                )}
            </div>
        </>

    )
}

export default Voting