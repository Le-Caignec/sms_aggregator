import './NavBar.css'
import { Navbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useAccount, useDisconnect } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import {
  connectAccount,
  selectthereIsSomeRequestPending,
} from '../../app/accountSlice'
import LoadingBar from '../loading/LoadingBar'

export default function NavBar() {
  const dispatch = useAppDispatch()
  const naviguate = useNavigate()
  const { address, isConnected } = useAccount()
  const isPending = useAppSelector(selectthereIsSomeRequestPending)
  const { disconnect } = useDisconnect()

  const shortAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  const copyToClickBoard = async () => {
    navigator.clipboard.writeText(address as string)
  }

  useEffect(() => {
    if (!isConnected) {
      naviguate('/')
    }
  }, [isConnected, naviguate])

  useEffect(() => {
    dispatch(connectAccount())
  }, [dispatch, address])

  return (
    <div id="navBarDiv">
      {isConnected ? (
        <div>
          {isPending && <LoadingBar />}
          <Navbar id="navBar">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip> Click to Copy</Tooltip>}
            >
              <div style={{ cursor: 'pointer' }} onClick={copyToClickBoard}>
                {shortAddress(address as string)}
              </div>
            </OverlayTrigger>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </Navbar>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
