import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import {date, time } from "../data/time";
import { TravelFlightBottom } from "../Pages/Travel";
// import flightIcon from "./assets/flight-icon.png"; // Uncomment if you have a flight icon image

const FlightResults = () => {
  const { state } = useLocation();

  const { availableFlights = [], from = "", to = "", departureDate = "" } = state || {};


  let currentTime=time().slice(0,time().lastIndexOf(":"));
   let hour=currentTime.slice(1,currentTime.indexOf(":"));

   useEffect(()=>{
    let flightOffer=document.querySelector('.flightoffer');
    let flightWingLogo=document.querySelector('.flightwinglogo');
   flightOffer.remove();
   flightWingLogo.remove();
   },[])
  
  return (
    <>
    <Navbar/>
    <div className="container">

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
                    {/* Uncomment if you use flightIcon */}
                    {/* <img src={flightIcon} alt="airline" width="50" className="me-3" /> */}
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
