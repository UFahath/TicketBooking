import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BookingDetailsReview } from "./FlightsReviewBooking"
import { dateFormatter } from "../data/time"
import { useEffect,useState} from "react"


const FlightPaymentOption = () => {
  let {state} =useLocation();

  console.log(state)
  let[classSelected,setClassSelected]=useState("");
  let[travellersDetails,setTravellers]=useState([])
  // console.log()
  useEffect(()=>{
    const stored=localStorage.getItem("passengercount:");
    if(stored)
    setClassSelected(JSON.parse(stored))

    const storedTravellers=JSON.parse(localStorage.getItem("travellersDetails"));
    if(storedTravellers)
    setTravellers(JSON.parse(localStorage.getItem("travellersDetails")||"[]"))

   },[])
   let[primaryName,setPrimaryName]=useState("")
   let[totalPersonCount,setTotalCount]=useState("")
   let[email,setEmail]=useState("")
   useEffect(()=>{
    if(travellersDetails.length>0)
    {
    setPrimaryName(travellersDetails[0].firstName+" "+travellersDetails[0].lastName);
    setTotalCount(Object.keys(travellersDetails).length)
    setEmail(travellersDetails[0].email)
    }
   },[travellersDetails,setPrimaryName,setTotalCount,totalPersonCount])
 
  return (
    <>
    <Navbar/>
    <div className="container">
    <BookingDetailsReview state={state.presistOne} email={email} totalPersonCount={totalPersonCount} primaryName={primaryName} dateFormatter={dateFormatter} classSelected={classSelected}/>
    </div>
    <Footer/>
    </>
  )
}

export default FlightPaymentOption