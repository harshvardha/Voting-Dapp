import { useState, useEffect } from "react";
import { ethers } from "ethers"
import { contractAddress, contractABI } from "../utils/constants"
import { data } from "../data";
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
    const [address, setAddress] = useState("")
    const [votingContract, setVotingContract] = useState(null)
    const [rightToVote, setRightToVote] = useState(false)
    const [voted, setVoted] = useState(false)
    const [winner, setWinner] = useState({})

    const connectWallet = async (startVoting) => {
        try {
            if (!ethereum) {
                return alert("Please install metamask")
            }
            else {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" })
                setAddress(accounts[0])
                if (giveRightToVote(accounts[0])) {
                    startVoting()
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object")
        }
    }

    const giveRightToVote = async (currentAccount) => {
        try {
            const jsonRpcProvider = new ethers.providers.JsonRpcProvider()
            const owner = await votingContract.chairperson()
            const jsonRpcSigner = jsonRpcProvider.getSigner(owner)
            await votingContract.connect(jsonRpcSigner).giveRightToVote(currentAccount)
            setRightToVote(true)
            return true
        } catch (error) {
            console.log(error.message)
            window.alert("Right to vote cannot be provided")
        }
    }

    const vote = async (candidateId, setWait) => {
        try {
            const votedOrNot = await votingContract.voters(address)
            if (!votedOrNot.voted) {
                setWait(prevState => !prevState)
                await votingContract.vote(candidateId - 1)
                setVoted(true)
                setWait(prevState => !prevState)
            }
            else {
                window.alert("You already voted")
            }
        } catch (error) {
            console.log(error)
            window.alert("Vote not registered")
        }
    }

    const getWinner = async () => {
        try {
            const winnerId = (await votingContract.winnerId()).toNumber()
            const winnerObj = data.find(candidate => candidate.id === winnerId + 1)
            setWinner(winnerObj)
        } catch (error) {
            console.log(error)
            window.alert("No Winner")
        }
    }

    useEffect(() => {
        if (!ethereum) {
            window.alert("please install metamask")
        }
        else {
            const votingContract = createVotingContract()
            setVotingContract(votingContract)
        }
    }, [])

    return (
        <VotingContext.Provider
            value={{
                address,
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