require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      }
      // chainId: 1337
    },
    ethereum: {
      url: ``
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    optimism: {
      url: "https://mainnet.optimism.io",
      accounts: [PRIVATE_KEY]
    },
    // for testnet
    'optimism-goerli': {
      url: "https://goerli.optimism.io",
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
