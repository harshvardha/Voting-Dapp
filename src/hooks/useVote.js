import { useState, useEffect, useContext } from "react"
import { VotingContext } from "../context/VotingContext"

const useVote = () => {
    const [timeRemaining, setTimeRemianing] = useState(20)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wait, setWait] = useState(false)
    const { getWinner } = useContext(VotingContext)

    const startVoting = () => {
        setIsTimeRunning(true)
    }

    useEffect(() => {
        if (timeRemaining > 0 && isTimeRunning && !wait) {
            setTimeout(() => {
                setTimeRemianing(pastTime => pastTime - 1)
            }, 1000)
        }
        else if (timeRemaining === 0) {
            setIsTimeRunning(false)
            getWinner()
        }
    }, [timeRemaining, isTimeRunning, wait])

    return { timeRemaining, isTimeRunning, startVoting, setWait }
}

export default useVote