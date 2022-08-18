import { useContext } from "react"
import { VotingContext } from "../context/VotingContext"
import { data } from "../data"

const Voting = ({ isTimeRunning }) => {
    const { rightToVote, voted, winner, vote, getWinner } = useContext(VotingContext)

    const cardArray = data.map((leader) => {
        return (
            <div className="voting--leader-card" key={leader["id"]}>
                <img src={leader["image-src"]} alt="" />
                <figcaption style={{ fontSize: "20px", marginLeft: "10px", textAlign: "center" }}>{leader["name"]}</figcaption>
                <button
                    type="button"
                    className="voting--leader-button"
                    onClick={vote}
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
                {cardArray}
            </div>
        </>

    )
}

export default Voting