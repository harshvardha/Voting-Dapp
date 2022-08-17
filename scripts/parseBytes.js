const ethers = require("ethers")

function parseBytes(nameInBytes) {
    const name = ethers.utils.parseBytes32String(nameInBytes)
    return name
}

export default parseBytes