import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home, AddSecret, CheckSecret, Connect } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add_secret" element={<AddSecret />} />
        <Route path="/check_secret" element={<CheckSecret />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
