import { Chain } from '@wagmi/core'
import SMS_Aggregator from './abiSmsAggragator.json'
import { IExec } from 'iexec'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Contract } from 'ethers'
import { getProvider, getContract } from '@wagmi/core'

//global variables
const contractAddress_SMS_Aggregator = process.env.REACT_APP_CONTRACT_ADDRESS!

export const bellecour = {
    id: 0x86,
    name: 'iExec Sidechain',
    network: 'bellecour',
    nativeCurrency: {
        decimals: 18,
        name: 'xRLC',
        symbol: 'xRLC',
    },
    rpcUrls: {
        public: { http: ['https://bellecour.iex.ec'] },
        default: { http: ['https://bellecour.iex.ec'] },
    },
    blockExplorers: {
        etherscan: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
        default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
    },
} as const satisfies Chain

export async function initIExec() {
    const connector = new MetaMaskConnector({
        chains: [bellecour],
    })
    let prodiver = (await connector.getProvider()) as any
    const iexec = new IExec({ ethProvider: prodiver })
    return iexec
}

export async function initContract() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const provider = getProvider()
    //const contract = new Contract(contractAddress_SMS_Aggregator,SMS_Aggregator.abi, provider )
    const contract = getContract({
        address: contractAddress_SMS_Aggregator,
        abi: SMS_Aggregator.abi,
        signerOrProvider: provider,
    })
    return contract
}