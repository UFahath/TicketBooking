import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import {date, time } from "../data/time";
import { TravelFlightBottom } from "../Pages/Travel";
import flightIcon from "../assets/images/Flightimage.jpeg"; 
import { Sunrise,SunDim,SunMedium,Sunset } from "lucide-react";
let filterData={
  departureTime:["12AM-6AM","6AM-12PM","12PM-6PM","6PM-12AM"],
  arrivalTime:["12AM-6AM","6AM-12PM","12PM-6PM","6PM-12AM"],
  icons:['Sunrise','SunDim','SunMedium','Sunset'],
}
let iconComponents={
 Sunrise:Sunrise,SunDim:SunDim,SunMedium:SunMedium,Sunset:Sunset
}
const FlightResults = () => {

  const { state } = useLocation();

  let { availableFlights = [], from = "", to = "", departureDate = "" } = state || {};
  const [passengers,setPassengers]=useState("");
  const[classCategory,setClassCategory]=useState("");
  let[filterItem,setFilterItem]=useState([])
//  const[passengersCount,setCount]=useState(0);
 const[passengerAge,setAgeType]=useState("");
  let currentTime=time().slice(0,time().lastIndexOf(":"));
   let hour=currentTime.slice(1,currentTime.indexOf(":"));

   useEffect(()=>{
    let flightOffer=document.querySelector('.flightoffer');
    let flightWingLogo=document.querySelector('.flightwinglogo');
    if(flightOffer&&flightWingLogo)
    {
      flightOffer.remove();
      flightWingLogo.remove();
    }

    setPassengers(JSON.parse(localStorage.getItem("passengercount:")||"nothing present"))
 
    
   },[])
   useEffect(()=>{
    setClassCategory(passengers.classSelected||"")
    console.log(passengers)
    for(let key in passengers)
    {
      if(passengers[key]!==0&&key!=="classSelected")
      {
        // setCount(passengers[key]||0)
        setAgeType((prev)=>[prev+=passengers[key]+key+","])
      }
    }
   },[passengers])
  

   function Icons({index}){
   let IconComponents=iconComponents[filterData.icons[index]]
    return <IconComponents size={18} className="me-2" />;
  }

   function departureFilter(event){
   let pickedTimeSlot=event.target.textContent;
   let startTime;
   for(let i=0;i<pickedTimeSlot.length;i++)
   {
    if(pickedTimeSlot.codePointAt(i)>=65&&pickedTimeSlot.codePointAt(i)<=90)
    { 
    startTime=pickedTimeSlot.slice(0,i);
    break;
    }
   }
   let endTime;
   for(let j=pickedTimeSlot.indexOf('-')+1;j<pickedTimeSlot.length;j++)
   {
   
    if(pickedTimeSlot.codePointAt(j)>=65&&pickedTimeSlot.codePointAt(j)<=90)
    {
    endTime=pickedTimeSlot.slice(pickedTimeSlot.indexOf('-')+1,j);break;
    }
   }
  //  console.log("startTime:",startTime);
  //  console.log("endTime:",endTime);
  console.log(startTime.padStart(2,"0"))
  availableFlights=availableFlights.filter((item)=>{
 
    return startTime.padStart(2,"0")<=item.arrival_time.slice(0,item.arrival_time.indexOf(':'))&&endTime.padStart(2,"0")>=item.departure_time.slice(0,item.departure_time.indexOf(':'));
   })
   console.log(filterItem)
    // console.log(availableFlights)
   }
   useEffect(()=>{
    console.log(filterItem)
   },[filterItem])
  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div className="row mb-5 ms-4">
        <h4 className="text-center text-warning fw-bold fs-1 importedfont my-4">Trip Mode</h4>
        <div className="row">
          <div className="col-3 bg-warning rounded-top-4"></div>
           <div className="col-6 text-center"> <button className="btn btn-warning">One Way</button>
           <button className="btn btn-outline-warning disabled text-dark">Rounded-trip</button>
           </div>
           <div className="col-3 bg-warning rounded-top-4"></div>
        </div>
       
      </div>
      <div className="row mb-5 mx-auto">
        <div className="col-md-3">
          <label htmlFor="" className="form-label">From</label>
        <input type="text" className="form-control bg-white text-danger fw-bold" value={from} disabled/>
        </div>
        <div className="col-md-3">
          <label htmlFor="" className="form-label">To</label>
        <input type="text" className="form-control bg-white text-danger fw-bold" value={to} disabled/>
        </div>
        <div className="col-md-3">
          <label htmlFor="" className="form-label">Departure</label>
        <input type="text" className="form-control bg-white text-danger fw-bold" value={departureDate} disabled/>
        </div>
        <div className="col-md-3">
          <label htmlFor="" className="form-label">Passenger&Class</label>
        <input type="text" className="form-control bg-white text-danger fw-bold" value={passengerAge+classCategory} disabled/>
        </div>
      </div>
    <div className="row position-relative">
      <div className="col text-center  position-absolute mx-auto" style={{bottom:"95%"}}>
      <span className="badge text-bg-warning text-white fs-3 rounded-4">Update Search</span>
      </div>
    <img src={flightIcon} alt="airline"  className="img-fluid rounded-5" style={{minWidth:"100%",maxHeight:"600px"}} />
    </div>
    </div>
    <div className="container my-5">
      {/* Trip Summary */}
      <div className="mb-4">
        <h3>
          Flights from <span className="text-primary">{from}</span> to{" "}
          <span className="text-danger">{to}</span> on <strong>{departureDate}</strong>
        </h3>
      </div>

      {/* Filter Sidebar & Results */}
      <div className="row">
        {/* Filter Section */}
        <div className="col-md-3 mb-4">
          <div className="p-3 border rounded shadow-sm">
            <div className="row">
            <h5 className="fw-bold text-center">Filters</h5>
            <button className="btn btn-outline-dark">ResetAll</button>
            </div>
            <p className="text-secondary my-3">Showing {availableFlights.length} Flights</p>
            <hr />
            <div className="row">
             <div className="col">
              <h5 className="fw-bold">Departure Time</h5>
              {
                filterData.departureTime.map((item,index)=>(
                  <button className="btn btn-outline-dark mx-3 my-2 rounded-4" key={index} onClick={departureFilter}>
                  <Icons index={index}/>{item}
                  </button>
                ))
              }
              
             </div>
            </div>
            <div className="row">
             <div className="col">
              <h5 className="fw-bold">Arrival Time</h5>
              {
                filterData.arrivalTime.map((item,index)=>(
                  <button className="btn btn-outline-dark mx-3 my-2 rounded-4" key={index}>
                    <Icons index={index}/>{item}</button>
                ))
              }
              
             </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Price Range</label>
              <input type="range" className="form-range" min="1000" max="20000" />
              <div className="d-flex justify-content-between">
                <span>₹1,000</span>
                <span>₹20,000</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Stops</label>
              <div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="nonStop" />
                  <label className="form-check-label" htmlFor="nonStop">Non-stop</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="oneStop" />
                  <label className="form-check-label" htmlFor="oneStop">1 Stop</label>
                </div>
              </div>
            </div>
          </div>
        </div>

     {/* Flight Results Section */}
<div className="col-md-9">
  {availableFlights.length > 0 ? (
    availableFlights.map((flight, index) => (
      <div key={index} className="card mb-3 shadow-sm border-0">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Airline Info */}
            <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0">
              <img src={flightIcon} alt="airline" width="50" className="me-3 rounded-5" />
              <div>
                <h5 className="mb-1">{flight.airline || "Airline Name"}</h5>
                <small className="text-muted">{flight.flightNumber || "XX123"}</small>
              </div>
            </div>

            {/* Timing Info */}
            <div className="col-6 col-md-4 mb-3 mb-md-0">
              <div>
                <strong>{flight.departure_time}</strong> → <strong>{flight.arrival_time}</strong>
              </div>
              <small className="text-muted">{flight.travel_duration || "2h 30m"}</small>
            </div>

            {/* Pricing & Booking */}
            <div className="col-6 col-md-4 text-md-end text-start">
              <h5 className="text-success">{flight.currency} {flight.price}</h5>
              <button className="btn btn-outline-danger mt-2 w-100 w-md-auto">Book</button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-muted">No flights available for this route and date.</p>
  )}
</div>

      </div>
    </div>
    <TravelFlightBottom/>
    <Footer/>
    </>
  );
};

export default FlightResults;
