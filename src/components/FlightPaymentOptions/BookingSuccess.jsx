import Footer from "../Footer"
import { Navbar } from "../Navbar"
import tickmark from '../../assets/images/tickmark.png'
import {useMemo ,useEffect} from "react"
import {v4 as uuidv4} from "uuid"
const BookingSuccess = () => {

  
  let uniqNumber=useMemo(()=>{
    let savedRef=localStorage.getItem("Reference Number:");
    if(!savedRef)
    {
      let uniqId=uuidv4().toUpperCase().substring(0,uuidv4().indexOf("-"))
      localStorage.setItem("Reference Number:",uniqId)
      return uniqId;
    }
    else{
       return savedRef
    }
  },[])

  useEffect(()=>{
       return ()=>{localStorage.removeItem("Reference Number:")}
  },[])
 
  return (
    <>
    <Navbar/>
    <div className="container" style={{fontFamily:"Nunito Sans"}}>
      <header className="my-4 text-center d-flex justify-content-center align-items-center">
        <img src={tickmark} alt="tickmark" style={{width:"30px",height:"30px"}}/>
        <h2 className="text-danger ms-2">Booking Confirmed</h2>
      </header>
      <p className="fs-5 fw-bold">Reference Number : {uniqNumber}</p>
    </div>
    <Footer/>
    </>
  )
}

export default BookingSuccess