import { useState } from "react"
import { data } from "../data"

const Voting = ({ country, isTimeRunning, startVoting }) => {
    const [voted, setVoted] = useState(false)
    const leaderArray = data[country]

    const vote = () => {
        if (!voted) {
            setVoted(true)
        }
    }

    const cardArray = leaderArray.map((leader) => {
        return (
            <div className="voting--leader-card" key={leader["id"]}>
                <img src={leader["image-src"]} alt="" />
                <figcaption style={{ fontSize: "20px", marginLeft: "10px", textAlign: "center" }}>{leader["name"]}</figcaption>
                <button
                    type="button"
                    className="voting--leader-button"
                    onClick={vote}
                    disabled={voted}
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
            <button
                className="voting--start-voting-button"
                onClick={startVoting}
                disabled={isTimeRunning || voted}
            >
                Start Voting
            </button>
        </>

    )
}

export default Voting