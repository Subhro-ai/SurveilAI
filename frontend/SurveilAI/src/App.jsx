import './App.css'
import LampDemo from './components/ui/lamp'
import ExampleUsage from './components/ui/wavy-background'
import Navbar from './components/ui/navbar-menu'
import { BrowserRouter, Route , Routes} from 'react-router-dom'

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
      
      
        <Navbar/>
        <Routes>
         <Route path="/" element={<ExampleUsage/>}></Route>
        </Routes>
      
    
    </BrowserRouter>
      </div>
     
    </>
  )
}

export default App
