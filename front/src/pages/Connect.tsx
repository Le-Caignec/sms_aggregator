import './Connect.css'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect } from 'wagmi'
import { useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { Button } from 'react-bootstrap'
import { resetAccountSlice } from '../app/accountSlice'
import { useAppDispatch } from '../app/hook'

export default function Connect() {
  const naviguate = useNavigate()
  const dispatch = useAppDispatch()
  const { error } = useConnect()
  const { address, isConnecting, isConnected, isDisconnected } = useAccount()
  const { open } = useWeb3Modal()

  useEffect(() => {
    resetAccountSlice(dispatch)
  }, [])

  useEffect(() => {
    if (isConnected) {
      naviguate('/appli')
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
      <Button onClick={() => open()}>Connect</Button>
      {error && <div>{error.message}</div>}
      {isConnecting && <p>Connecting…</p>}
      {isDisconnected && <p>Disconnected</p>}
      <p>{address}</p>
    </div>
  )
}
