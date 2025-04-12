import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import {date, time } from "../data/time";
import { TravelFlightBottom } from "../Pages/Travel";
import flightIcon from "../assets/images/Flightimage.jpeg"; 


const FlightResults = () => {
  const { state } = useLocation();

  const { availableFlights = [], from = "", to = "", departureDate = "" } = state || {};
  const [passengers,setPassengers]=useState("");
  const[classCategory,setClassCategory]=useState("");
 const[passengersCount,setCount]=useState(0);
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
        setCount(passengers[key]||0)
        setAgeType((prev)=>[prev+=passengers[key]+key+","])
      }
    }
   },[passengers])
  
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
            <h5>Filters</h5>
            <hr />
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
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={flightIcon} alt="airline" width="50" className="me-3 rounded-5" />
                    <div>
                      <h5 className="mb-1">{flight.airline || "Airline Name"}</h5>
                      <small className="text-muted">{flight.flightNumber || "XX123"}</small>
                    </div>
                  </div>
                  <div>
                    <div>
                      <strong>{currentTime}</strong> →{" "}
                      <strong>{String(Number(hour)+Number(flight.travel_duration.slice(0,flight.travel_duration.indexOf("h")))).padStart(2,"0").concat(date.toTimeString().slice(date.toTimeString().indexOf(":"),date.toTimeString().lastIndexOf(":")|| "00:00"))}</strong>
                    </div>
                    <small className="text-muted">{flight.travel_duration || "2h 30m"}</small>
                  </div>
                  <div className="text-end">
                    <h5 className="text-success">₹{flight.price}</h5>
                    <button className="btn btn-outline-danger mt-2">Book</button>
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
