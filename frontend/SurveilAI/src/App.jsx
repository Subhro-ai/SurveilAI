import './App.css'
import ExampleUsage from './components/ui/wavy-background'
import Navbar from './components/ui/navbar-menu'
import BackgroundBeams from './components/ui/background-beams'
import Camera from './components/ui/camera'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutPage from './components/ui/aboutpage'
import FeedbackForm from './components/ui/feedback'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExampleUsage />} />
          <Route path="/surveilai" element={<BackgroundBeams />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
