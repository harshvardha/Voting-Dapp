const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("Voting Contract", function () {
    async function deployVotingContractFixture() {
        const names = ["Narendra Modi", "Amit Shah", "Nitin Gadkari", "Yogi Adityanath", "Arvind Kejriwal", "Akhilesh Yadav"]
        const proposals = names.map(name => ethers.utils.formatBytes32String(name))
        const Voting = await ethers.getContractFactory("Voting")
        const [owner, voter, addr] = await ethers.getSigners()
        const votingContract = await Voting.deploy(proposals)
        await votingContract.deployed()
        return { Voting, owner, voter, addr, votingContract, names }
    }

    describe("Contact Deployment", function () {
        it("should initialize the contract with chairperson address", async function () {
            const { votingContract, owner } = await loadFixture(deployVotingContractFixture)
            expect(await votingContract.chairperson()).to.equal(owner.address)
        })

        it("should initialize the proposals array with all the proposals", async function () {
            const { votingContract, names } = await loadFixture(deployVotingContractFixture)
            for (let i = 0; i < names.length; i++) {
                const proposal = await votingContract.proposals(i)
                expect(ethers.utils.parseBytes32String(proposal.name)).to.equal(names[i])
            }
        })
    })

    describe("Right to vote for voter", function () {
        it("should give right to vote to the voter if not voted", async function () {
            const { votingContract, voter } = await loadFixture(deployVotingContractFixture)
            await votingContract.giveRightToVote(voter.address)
            const voterObject = await votingContract.voters(voter.address)
            expect(+voterObject.weight).to.equal(1)
        })

        it("should revert when voter has already voted", async function () {
            const { votingContract, voter } = await loadFixture(deployVotingContractFixture)
            await votingContract.giveRightToVote(voter.address)
            await votingContract.connect(voter).vote(0, { from: voter.address })
            await expect(votingContract.giveRightToVote(voter.address)).to.be.revertedWith("Voter Already voted")
        })

        it("should revert when giveRightToVote is called by other than chairperson", async function () {
            const { votingContract, voter, addr } = await loadFixture(deployVotingContractFixture)
            await expect(
                votingContract.connect(addr).giveRightToVote(voter.address)
            ).to.be.revertedWith("Only chairperson can give right to vote")
        })
    })

    describe("Voting", function () {
        it("voteCount of proposal should be equal to the total votes given to proposal", async function () {
            const { votingContract, voter } = await loadFixture(deployVotingContractFixture)
            await votingContract.giveRightToVote(voter.address)
            await votingContract.connect(voter).vote(0)
            const proposal = await votingContract.proposals(0)
            expect(proposal.voteCount).to.equal(1)
        })

        it("vote function should revert if weight of voter is 0", async function () {
            const { votingContract, voter } = await loadFixture(deployVotingContractFixture)
            await expect(votingContract.connect(voter).vote(0)).to.be.revertedWith("You don't have right to vote")
        })

        it("vote function should revert if voter already voted", async function () {
            const { votingContract, voter } = await loadFixture(deployVotingContractFixture)
            await votingContract.giveRightToVote(voter.address)
            await votingContract.connect(voter).vote(0)
            await expect(votingContract.connect(voter).vote(1)).to.be.revertedWith("Already Voted")
        })
    })

    describe("Winning proposal", function () {
        it("winner should Narendra Modi", async function () {
            const { votingContract, voter, names } = await loadFixture(deployVotingContractFixture)
            await votingContract.giveRightToVote(voter.address)
            await votingContract.connect(voter).vote(0)
            const winnerName = await votingContract.winnerName()
            expect(ethers.utils.parseBytes32String(winnerName)).to.equal(names[0])
        })
    })
})