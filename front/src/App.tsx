import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Appli, Home, AddSecret, CheckSecret, Connect } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/appli" element={<Appli />}>
          <Route path="/appli/" element={<Home />} />
          <Route path="/appli/add_secret" element={<AddSecret />} />
          <Route path="/appli/check_secret" element={<CheckSecret />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
