const ethers = require("ethers")

function createBytes(args) {
    const bytesConvertedNames = args.map(name => ethers.utils.formatBytes32String(name))
    return bytesConvertedNames
}

export default createBytes