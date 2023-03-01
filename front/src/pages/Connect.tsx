import { Button } from 'react-bootstrap'
import './Connect.css'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { useInitIExec, useInitContract } from '../utils/wallet'
import { useEffect } from 'react'
//https://www.youtube.com/watch?v=bq8nVKxDz5A
export default function Connect() {
  const naviguate = useNavigate()
  const { chain } = useNetwork()

  const {
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector,
  } = useConnect()

  const { address, isConnecting, isConnected, isDisconnected } = useAccount()

  useInitIExec()
  useInitContract()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (isConnected) {
      naviguate('/home')
    }
  }, [isConnected])

  return (
    <div>
      <h1>Welcom to SMS Aggregator</h1>
      <p>
        You will be able to manage your secret safely. Check your privious
        secret registered or add a new one
      </p>
      <br />
      <br />
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            connect({ connector })
            switchNetwork?.(chain?.id)
          }}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
      {error && <div>{error.message}</div>}
      {isConnecting && <p>Connecting…</p>}
      {isDisconnected && <p>Disconnected</p>}
      <p>{address}</p>
    </div>
  )
}
