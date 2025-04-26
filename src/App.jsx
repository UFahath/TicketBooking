
import './App.css'
import About from './Pages/About'
import { Home } from './Pages/Home'
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ContactUs from './Pages/ContactUs'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsAndConditions from './Pages/TermsAndConditions'
import Help from './Pages/Help'
import Faq from './Pages/Faq'
import Offers from './Pages/Offers'
import Travel from './Pages/Travel'
import Movies from './Pages/Movies'
import MoviePage from './Pages/MoviePage'
// import Login from './components/LoginPage/login'

// import Test from "./Test/Test"
import MovieSelected from './Pages/MovieSelected'
import { TheaterPreview } from './Pages/TheaterPreview'
import { MovieBookingPage } from './Pages/MovieBookingPage'
import BookingDetails from './components/BookingDetails'
import { MoviePaymentPage } from './Pages/MoviePaymentPage'

import { QRPaymentPage, Success } from './Pages/QrPaymentPage'
import FlightResults from './components/FlightResults'
import { FlightsReviewBooking } from './Pages/FlightsReviewBooking'
import FlightPaymentOption from './Pages/FlightPaymentOption'
import { Otp } from './components/FlightPaymentOptions/Otp'
import BookingSuccess from './components/FlightPaymentOptions/BookingSuccess'


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
    <Router>
     <ScrollT/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/travel" element={<Travel/>}/>
      <Route path="/flightresults" element={<FlightResults/>}/>
      <Route path="/flightreviewbooking" element={<FlightsReviewBooking/>}/>
      <Route path="/flightpaymentoption" element={<FlightPaymentOption/>}/>
      <Route path="/flightpaymentSuccess" element={<BookingSuccess/>}/>
      <Route path="/otp" element={<Otp/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/moviepage" element={<MoviePage/>}/>
      <Route path="/movies/moviepage/movieselected" element={<MovieSelected/>}/>
      <Route path="/movies/moviepage/movieselected/theaterpreview" element={<TheaterPreview/>}/>
      <Route path="/moviebookingpage" element={<MovieBookingPage/>}/>
      <Route path="/bookingdetails" element={<BookingDetails/>}/>
      <Route path="/moviepaymentpage" element={<MoviePaymentPage/>}/>
      <Route path="/qr-payment" element={<QRPaymentPage/>}/>
      <Route path="/moviepaymentsuccess" element={<Success/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/aboutus" element={<About/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
      <Route path="/faq" element={<Faq/>}/>
      <Route path="/termsandconditions" element={<TermsAndConditions/>}/>
     
     </Routes>
    </Router>

    </>
  )
}

export default App
