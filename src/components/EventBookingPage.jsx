import { Heading } from "../styles/Styled";
import EventGif from '../assets/images/Welcome.gif'

const EventBookingPage = ({heading}) => {
  return (
    <>
    <div className="container-fluid d-flex align-items-center justify-content-center my-3">
    <Heading className="fs-1 my-3 rounded-3 p-3">{heading}</Heading>
     <img src={EventGif} alt="" width={100} height={100}/> 
     </div>
     <div className="container text-center">
     <p className="fs-4 fw-normal bg-primary text-white rounded-top-3 p-3" style={{boxShadow:"7px 7px 0 black",fontFamily:"monospace"}}>Join us for an exciting and entertained events.Unleash your inner laugh with our event organizer guidance. Get ready for an unforgettable concert and shows experience. Book your tickets now!</p>
     </div>
    </>
  )
}



export default EventBookingPage