import { useState, useEffect } from "react"

const useVote = () => {
    const [country, setCountry] = useState("")
    const [timeRemaining, setTimeRemianing] = useState(10)
    const [isTimeRunning, setIsTimeRunning] = useState(false)

    const startVoting = () => {
        setIsTimeRunning(true)
    }

    useEffect(() => {
        if (timeRemaining > 0 && isTimeRunning) {
            setTimeout(() => {
                setTimeRemianing(pastTime => pastTime - 1)
            }, 1000)
        }
        else if (timeRemaining === 0) {
            setIsTimeRunning(false)
        }
    }, [timeRemaining, isTimeRunning])

    return { country, setCountry, timeRemaining, isTimeRunning, startVoting }
}

export default useVote