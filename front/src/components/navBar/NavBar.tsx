import './NavBar.css'
import { Navbar, Button, Container, Nav } from 'react-bootstrap'

export default function NavBar({address}: {address: string}) {
  const shortAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  const copyToClickBoard = () => {
    navigator.clipboard.writeText(address)
  }

  return (
    <Navbar id="navBar" fixed="top">
      <Container fluid>
        <Button onClick={copyToClickBoard}>{shortAddress(address)}</Button>
      </Container>
    </Navbar>
  )
}
