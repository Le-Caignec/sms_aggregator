import './NavBar.css'
import {
  Navbar,
  Button,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { useAccount, useDisconnect } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function NavBar() {
  const naviguate = useNavigate()
  const { address, isConnected } = useAccount()
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
  }, [isConnected])

  if (isConnected) {
    return (
      <Navbar id="navBar" fixed="top">
        <Container fluid>
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
        </Container>
      </Navbar>
    )
  }
  return <></>
}
