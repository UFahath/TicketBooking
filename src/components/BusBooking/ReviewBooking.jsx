import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const ReviewBooking = () => {
  const bookingDetails = {
    from: "Bangalore",
    to: "Salem",
    date: "17th Mar 2025",
    bus: {
      name: "Jabbar Buses",
      type: "Non A/C Sleeper 2 + 1",
      seat: "UB6,KB5,K78,K98,798"
    },
    boarding: {
      time: "08:30 PM, 9th Feb 2025",
      point: "Kalasipalayam",
      address: "Jabbar Travels, Kalasipalayam"
    },
    dropping: {
      time: "01:30 AM, 10th Feb 2025",
      point: "Salem Bus Stand",
      address: "AVR Roundana, Salem"
    }
  };

  return (
    <>
    <div className="container-fluid">
       <div className="row" style={{backgroundColor:"#FF000033"}}>
        <div className="col-12 col-sm-7 col-md-6 col-lg-4 ms-0 mx-sm-auto ms-lg-5 my-5">
      <h2 className="fw-bold mb-5">Review Your Booking</h2>
      <p className="fw-bold fs-5 my-5">
        {bookingDetails.from} to {bookingDetails.to} &nbsp; | &nbsp;
        <span className="fw-normal">{bookingDetails.date}</span>
      </p>
      </div>
      </div>
    </div>
    <div className="container mt-4" style={{position:"relative",bottom:"70px"}}>
     
      <div className="card mb-3">
        <div className="card-body shadow">
          <h5 className="card-title fw-bold">{bookingDetails.bus.name}</h5>
          <p className="card-text">{bookingDetails.bus.type}</p>
          <hr/>
          <div className="d-flex justify-content-between flex-wrap gap-3 gap-sm-0">
            <div>
              Seats Selected: <strong>{bookingDetails.bus.seat}</strong>
            </div>
            <button className="nav-link text-danger">Cancellation policy</button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6" >
          <div className="border rounded p-3" style={{background:" #FFEFE1"}}>
            <p className="boardinganddropping">
              {bookingDetails.boarding.time}
            </p>
            <h6 className="fw-bold mb-1">{bookingDetails.boarding.point}</h6>
            <p>{bookingDetails.boarding.address}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border rounded p-3" style={{background:" #FFEFE1"}}>
            <p className="boardinganddropping">
              {bookingDetails.dropping.time}
            </p>
            <h6 className="fw-bold mb-1">{bookingDetails.dropping.point}</h6>
            <p>{bookingDetails.dropping.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold">Traveller Details</h5>
        <small className="text-muted">Enter the Name as in the Govt. ID</small>
        <div className="border rounded p-3 mt-2">
          <h6 className="fw-bold">Traveller1 Details</h6>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input type="text" className="form-control" placeholder="Enter Full Name" />
            </div>
            <div className="col-md-4 mb-3">
              <input type="number" className="form-control" placeholder="Enter Age" />
            </div>
            <div className="col-md-4 mb-3">
              <div className="btn-group" role="group">
                <button className="btn btn-outline-primary">Male</button>
                <button className="btn btn-outline-primary">Female</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold">Contact Details</h5>
        <small className="text-muted">
          Your E-ticket and updates will be sent to the following details
        </small>
        <div className="row mt-2">
          <div className="col-md-6 mb-3">
            <input type="email" className="form-control" placeholder="Enter Email Address" />
          </div>
          <div className="col-md-6 mb-3">
            <input type="tel" className="form-control" placeholder="Enter Mobile Number" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold">Travel Type</h5>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="travelType" id="personal" />
          <label className="form-check-label" htmlFor="personal">
            Personal
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="travelType" id="business" />
          <label className="form-check-label" htmlFor="business">
            Business
          </label>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-danger px-5 py-2">Pay Now</button>
      </div>
    </div>
    <style jsx="true">
      {
        `
        .boardinganddropping{
           background-color:#DC3545;
           color:white;
           text-align:center;
           padding:0.5em;
          border-radius:10px;
          width:30%;
        }
          @media (min-width:320px) and (max-width:768px)
          {
           .boardinganddropping{
               margin-left:auto;
              margin-right:auto;
              width:70%;
           }
          }
           @media (min-width:768px) and (max-width:992px)
           {
             .boardinganddropping{
              margin-left:initial;
              width:60%;
             }
           }
             @media (min-width:992px) and (max-widht:1900px)
             {
             .boardinganddropping{
               width:40%;
             }
             }
        `
      }
    </style>
    </>
  );
};

