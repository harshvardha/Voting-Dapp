import { VotingContext } from "../context/VotingContext"
import { useContext } from "react"

const RegionBar = ({ timeRemaining, startVoting }) => {
    const { address, connectWallet } = useContext(VotingContext)

    return (
        <div className="region-bar">
            <p style={{ marginLeft: "10px" }}>Time Remaining: {timeRemaining}</p>
            <h1 className="region-bar--title">Poll for your favorite leader</h1>
            {!address ? (<button
                type="button"
                className="region-bar--connect-wallet"
                onClick={() => connectWallet(startVoting)}
            >
                Connect
            </button>) : (
                <p className="region-bar--account-address">{address}</p>
            )}
        </div>
    )
}

export default RegionBar