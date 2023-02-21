import { Chain } from '@wagmi/core'
import SMS_Aggregator from '../utils/abiSmsAggragator.json'
import { useContract, useProvider } from 'wagmi'

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

export function Contract (){
    const provider = useProvider()
    const contract = useContract({
        address: contractAddress_SMS_Aggregator,
        abi: SMS_Aggregator.abi,
        signerOrProvider: provider,
    })
    return contract
}