import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import SearchHeader from "../components/BusBooking/SearchHeader"
import { useEffect,useState } from "react"
import BusFilters from "../components/BusBooking/BusFilters"

const BusResults = () => {
  const[busDetails,setBusDetails]=useState([])
  useEffect(()=>{
     const busDetails=JSON.parse(localStorage.getItem("bus_detail"))
     if(busDetails)
     {
      setBusDetails(busDetails)
     }
  },[])
  console.log(busDetails)
  return (
    <>
    <Navbar/>
    {
      busDetails.map((item,index)=>(
        <SearchHeader key={index} from={item?.from} to={item?.to} date={item?.date}/>
      ))
    }
    <BusFilters/>
    <Footer/>
    </>
  )
}

export default BusResults