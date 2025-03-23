
import './App.css'
import About from './Pages/About'
import { Home } from './Pages/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ContactUs from './Pages/ContactUs'
import PrivacyPolicy from './Pages/PrivacyPolicy'

function ScrollT(){
  let {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[pathname])
  return null

}

function App() {
 
  return (
    <>
    <Router basename='/TicketBooking'>
     <ScrollT/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/aboutus" element={<About/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
     </Routes>
    </Router>
    </>
  )
}

export default App
