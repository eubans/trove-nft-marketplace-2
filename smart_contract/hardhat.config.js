require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "07cb425b004d408da4e8879532a21b3b"

module.exports = {
    networks: {
        hardhat: {
            // chainId: 1337
            chainId: 31337
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
            accounts: [privateKey]
        },
        mainnet: {
            url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
            accounts: [privateKey]
        },
    }
}

module.exports = {
    solidity: "0.8.4",
};