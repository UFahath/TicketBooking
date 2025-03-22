
import './App.css'
import About from './Pages/About'
import { Home } from './Pages/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
 

  return (
    <>
    <Router basename='/TicketBooking'>
   
     <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/aboutus" element={<About/>}/> */}
     </Routes>
    </Router>
    </>
  )
}

export default App
