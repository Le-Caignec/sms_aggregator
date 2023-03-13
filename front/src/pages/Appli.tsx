import './Appli.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components'
import { Container } from 'react-bootstrap'

export default function Appli() {
  return (
    <Container fluid>
      <NavBar />
      <Outlet />
    </Container>
  )
}
