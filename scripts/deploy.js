const { ethers } = require("hardhat")

const main = async () => {
    const names = ["Narendra Modi", "Amit Shah", "Nitin Gadkari", "Yogi Adityanath", "Arvind Kejriwal", "Akhilesh Yadav"]
    const proposals = names.map(name => ethers.utils.formatBytes32String(name))
    const Voting = await ethers.getContractFactory("Voting")
    const voting = await Voting.deploy(proposals)
    await voting.deployed()
    console.log(`Voting Contract Deployed Address: ${voting.address}`)
    console.log(`Voting Contract Factory: ${Voting}`)
    console.log(`Voting Contract Deployed: ${voting}`)
}

main().catch(error => {
    console.log(error)
    process.exitCode = 1
})