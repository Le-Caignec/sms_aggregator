import { Button } from 'react-bootstrap'
import { bellecour } from '../utils/wallet'
import './Connect.css'
import { useNavigate } from 'react-router-dom'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAccount, useConnect } from 'wagmi'
import { useInitIExec, useInitContract } from '../utils/wallet'

export default function Connect() {
  const naviguate = useNavigate()
  const connector = new MetaMaskConnector({
    chains: [bellecour],
  })

  const { connect, error, isLoading, pendingConnector } = useConnect({
    chainId: bellecour.id,
    connector: connector,
  })

  const { address, isConnecting, isConnected, isDisconnected } = useAccount()

  useInitIExec()
  useInitContract()

  return (
    <div>
      <h1>Welcom to SMS Aggregator</h1>
      <p>
        You will be able to manage your secret safely. Check your privious
        secret registered or add a new one
      </p>
      <br />
      <br />
      <Button key={connector.id} onClick={() => connect({ connector })}>
        Connect Your Wallet
        {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
      </Button>
      {error && <div>{error.message}</div>}
      {isConnecting && <p>Connecting…</p>}
      {isDisconnected && <p>Disconnected</p>}
      {isConnected && <>{naviguate('/home')}</>}
      <p>{address}</p>
    </div>
  )
}
