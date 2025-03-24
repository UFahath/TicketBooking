import AirOfferCarousel from "../components/AirOfferCarousel"
import BusOfferCarousel from "../components/BusOfferCarousel"
import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import {Heading} from "../styles/Styled"
import busoffergif from "../assets/images/busoffer.gif"
import flightoffergif from "../assets/images/flightoffer.gif"
import MovieTicketCarousel from "../components/MovieTicketCarousel"

const Offers = () => {
  
  return (
    <>
    <Navbar/>
    <div className="container">
    <Heading className="fw-bold mt-5">Offers On Flight Tickets:
    <img src={flightoffergif} alt="" className="mx-3" style={{width:"10%"}}/>
    </Heading>
    <AirOfferCarousel/>
    </div>

    <div className="container">
    <Heading className="fw-bold my-5">Offers On Bus Tickets:
    <img src={busoffergif} alt="" className="mx-3 rounded-top-5 border border-warning border-3 shadow-lg" style={{width:"10%"}}/>
    </Heading>
    <BusOfferCarousel/>
    </div>

    <div className="container">
    <Heading className="fw-bold my-5">Offers On Movie Tickets:
    
    </Heading>
    <MovieTicketCarousel/>
    </div>

    <Footer/>
    </>
  )
}


export default Offers