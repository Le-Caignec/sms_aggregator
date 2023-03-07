import './Appli.css'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components'

export default function Appli() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}
