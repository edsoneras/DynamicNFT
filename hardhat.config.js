/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("./tasks/accounts");
require("./tasks/balance");
require("./tasks/fund-link");
require("./tasks/block-number");
require("./tasks/dNFT");
require('dotenv').config();

const { PRIVATE_KEY, INFURA_API_KEY, ALCHEMY_API_KEY, ETHERSCAN_API_KEY } = process.env;


module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      forking: {
        //this env var isn't mandatory for users who want to deploy on public networks
        url:
          process.env.ALCHEMY_MAINNET_RPC_URL ||
          "https://eth-mainnet.alchemyapi.io/v2/your-api-key",
      },
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,    
      accounts: [`${PRIVATE_KEY}`],
      saveDeployments: true,
    },   
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
  },
  solidity: "0.6.7",
};
