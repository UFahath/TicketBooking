
import './App.css'

import { Home } from './Pages/Home'
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import {lazy, Suspense, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
const About=lazy(()=>import('./Pages/About'))
const ContactUs=lazy(()=>import('./Pages/ContactUs'))
const PrivacyPolicy=lazy(()=>import('./Pages/PrivacyPolicy'))
const TermsAndConditions=lazy(()=>import('./Pages/TermsAndConditions'))
const Faq=lazy(()=>import('./Pages/Faq'))
const Help =lazy(()=>import('./Pages/Help'))
const Offers =lazy(()=>import('./Pages/Offers'));
const Travel=lazy(()=>import("./Pages/Travel"));
const Movies=lazy(()=>import('./Pages/Movies'));
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
import BusResults from './Pages/BusResults'
import loadAnimation from "./assets/images/loadanimation.gif"
const BusPaymentSuccess=lazy(()=>import("../src/components/BusBooking/BusPaymentSuccess"))

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
    <Suspense fallback={
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
 
    <img 
      src={loadAnimation} 
      alt="loadinganimation" 
      className="img-fluid mb-4" 
      style={{ maxWidth: "300px" }}
    />


    <div className="d-flex justify-content-center gap-3 mb-3">
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>


    <p className="fs-5 text-center">Loading</p>
  </div>
}
>
    <Router>
     <ScrollT/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/travel" element={<Travel/>}/>
      <Route path="/flightresults" element={<FlightResults/>}/>
      <Route path="/flightreviewbooking" element={<FlightsReviewBooking/>}/>
      <Route path="/flightpaymentoption" element={<FlightPaymentOption/>}/>
      <Route path="/flightpaymentSuccess" element={<BookingSuccess/>}/>
      <Route path="/otp" element={<Otp/>}/>
      <Route path="/busresults" element={<BusResults/>}/>
      <Route path="/buspaymentsuccess" element={<BusPaymentSuccess/>}/>
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
    </Suspense>
    </>
  )
}

export default App
