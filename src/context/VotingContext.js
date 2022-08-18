import { useState } from "react";
import { ethers } from "ethers"
import { contractAddress, contractABI } from "../utils/constants"
import React from "react"

const { ethereum } = window
const VotingContext = React.createContext()

const createVotingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const votingContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
    return votingContract
}

const VotingProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [rightToVote, setRightToVote] = useState(false)
    const [voted, setVoted] = useState(false)
    const [winner, setWinner] = useState("")

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install metamask")
            }
            else {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" })
                setCurrentAccount(accounts[0])
            }
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object")
        }
    }

    const giveRightToVote = async () => {
        try {
            const votingContract = createVotingContract()
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            await votingContract.giveRightToVote(accounts[0])
            setRightToVote(true)
        } catch (error) {
            console.log(error)
            window.alert("Right to vote cannot be provided")
        }
    }

    const vote = async (candidateId) => {
        try {
            const votingContract = createVotingContract()
            await votingContract.vote(candidateId - 1)
            setVoted(true)
        } catch (error) {
            console.log(error)
            window.alert("Vote not registered")
        }
    }

    const getWinner = async () => {
        try {
            const votingContract = createVotingContract()
            const winnerName = await votingContract.winnerName()
            setWinner(ethers.utils.parseBytes32String(winnerName))
        } catch (error) {
            console.log(error)
            window.alert("No Winner")
        }
    }

    return (
        <VotingContext.Provider
            value={{
                currentAccount,
                rightToVote,
                voted,
                winner,
                connectWallet,
                vote,
                getWinner,
                giveRightToVote
            }}
        >
            {children}
        </VotingContext.Provider>
    )
}

export { VotingContext, VotingProvider }