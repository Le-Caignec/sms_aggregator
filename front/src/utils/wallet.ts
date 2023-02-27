import { Chain } from '@wagmi/core'
import SMS_Aggregator from './abiSmsAggragator.json'
import { useContract, useProvider } from 'wagmi'
import { IExec } from 'iexec'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useDispatch } from 'react-redux'

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

export function useInitContract(): any {
    const dispatch = useDispatch()
    const provider = useProvider()
    const contract = useContract({
        address: contractAddress_SMS_Aggregator,
        abi: SMS_Aggregator.abi,
        signerOrProvider: provider,
    })
    dispatch({ type: 'account/updateContractVar', contract: contract })
}

export async function useInitIExec() {
    const dispatch = useDispatch()
    const connector = new MetaMaskConnector({
        chains: [bellecour],
    })
    let prodiver = (await connector.getProvider()) as any
    const iexec = new IExec({ ethProvider: prodiver })
    dispatch({ type: 'account/updateIExecVar', payload: iexec })

}