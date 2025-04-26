import Footer from "../Footer"
import { Navbar } from "../Navbar"
import tickmark from '../../assets/images/tickmark.png'

const BookingSuccess = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
      <header className="my-4 text-center d-flex justify-content-center align-items-center">
        <img src={tickmark} alt="tickmark" style={{width:"30px",height:"30px"}}/>
        <h2 className="text-danger ms-2">Booking Confirmed</h2>
      </header>
    </div>
    <Footer/>
    </>
  )
}

export default BookingSuccess