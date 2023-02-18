require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-ethers')


module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    iexec: {
      url: 'https://bellecour.iex.ec',
      gasPrice: 0,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      iexec: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'iexec',
        chainId: 134,
        urls: {
          apiURL: 'https://blockscout-bellecour.iex.ec/api/',
          browserURL: 'https://blockscout-bellecour.iex.ec',
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
}