import './App.css'
import ExampleUsage from './components/ui/wavy-background'
import Navbar from './components/ui/navbar-menu'
import BackgroundBeams from './components/ui/background-beams'
import Camera from './components/ui/camera'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExampleUsage />} />
          <Route path="/surveilai" element={<BackgroundBeams />} />
          <Route path="/surveilai" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
