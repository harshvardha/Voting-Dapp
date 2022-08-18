import { VotingContext } from "../context/VotingContext"
import { useContext } from "react"

const RegionBar = ({ timeRemaining, startVoting }) => {
    const { currentAccount, connectWallet, giveRightToVote } = useContext(VotingContext)

    return (
        <div className="region-bar">
            <p style={{ marginLeft: "10px" }}>Time Remaining: {timeRemaining}</p>
            <h1 className="region-bar--title">Poll for your favorite leader</h1>
            {!currentAccount ? (<button
                type="button"
                className="region-bar--connect-wallet"
                onClick={(event) => {
                    event.preventDefault()
                    connectWallet()
                    giveRightToVote()
                    startVoting()
                }
                }
            >
                Connect
            </button>) : (
                <p className="region-bar--account-address">{currentAccount}</p>
            )}
        </div>
    )
}

export default RegionBar